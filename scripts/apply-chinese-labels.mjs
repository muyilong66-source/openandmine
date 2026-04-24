/**
 * 为 docs 下 MDX 写入中文 sidebar_label，并统一正文一级标题为中文
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.join(__dirname, '..', 'docs');

/** @type {Record<string, string>} */
const LABELS = {
  'geowatch/intro': 'GeoWatch 概览',
  'geowatch/theory/slope-monitoring-principles': '边坡监测原理',
  'geowatch/theory/deformation-mechanism': '变形机理分析',
  'geowatch/theory/early-warning-theory': '预警理论模型',
  'geowatch/theory/data-analysis-methods': '数据分析方法',
  'geowatch/theory/iot-sensor-tech': '物联网传感技术',
  'geowatch/products/gnss/gnss-principle': 'GNSS 定位原理',
  'geowatch/products/gnss/gnss-equipment': 'GNSS 接收设备',
  'geowatch/products/gnss/gnss-installation': 'GNSS 安装部署',
  'geowatch/products/gnss/gnss-data-platform': 'GNSS 数据平台',
  'geowatch/products/flex-inclinometer/principle': '柔性测斜仪 · 测量原理',
  'geowatch/products/flex-inclinometer/specs': '柔性测斜仪 · 技术参数',
  'geowatch/products/flex-inclinometer/installation': '柔性测斜仪 · 安装方法',
  'geowatch/products/flex-inclinometer/data-reading': '柔性测斜仪 · 数据采集',
  'geowatch/products/crackmeter/principle': '裂缝计 · 测量原理',
  'geowatch/products/crackmeter/specs': '裂缝计 · 技术参数',
  'geowatch/products/crackmeter/installation': '裂缝计 · 安装方法',
  'geowatch/products/crackmeter/case-study': '裂缝计 · 应用案例',
  'geowatch/products/piezometer/principle': '渗水计 · 测量原理',
  'geowatch/products/piezometer/specs': '渗水计 · 技术参数',
  'geowatch/products/piezometer/installation': '渗水计 · 安装方法',
  'geowatch/products/piezometer/seepage-analysis': '渗流分析',
  'geowatch/products/blasting-vibrometer/principle': '爆破振动仪 · 测量原理',
  'geowatch/products/blasting-vibrometer/specs': '爆破振动仪 · 技术参数',
  'geowatch/products/blasting-vibrometer/installation': '爆破振动仪 · 安装方法',
  'geowatch/products/blasting-vibrometer/safety-standard': '爆破安全标准',
  'geowatch/products/earth-pressure/principle': '土压力计 · 测量原理',
  'geowatch/products/earth-pressure/specs': '土压力计 · 技术参数',
  'geowatch/products/earth-pressure/installation': '土压力计 · 安装方法',
  'geowatch/products/system-integration': '系统集成云平台',
  'geowatch/cases/open-pit-mine': '露天矿山边坡',
  'geowatch/cases/underground-mine': '地下矿山采空区',
  'geowatch/cases/highway-cut-slope': '公路路堑边坡',
  'geowatch/cases/hydropower-slope': '水电站边坡',
  'geowatch/cases/tailings-dam': '尾矿库坝体',
  'geowatch/reading/industry-standards': '行业标准规范',
  'geowatch/reading/academic-papers': '学术论文推荐',
  'geowatch/reading/technical-whitepaper': '技术白皮书',
  'geowatch/reading/faq': '常见问题',
  'slopeguard/intro': 'SlopeGuard 概览',
  'slopeguard/theory/slope-failure-mechanism': '边坡破坏机理',
  'slopeguard/theory/reinforcement-principles': '加固原理',
  'slopeguard/theory/drainage-design': '排水设计理论',
  'slopeguard/theory/soil-nailing-theory': '土钉墙理论',
  'slopeguard/theory/anchor-design': '锚固设计计算',
  'slopeguard/products/corrugated-pipe/overview': '波纹管排水 · 概述',
  'slopeguard/products/corrugated-pipe/specs': '波纹管排水 · 技术参数',
  'slopeguard/products/corrugated-pipe/installation': '波纹管排水 · 安装',
  'slopeguard/products/corrugated-pipe/drainage-calculation': '排水计算',
  'slopeguard/products/active-net/overview': '主动防护网 · 概述',
  'slopeguard/products/active-net/specs': '主动防护网 · 技术参数',
  'slopeguard/products/active-net/installation': '主动防护网 · 安装',
  'slopeguard/products/passive-net/overview': '被动防护网 · 概述',
  'slopeguard/products/passive-net/specs': '被动防护网 · 技术参数',
  'slopeguard/products/passive-net/installation': '被动防护网 · 安装',
  'slopeguard/products/anchor/overview': '锚杆/锚索 · 概述',
  'slopeguard/products/anchor/specs': '锚杆/锚索 · 技术参数',
  'slopeguard/products/anchor/installation': '锚杆/锚索 · 安装',
  'slopeguard/products/comprehensive-solution': '绿色装配式柔性护坡（入口）',
  'slopeguard/products/flexible-slope/installation': '绿色装配式柔性护坡 · 安装方法',
  'slopeguard/products/flexible-slope/specs': '绿色装配式柔性护坡 · 技术参数',
  'slopeguard/products/flexible-slope/principle': '绿色装配式柔性护坡 · 原理',
  'slopeguard/products/flexible-slope/case-studies': '绿色装配式柔性护坡 · 案例',
  'slopeguard/cases/high-slope-protection': '高边坡防护',
  'slopeguard/cases/landslide-treatment': '滑坡治理',
  'slopeguard/cases/rockfall-protection': '落石防护',
  'slopeguard/cases/tunnel-portal': '隧道洞口防护',
  'slopeguard/reading/design-specifications': '设计规范',
  'slopeguard/reading/construction-standards': '施工标准',
  'slopeguard/reading/faq': '常见问题',
  'minetreat/intro': '矿山治理概览',
  'minetreat/theory/amd-formation': '酸性矿山排水形成机理',
  'minetreat/theory/water-chemistry': '水化学特征分析',
  'minetreat/theory/treatment-principles': '处理原理',
  'minetreat/theory/passive-treatment': '被动处理技术',
  'minetreat/theory/active-treatment': '主动处理技术',
  'minetreat/theory/ecological-restoration': '生态修复理论',
  'minetreat/products/neutralization/overview': '酸性水中和 · 概述',
  'minetreat/products/neutralization/limestone-drum': '石灰石滚筒工艺',
  'minetreat/products/neutralization/anoxic-limestone': '厌氧石灰石工艺',
  'minetreat/products/heavy-metal/overview': '重金属去除 · 概述',
  'minetreat/products/heavy-metal/precipitation': '化学沉淀',
  'minetreat/products/heavy-metal/adsorption': '吸附工艺',
  'minetreat/products/wetland/overview': '生态湿地 · 概述',
  'minetreat/products/wetland/design': '湿地设计',
  'minetreat/products/wetland/plant-selection': '植物选型',
  'minetreat/products/integrated-solution': '综合治理方案',
  'minetreat/products/monitoring-system': '水质监测系统',
  'minetreat/cases/coal-mine-amd': '煤矿酸性水治理',
  'minetreat/cases/metal-mine-drainage': '金属矿排水治理',
  'minetreat/cases/abandoned-mine': '废弃矿山修复',
  'minetreat/cases/watershed-restoration': '流域生态修复',
  'minetreat/reading/environmental-regulations': '环保法规',
  'minetreat/reading/technical-guidelines': '技术指南',
  'minetreat/reading/research-progress': '研究进展',
  'minetreat/reading/faq': '常见问题',
  'about/intro': '关于我们',
  'about/company/overview': '公司概况',
  'about/company/development': '发展历程',
  'about/company/qualifications': '资质荣誉',
  'about/company/partners': '合作伙伴',
  'about/team/management': '管理团队',
  'about/team/technical': '技术团队',
  'about/team/field-team': '现场团队',
  'about/team/team-activities': '团队活动',
  'about/culture/vision': '企业愿景',
  'about/culture/mission': '企业使命',
  'about/culture/values': '核心价值观',
  'about/culture/social-responsibility': '社会责任',
  'about/join/why-us': '为什么选择我们',
  'about/join/positions': '招聘职位',
  'about/join/benefits': '员工福利',
  'about/join/contact': '联系方式',
};

function walkDir(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      walkDir(full, acc);
    } else if (name.endsWith('.mdx')) {
      acc.push(full);
    }
  }
  return acc;
}

function applyFile(filePath) {
  const rel = path.relative(docsRoot, filePath).replace(/\\/g, '/');
  const id = rel.replace(/\.mdx$/, '');
  const label = LABELS[id];
  if (!label) {
    console.warn('No Chinese label for:', id);
    return;
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  let fmLines = [];
  let body;
  if (m) {
    fmLines = m[1].split(/\r?\n/).filter(Boolean);
    body = m[2];
  } else {
    body = raw;
  }
  const filtered = fmLines.filter(
    (line) => !/^\s*sidebar_label\s*:/.test(line),
  );
  const safe = label.replace(/'/g, "''");
  filtered.push(`sidebar_label: '${safe}'`);
  const newFm = filtered.join('\n');
  const newBody = body.replace(/^#[^\n]*/m, `# ${label}`).trimStart();
  fs.writeFileSync(
    filePath,
    `---\n${newFm}\n---\n\n${newBody}`,
    'utf8',
  );
}

const files = walkDir(docsRoot);
for (const f of files) {
  applyFile(f);
}
console.log(`Updated ${files.length} MDX files with Chinese labels.`);
