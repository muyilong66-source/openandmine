/**
 * Import 绿色装配式支护…对比表.docx → 请写入 docs/slopeguard/products/flexible-slope/*.mdx（原 comprehensive-solution 已拆页）
 * 图片 → static/img/slopeguard/flexible-slope/
 *
 * Run: node scripts/import-slopeguard-comprehensive-docx.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.join(__dirname, '..');

const DOCX_NAME =
  '绿色装配式支护与网喷射混凝土方案对比表（自然放坡＋注浆土钉放坡）202311.docx';
const docxPath = path.join(siteRoot, 'docs/slopeguard/products', DOCX_NAME);
const outMdx = path.join(
  siteRoot,
  'docs/slopeguard/products/flexible-slope/installation.mdx',
);
const imgDir = path.join(siteRoot, 'static/img/slopeguard/flexible-slope');
const IMG_URL = '/img/slopeguard/flexible-slope';

function parseRels(xml) {
  const rels = {};
  const re =
    /<Relationship\b[^>]*\bId="([^"]+)"[^>]*\bTarget="([^"]+)"[^>]*\/?>/g;
  let m;
  while ((m = re.exec(xml))) {
    rels[m[1]] = m[2].replace(/^\.\.\//, '');
  }
  return rels;
}

function decodeXml(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

/** 段落内全部 w:t 与 r:embed（含 w:drawing 内 a:blip） */
function extractParagraphParts(pxml) {
  const texts = [
    ...pxml.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g),
  ].map((x) => decodeXml(x[1] ?? ''));
  const text = texts.join('');
  const embeds = [...pxml.matchAll(/\br:embed="([^"]+)"/g)].map((x) => x[1]);
  return {text, embeds};
}

function embedToMarkdown(embeds, rels) {
  const lines = [];
  for (const rid of embeds) {
    const target = rels[rid];
    if (target && target.startsWith('media/')) {
      const base = path.basename(target);
      lines.push(`![图示](${IMG_URL}/${base})`);
    }
  }
  return lines;
}

function paragraphToMarkdown(pxml, rels) {
  const lines = [];
  let style = null;
  const sm = pxml.match(/<w:pStyle[^>]*w:val="([^"]+)"/);
  if (sm) style = sm[1];

  const {text, embeds} = extractParagraphParts(pxml);
  const fullText = text.replace(/\s+/g, ' ').trim();

  const imgLines = embedToMarkdown(embeds, rels);

  if (!fullText && !imgLines.length) return lines;

  if (style === 'ListParagraph' || style === 'ListParagraph1') {
    if (fullText) lines.push(`- ${fullText}`);
    lines.push(...imgLines);
    return lines;
  }
  if (
    style === '2' ||
    style === 'Heading2' ||
    style === '标题2' ||
    style === '3' ||
    style === 'Heading3' ||
    style === '标题3'
  ) {
    const level = style === '3' || style === 'Heading3' || style === '标题3' ? '###' : '##';
    if (fullText) lines.push(`${level} ${fullText}`);
    lines.push(...imgLines);
    return lines;
  }
  if (fullText) lines.push(fullText);
  lines.push(...imgLines);
  return lines;
}

function parseCellInner(tcInner, rels) {
  const chunks = [];
  const pRe = /<w:p\b[^>]*>([\s\S]*?)<\/w:p>/g;
  let pm;
  while ((pm = pRe.exec(tcInner))) {
    const {text, embeds} = extractParagraphParts(pm[1]);
    const t = text.replace(/\s+/g, ' ').trim();
    const imgs = embedToMarkdown(embeds, rels);
    if (t) chunks.push(t);
    chunks.push(...imgs);
  }
  return chunks.join('<br />');
}

function escapeMdCell(s) {
  return s.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

/** Word 常在表格前重复输出表头/首列标题为独立段落，插入表格前剔除尾部重复短句 */
function trimLinesBeforeTable(lines, tblLines) {
  const headerCells = [];
  for (const tl of tblLines) {
    const t = tl.trim();
    if (!t.startsWith('|') || t.includes('---')) continue;
    t.split('|')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((c) => headerCells.push(c.split('<br')[0].trim()));
    break;
  }
  let dataRowFirstCol = '';
  let seenSep = false;
  for (const tl of tblLines) {
    const t = tl.trim();
    if (!t.startsWith('|')) continue;
    if (t.includes('---')) {
      seenSep = true;
      continue;
    }
    if (seenSep) {
      const cells = t
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean);
      dataRowFirstCol = cells[0]?.split('<br')[0].trim() ?? '';
      break;
    }
  }
  const dropSet = new Set([...headerCells, dataRowFirstCol].filter(Boolean));
  while (lines.length) {
    const last = lines[lines.length - 1].trim();
    if (last === '') {
      lines.pop();
      continue;
    }
    if (last.length < 120 && dropSet.has(last)) {
      lines.pop();
      continue;
    }
    break;
  }
}

