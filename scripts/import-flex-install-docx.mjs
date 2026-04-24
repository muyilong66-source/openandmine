/**
 * Import 深部位移监测设备安装工序流程.docx from flex-inclinometer folder
 * into installation.mdx + static/img/flex-inclinometer/install/
 *
 * Run: node scripts/import-flex-install-docx.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.join(__dirname, '..');
const flexDir = path.join(
  siteRoot,
  'docs/geowatch/products/flex-inclinometer',
);
const outMdx = path.join(flexDir, 'installation.mdx');
const imgDir = path.join(siteRoot, 'static/img/flex-inclinometer/install');

function findDocx() {
  const names = fs.readdirSync(flexDir);
  const docx = names.filter((n) => n.endsWith('.docx'));
  if (!docx.length) throw new Error(`No .docx in ${flexDir}`);
  return path.join(flexDir, docx[0]);
}

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

function parseDocumentNode(xml, rels) {
  const lines = [];
  const bodyMatch = xml.match(/<w:body[^>]*>([\s\S]*)<\/w:body>/);
  if (!bodyMatch) return lines;
  const body = bodyMatch[1];
  const pRe = /<w:p\b[^>]*>([\s\S]*?)<\/w:p>/g;
  let pm;
  while ((pm = pRe.exec(body))) {
    const pxml = pm[1];
    let style = null;
    const sm = pxml.match(/<w:pStyle[^>]*w:val="([^"]+)"/);
    if (sm) style = sm[1];

    const runs = [];
    const rRe = /<w:r\b[^>]*>([\s\S]*?)<\/w:r>/g;
    let rm;
    while ((rm = rRe.exec(pxml))) {
      const rx = rm[1];
      const texts = [...rx.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)].map(
        (x) => x[1],
      );
      const t = texts.join('');
      if (t) runs.push({type: 'text', value: t});
      const embeds = [...rx.matchAll(/r:embed="([^"]+)"/g)].map((x) => x[1]);
      for (const eid of embeds) runs.push({type: 'img', value: eid});
    }

    if (!runs.length) continue;
    const textJoin = runs
      .filter((x) => x.type === 'text')
      .map((x) => x.value)
      .join('');
    const imgs = runs.filter((x) => x.type === 'img').map((x) => x.value);
    const fullText = textJoin.replace(/\s+/g, ' ').trim();
    if (!fullText && !imgs.length) continue;

    const emitImgs = () => {
      for (const rid of imgs) {
        const target = rels[rid];
        if (target && target.startsWith('media/'))
          lines.push(
            `![工序图示](/img/flex-inclinometer/install/${path.basename(target)})`,
          );
      }
    };

    if (style === 'ListParagraph1') {
      if (fullText) lines.push(`- ${fullText}`);
      emitImgs();
      continue;
    }
    if (style === '2' && fullText) {
      lines.push(`## ${fullText}`);
      emitImgs();
      continue;
    }
    if (fullText) lines.push(fullText);
    emitImgs();
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
  const JSZip = (await import('jszip')).default;
  const docxPath = findDocx();
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
  const contentLines = parseDocumentNode(docXml, rels);

  const mdx = `---
sidebar_label: '柔性测斜仪 · 安装方法'
---

# 柔性测斜仪 · 安装方法

以下内容来自同目录 Word 文档自动转换，图片位于 \`/img/flex-inclinometer/install/\`。修订时可改本页 MDX，或改 docx 后执行 \`node scripts/import-flex-install-docx.mjs\` 重新导入。

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
