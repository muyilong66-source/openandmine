/**
 * One-off: create placeholder MDX for every doc id in sidebars.js
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.join(__dirname, '..', 'docs');

const docIds = [
  'geowatch/intro',
  'geowatch/theory/slope-monitoring-principles',
  'geowatch/theory/deformation-mechanism',
  'geowatch/theory/early-warning-theory',
  'geowatch/theory/data-analysis-methods',
  'geowatch/theory/iot-sensor-tech',
  'geowatch/products/gnss/gnss-principle',
  'geowatch/products/gnss/gnss-equipment',
  'geowatch/products/gnss/gnss-installation',
  'geowatch/products/gnss/gnss-data-platform',
  'geowatch/products/flex-inclinometer/principle',
  'geowatch/products/flex-inclinometer/specs',
  'geowatch/products/flex-inclinometer/installation',
  'geowatch/products/flex-inclinometer/data-reading',
  'geowatch/products/crackmeter/principle',
  'geowatch/products/crackmeter/specs',
  'geowatch/products/crackmeter/installation',
  'geowatch/products/crackmeter/case-study',
  'geowatch/products/piezometer/principle',
  'geowatch/products/piezometer/specs',
  'geowatch/products/piezometer/installation',
  'geowatch/products/piezometer/seepage-analysis',
  'geowatch/products/blasting-vibrometer/principle',
  'geowatch/products/blasting-vibrometer/specs',
  'geowatch/products/blasting-vibrometer/installation',
  'geowatch/products/blasting-vibrometer/safety-standard',
  'geowatch/products/earth-pressure/principle',
  'geowatch/products/earth-pressure/specs',
  'geowatch/products/earth-pressure/installation',
  'geowatch/products/system-integration',
  'geowatch/cases/open-pit-mine',
  'geowatch/cases/underground-mine',
  'geowatch/cases/highway-cut-slope',
  'geowatch/cases/hydropower-slope',
  'geowatch/cases/tailings-dam',
  'geowatch/reading/industry-standards',
  'geowatch/reading/academic-papers',
  'geowatch/reading/technical-whitepaper',
  'geowatch/reading/faq',
  'slopeguard/intro',
  'slopeguard/theory/slope-failure-mechanism',
  'slopeguard/theory/reinforcement-principles',
  'slopeguard/theory/drainage-design',
  'slopeguard/theory/soil-nailing-theory',
  'slopeguard/theory/anchor-design',
  'slopeguard/products/corrugated-pipe/overview',
  'slopeguard/products/corrugated-pipe/specs',
  'slopeguard/products/corrugated-pipe/installation',
  'slopeguard/products/corrugated-pipe/drainage-calculation',
  'slopeguard/products/active-net/overview',
  'slopeguard/products/active-net/specs',
  'slopeguard/products/active-net/installation',
  'slopeguard/products/passive-net/overview',
  'slopeguard/products/passive-net/specs',
  'slopeguard/products/passive-net/installation',
  'slopeguard/products/anchor/overview',
  'slopeguard/products/anchor/specs',
  'slopeguard/products/anchor/installation',
  'slopeguard/products/comprehensive-solution',
  'slopeguard/products/flexible-slope/installation',
  'slopeguard/products/flexible-slope/specs',
  'slopeguard/products/flexible-slope/principle',
  'slopeguard/products/flexible-slope/case-studies',
  'slopeguard/cases/high-slope-protection',
  'slopeguard/cases/landslide-treatment',
  'slopeguard/cases/rockfall-protection',
  'slopeguard/cases/tunnel-portal',
  'slopeguard/reading/design-specifications',
  'slopeguard/reading/construction-standards',
  'slopeguard/reading/faq',
  'minetreat/intro',
  'minetreat/theory/amd-formation',
  'minetreat/theory/water-chemistry',
  'minetreat/theory/treatment-principles',
  'minetreat/theory/passive-treatment',
  'minetreat/theory/active-treatment',
  'minetreat/theory/ecological-restoration',
  'minetreat/products/neutralization/overview',
  'minetreat/products/neutralization/limestone-drum',
  'minetreat/products/neutralization/anoxic-limestone',
  'minetreat/products/heavy-metal/overview',
  'minetreat/products/heavy-metal/precipitation',
  'minetreat/products/heavy-metal/adsorption',
  'minetreat/products/wetland/overview',
  'minetreat/products/wetland/design',
  'minetreat/products/wetland/plant-selection',
  'minetreat/products/integrated-solution',
  'minetreat/products/monitoring-system',
  'minetreat/cases/coal-mine-amd',
  'minetreat/cases/metal-mine-drainage',
  'minetreat/cases/abandoned-mine',
  'minetreat/cases/watershed-restoration',
  'minetreat/reading/environmental-regulations',
  'minetreat/reading/technical-guidelines',
  'minetreat/reading/research-progress',
  'minetreat/reading/faq',
  'about/intro',
  'about/company/overview',
  'about/company/development',
  'about/company/qualifications',
  'about/company/partners',
  'about/team/management',
  'about/team/technical',
  'about/team/field-team',
  'about/team/team-activities',
  'about/culture/vision',
  'about/culture/mission',
  'about/culture/values',
  'about/culture/social-responsibility',
  'about/join/why-us',
  'about/join/positions',
  'about/join/benefits',
  'about/join/contact',
];

function titleFromId(id) {
  const leaf = id.split('/').pop();
  return leaf
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

let n = 0;
for (const id of docIds) {
  if (id.endsWith('/intro')) {
    continue;
  }
  const filePath = path.join(docsRoot, `${id}.mdx`);
  fs.mkdirSync(path.dirname(filePath), {recursive: true});
  const title = titleFromId(id);
  const body = `---\n---\n\n# ${title}\n\n内容建设中。\n`;
  fs.writeFileSync(filePath, body, 'utf8');
  n += 1;
}

console.log(`Wrote ${n} stub MDX files under docs/ (skipped */intro).`);