function tableToMarkdown(tblXml, rels) {
  const rows = [];
  const trRe = /<w:tr\b[^>]*>([\s\S]*?)<\/w:tr>/g;
  let trm;
  while ((trm = trRe.exec(tblXml))) {
    const cells = [];
    const tcRe = /<w:tc\b[^>]*>([\s\S]*?)<\/w:tc>/g;
    let tcm;
    while ((tcm = tcRe.exec(trm[1]))) {
      cells.push(parseCellInner(tcm[1], rels));
    }
    if (cells.length) rows.push(cells);
  }
  if (!rows.length) return [];

  const lines = [];
  const ncol = Math.max(...rows.map((r) => r.length));
  const norm = rows.map((r) => {
    const x = [...r];
    while (x.length < ncol) x.push('');
    return x;
  });

  lines.push(
    '| ' + norm[0].map((c) => escapeMdCell(c)).join(' | ') + ' |',
  );
  lines.push('| ' + norm[0].map(() => '---').join(' | ') + ' |');
  for (let i = 1; i < norm.length; i++) {
    lines.push(
      '| ' + norm[i].map((c) => escapeMdCell(c)).join(' | ') + ' |',
    );
  }
  lines.push('');
  return lines;
}

/** 表格内也有 w:p，不能用 split(/(?=<w:p)/) 切段 */
function extractParagraphXml(body, start) {
  if (!body.startsWith('<w:p', start)) return null;
  const end = body.indexOf('</w:p>', start);
  if (end === -1) return null;
  return body.slice(start, end + 6);
}

function extractTableXml(body, start) {
  if (!body.startsWith('<w:tbl', start)) return null;
  let depth = 1;
  let i = start + 6;
  while (depth > 0 && i < body.length) {
    const open = body.indexOf('<w:tbl', i);
    const close = body.indexOf('</w:tbl>', i);
    if (close === -1) return null;
    if (open !== -1 && open < close) {
      depth++;
      i = open + 6;
    } else {
      depth--;
      if (depth === 0) return body.slice(start, close + 8);
      i = close + 8;
    }
  }
  return null;
}

function parseBody(docXml, rels) {
  const bodyMatch = docXml.match(/<w:body[^>]*>([\s\S]*)<\/w:body>/);
  if (!bodyMatch) return [];
  /* 文档中可有多个分节 w:sectPr（如横竖版切换） */
  let body = bodyMatch[1].replace(
    /<w:sectPr\b[^>]*>[\s\S]*?<\/w:sectPr>/g,
    '',
  );
  const lines = [];
  let pos = 0;
  while (pos < body.length) {
    const nextP = body.indexOf('<w:p', pos);
    const nextT = body.indexOf('<w:tbl', pos);
    let next = -1;
    let kind = null;
    if (nextP === -1 && nextT === -1) break;
    if (nextP === -1) {
      next = nextT;
      kind = 'tbl';
    } else if (nextT === -1) {
      next = nextP;
      kind = 'p';
    } else if (nextP <= nextT) {
      next = nextP;
      kind = 'p';
    } else {
      next = nextT;
      kind = 'tbl';
    }
    if (next > pos) {
      pos = next;
      continue;
    }
    if (kind === 'p') {
      const px = extractParagraphXml(body, next);
      if (!px) {
        pos = next + 1;
        continue;
      }
      const inner = px.match(/^<w:p\b[^>]*>([\s\S]*)<\/w:p>$/);
      if (inner) lines.push(...paragraphToMarkdown(inner[1], rels));
      pos = next + px.length;
    } else {
      const tx = extractTableXml(body, next);
      if (!tx) {
        pos = next + 1;
        continue;
      }
      const tblLines = tableToMarkdown(tx, rels);
      trimLinesBeforeTable(lines, tblLines);
      lines.push(...tblLines);
      pos = next + tx.length;
    }
  }
  return lines;
}

async function extractMedia(zip) {
  fs.mkdirSync(imgDir, {recursive: true});
  for (const [name, file] of Object.entries(zip.files)) {
    if (file.dir || !name.startsWith('word/media/')) continue;
    const data = await file.async('nodebuffer');
    const base = path.basename(name);
    fs.writeFileSync(path.join(imgDir, base), data);
  }
}

async function main() {
  if (!fs.existsSync(docxPath)) {
    throw new Error(`Missing docx: ${docxPath}`);
  }
  const JSZip = (await import('jszip')).default;
  const buf = fs.readFileSync(docxPath);
  const zip = await JSZip.loadAsync(buf);

  const relsFile = zip.file('word/_rels/document.xml.rels');
  if (!relsFile) throw new Error('missing document.xml.rels');
  const relsXml = await relsFile.async('string');
  const rels = parseRels(relsXml);

  await extractMedia(zip);

  const docFile = zip.file('word/document.xml');
  if (!docFile) throw new Error('missing document.xml');
  const docXml = await docFile.async('string');
  const contentLines = parseBody(docXml, rels);

  const mdx = `---
sidebar_label: '绿色装配式柔性护坡'
---

# 绿色装配式柔性护坡

以下内容来自 Word 文档《${DOCX_NAME.replace(/\.docx$/i, '')}》自动转换，图片位于 \`${IMG_URL}/\`。修订时可编辑本页 MDX，或更新 docx 后执行 \`node scripts/import-slopeguard-comprehensive-docx.mjs\` 重新导入。

${contentLines.join('\n\n')}
`;
  fs.writeFileSync(outMdx, mdx, 'utf8');
  console.log('Wrote', outMdx);
  console.log('Images ->', imgDir);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
