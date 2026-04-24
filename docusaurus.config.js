// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '矿山综合解决方案',
  tagline: '安全监测 科学防护 治理修复',
  favicon: 'img/favicon.ico',

  future: {
    // 与 v4: true 等效，但关闭 fasterByDefault：避免 Windows 上 Rspack dev 报错；构建走 Webpack + 下方 webpack 版本锁定
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
      useCssCascadeLayers: true,
      siteStorageNamespacing: true,
      fasterByDefault: false,
      mdx1CompatDisabledByDefault: true,
    },
  },

  url: 'https://geowatch-solutions.example.com',
  baseUrl: '/openandmine/',

  organizationName: 'geowatch-solutions',
  projectName: 'geowatch-solutions',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'ignore',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
    localeConfigs: {
      'zh-Hans': {
        label: '简体中文',
        htmlLang: 'zh-Hans',
        direction: 'ltr',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'GeoWatch Solutions',
        logo: {
          alt: 'GeoWatch Solutions — open and mine',
          src: 'img/geowatch-logo.png',
        },
        items: [
          {
            label: '矿山（边坡）监测 ',
            to: '/docs/geowatch/intro',
            position: 'left',
            className: 'gw-navbar-pillar gw-navbar-pillar--geowatch',
          },
          {
            label: '边坡工程防护',
            to: '/docs/slopeguard/intro',
            position: 'left',
            className: 'gw-navbar-pillar gw-navbar-pillar--slopeguard',
          },
          {
            label: '矿山环境治理',
            to: '/docs/minetreat/intro',
            position: 'left',
            className: 'gw-navbar-pillar gw-navbar-pillar--minetreat',
          },
          /* 临时隐藏「关于我们」顶栏入口（文档仍保留，恢复时取消注释本段）
          {
            label: '关于我们',
            to: '/docs/about/intro',
            position: 'left',
            className: 'gw-navbar-pillar gw-navbar-pillar--about',
          },
          */
          {
            label: '联系我们 182-0106-9835',
            href: 'tel:18201069835',
            position: 'left',
            className: 'gw-navbar-contact-tel',
          },
          {
            label: '案例中心',
            to: '/cases',
            position: 'right',
            /* 移动端顶栏隐藏，仅抽屉菜单显示（见 custom.css） */
            className: 'gw-navbar-topbar-hide-sm',
          },
          {
            label: '技术支持',
            to: '/support',
            position: 'right',
            className: 'gw-navbar-topbar-hide-sm',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '矿山监测 GeoWatch',
            items: [
              {
                label: '技术理论',
                to: '/docs/geowatch/theory/slope-monitoring-principles',
              },
              {
                label: '解决方案及产品',
                to: '/docs/geowatch/products/system-integration',
              },
              {label: '案例', to: '/docs/geowatch/cases/open-pit-mine'},
              {
                label: '延伸阅读',
                to: '/docs/geowatch/reading/industry-standards',
              },
            ],
          },
          {
            title: '边坡防护 SlopeGuard',
            items: [
              {
                label: '技术理论',
                to: '/docs/slopeguard/theory/slope-failure-mechanism',
              },
              {
                label: '解决方案及产品',
                to: '/docs/slopeguard/products/corrugated-pipe/overview',
              },
              {
                label: '案例',
                to: '/docs/slopeguard/cases/high-slope-protection',
              },
              {
                label: '延伸阅读',
                to: '/docs/slopeguard/reading/design-specifications',
              },
            ],
          },
          {
            title: '矿山治理',
            items: [
              {
                label: '技术理论',
                to: '/docs/minetreat/theory/amd-formation',
              },
              {
                label: '解决方案及产品',
                to: '/docs/minetreat/products/neutralization/overview',
              },
              {label: '案例', to: '/docs/minetreat/cases/coal-mine-amd'},
              {
                label: '延伸阅读',
                to: '/docs/minetreat/reading/environmental-regulations',
              },
            ],
          },
          /* 临时隐藏页脚「关于我们」列（恢复时取消注释）
          {
            title: '关于我们',
            items: [
              {label: '公司简介', to: '/docs/about/company/overview'},
              {label: '团队风采', to: '/docs/about/team/management'},
              {label: '企业文化', to: '/docs/about/culture/vision'},
              {label: '加入我们', to: '/docs/about/join/why-us'},
            ],
          },
          */
        ],
        copyright: `Copyright © ${new Date().getFullYear()} GeoWatch Solutions. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
