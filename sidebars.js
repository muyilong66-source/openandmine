// @ts-check
// 四大板块独立侧边栏 — 进入对应文档后自动匹配本栏

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  geowatchSidebar: [
    {
      type: 'category',
      label: 'GeoWatch 概览',
      collapsed: true,
      items: ['geowatch/intro'],
    },
    {
      type: 'category',
      label: '解决方案及产品',
      collapsed: false,
      items: [
        'geowatch/products/system-integration',
        {
          type: 'category',
          label: '柔性测斜仪',
          items: [
            'geowatch/products/flex-inclinometer/installation',
            'geowatch/products/flex-inclinometer/specs',
            'geowatch/products/flex-inclinometer/principle',
            'geowatch/products/flex-inclinometer/data-reading',
          ],
        },
        {
          type: 'category',
          label: '裂缝计',
          items: [
            'geowatch/products/crackmeter/installation',
            'geowatch/products/crackmeter/specs',
            'geowatch/products/crackmeter/principle',
            'geowatch/products/crackmeter/case-study',
          ],
        },
        {
          type: 'category',
          label: '渗水计',
          items: [
            'geowatch/products/piezometer/installation',
            'geowatch/products/piezometer/specs',
            'geowatch/products/piezometer/principle',
            'geowatch/products/piezometer/seepage-analysis',
          ],
        },
        {
          type: 'category',
          label: '爆破振动仪',
          items: [
            'geowatch/products/blasting-vibrometer/installation',
            'geowatch/products/blasting-vibrometer/specs',
            'geowatch/products/blasting-vibrometer/principle',
            'geowatch/products/blasting-vibrometer/safety-standard',
          ],
        },
        {
          type: 'category',
          label: '土压力计',
          items: [
            'geowatch/products/earth-pressure/installation',
            'geowatch/products/earth-pressure/specs',
            'geowatch/products/earth-pressure/principle',
          ],
        },
        {
          type: 'category',
          label: 'GNSS表面位移监测',
          items: [
            'geowatch/products/gnss/gnss-installation',
            'geowatch/products/gnss/gnss-equipment',
            'geowatch/products/gnss/gnss-principle',
            'geowatch/products/gnss/gnss-data-platform',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '案例',
      collapsed: true,
      items: [
        'geowatch/cases/open-pit-mine',
        'geowatch/cases/underground-mine',
        'geowatch/cases/highway-cut-slope',
        'geowatch/cases/hydropower-slope',
        'geowatch/cases/tailings-dam',
      ],
    },
    {
      type: 'category',
      label: '技术理论',
      collapsed: true,
      items: [
        'geowatch/theory/slope-monitoring-principles',
        'geowatch/theory/deformation-mechanism',
        'geowatch/theory/early-warning-theory',
        'geowatch/theory/data-analysis-methods',
        'geowatch/theory/iot-sensor-tech',
      ],
    },
    {
      type: 'category',
      label: '延伸阅读',
      collapsed: true,
      items: [
        'geowatch/reading/industry-standards',
        'geowatch/reading/academic-papers',
        'geowatch/reading/technical-whitepaper',
        'geowatch/reading/faq',
      ],
    },
  ],

  slopeguardSidebar: [
    {
      type: 'category',
      label: 'SlopeGuard 概览',
      collapsed: true,
      items: ['slopeguard/intro'],
    },
    {
      type: 'category',
      label: '解决方案及产品',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '绿色装配式柔性护坡',
          collapsed: false,
          items: [
            'slopeguard/products/flexible-slope/installation',
            'slopeguard/products/flexible-slope/specs',
            'slopeguard/products/flexible-slope/principle',
            'slopeguard/products/flexible-slope/case-studies',
          ],
        },
        {
          type: 'category',
          label: '主/被动防护网',
          items: [
            'slopeguard/products/active-net/installation',
            'slopeguard/products/active-net/specs',
            'slopeguard/products/active-net/overview',
            'slopeguard/products/passive-net/installation',
            'slopeguard/products/passive-net/specs',
            'slopeguard/products/passive-net/overview',
          ],
        },
        {
          type: 'category',
          label: '锚杆/锚索',
          items: [
            'slopeguard/products/anchor/installation',
            'slopeguard/products/anchor/specs',
            'slopeguard/products/anchor/overview',
          ],
        },
        {
          type: 'category',
          label: '波纹管工程应用',
          items: [
            'slopeguard/products/corrugated-pipe/installation',
            'slopeguard/products/corrugated-pipe/specs',
            'slopeguard/products/corrugated-pipe/overview',
            'slopeguard/products/corrugated-pipe/drainage-calculation',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '案例',
      collapsed: true,
      items: [
        'slopeguard/cases/high-slope-protection',
        'slopeguard/cases/landslide-treatment',
        'slopeguard/cases/rockfall-protection',
        'slopeguard/cases/tunnel-portal',
      ],
    },
    {
      type: 'category',
      label: '技术理论',
      collapsed: true,
      items: [
        'slopeguard/theory/slope-failure-mechanism',
        'slopeguard/theory/reinforcement-principles',
        'slopeguard/theory/drainage-design',
        'slopeguard/theory/soil-nailing-theory',
        'slopeguard/theory/anchor-design',
      ],
    },
    {
      type: 'category',
      label: '延伸阅读',
      collapsed: true,
      items: [
        'slopeguard/reading/design-specifications',
        'slopeguard/reading/construction-standards',
        'slopeguard/reading/faq',
      ],
    },
  ],

  minetreatSidebar: [
    {
      type: 'category',
      label: '矿山治理概览',
      collapsed: true,
      items: ['minetreat/intro'],
    },
    {
      type: 'category',
      label: '解决方案及产品',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '酸性水中和系统',
          items: [
            'minetreat/products/neutralization/overview',
            'minetreat/products/neutralization/limestone-drum',
            'minetreat/products/neutralization/anoxic-limestone',
          ],
        },
        {
          type: 'category',
          label: '重金属去除系统',
          items: [
            'minetreat/products/heavy-metal/overview',
            'minetreat/products/heavy-metal/precipitation',
            'minetreat/products/heavy-metal/adsorption',
          ],
        },
        {
          type: 'category',
          label: '生态湿地系统',
          items: [
            'minetreat/products/wetland/overview',
            'minetreat/products/wetland/design',
            'minetreat/products/wetland/plant-selection',
          ],
        },
        'minetreat/products/integrated-solution',
        'minetreat/products/monitoring-system',
      ],
    },
    {
      type: 'category',
      label: '案例',
      collapsed: true,
      items: [
        'minetreat/cases/coal-mine-amd',
        'minetreat/cases/metal-mine-drainage',
        'minetreat/cases/abandoned-mine',
        'minetreat/cases/watershed-restoration',
      ],
    },
    {
      type: 'category',
      label: '技术理论',
      collapsed: true,
      items: [
        'minetreat/theory/amd-formation',
        'minetreat/theory/water-chemistry',
        'minetreat/theory/treatment-principles',
        'minetreat/theory/passive-treatment',
        'minetreat/theory/active-treatment',
        'minetreat/theory/ecological-restoration',
      ],
    },
    {
      type: 'category',
      label: '延伸阅读',
      collapsed: true,
      items: [
        'minetreat/reading/environmental-regulations',
        'minetreat/reading/technical-guidelines',
        'minetreat/reading/research-progress',
        'minetreat/reading/faq',
      ],
    },
  ],

  /**
   * 临时隐藏「关于我们」文档侧栏（`/docs/about/*` 仍可手动访问 URL）。
   * 恢复：将 `aboutSidebar` 设为下方 `ABOUT_SIDEBAR_RESTORE` 数组（或从 Git 历史还原）。
   */
  aboutSidebar: [],
};

/** 供恢复 about 侧栏时复制到 `sidebars` 的 `aboutSidebar` 字段 */
const ABOUT_SIDEBAR_RESTORE = [
  {
    type: 'category',
    label: '关于我们',
    collapsed: true,
    items: ['about/intro'],
  },
  {
    type: 'category',
    label: '公司简介',
    collapsed: true,
    items: [
      'about/company/overview',
      'about/company/development',
      'about/company/qualifications',
      'about/company/partners',
    ],
  },
  {
    type: 'category',
    label: '团队风采',
    collapsed: true,
    items: [
      'about/team/management',
      'about/team/technical',
      'about/team/field-team',
      'about/team/team-activities',
    ],
  },
  {
    type: 'category',
    label: '企业文化',
    collapsed: true,
    items: [
      'about/culture/vision',
      'about/culture/mission',
      'about/culture/values',
      'about/culture/social-responsibility',
    ],
  },
  {
    type: 'category',
    label: '加入我们',
    collapsed: true,
    items: [
      'about/join/why-us',
      'about/join/positions',
      'about/join/benefits',
      'about/join/contact',
    ],
  },
];

void ABOUT_SIDEBAR_RESTORE;

export default sidebars;
