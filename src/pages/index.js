import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const featureList = [
  {
    title: '矿山（边坡）监测 GeoWatch',
    icon: '🏔️',
    description: (
      <>
        全方位智能感知，守护矿山边坡安全。
        <br />
        涵盖 GNSS、柔性测斜仪、裂缝计、渗水计、爆破振动仪、土压力计等方案与文档。
      </>
    ),
    link: '/docs/geowatch/intro',
  },
  {
    title: '边坡工程防护 SlopeGuard',
    icon: '🛡️',
    theme: 'slopeguard',
    description: (
      <>
        排水、锚固与防护结构一体化方案。
        <br />
        服务边坡加固与灾害防控。
      </>
    ),
    link: '/docs/slopeguard/intro',
  },
  {
    title: '矿山环境治理（酸性废水）MineTreat',
    icon: '💧',
    description: (
      <>
        酸性水（AMD）治理与生态修复。
        <br />
        水质达标、工艺设备与运维文档中心。
      </>
    ),
    link: '/docs/minetreat/intro',
  },
  {
    title: '关于我们',
    icon: '🤝',
    description: (
      <>
        GeoWatch Solutions 团队与文化。
        <br />
        公司简介、团队风采、企业文化与加入我们。
      </>
    ),
    link: '/docs/about/intro',
  },
];

function Feature({icon, title, description, link, theme}) {
  return (
    <div className={clsx('col', 'col--6', styles.featureColumn)}>
      <div
        className={clsx(
          styles.featureCard,
          theme === 'slopeguard' && styles.featureCardSlopeguard,
        )}>
        <div className={styles.featureIcon} aria-hidden>
          {icon}
        </div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDesc}>{description}</p>
        <div className={styles.featureLink}>
          <Link className="button button--primary button--md" to={link}>
            了解更多
          </Link>
        </div>
      </div>
    </div>
  );
}

export function HomepageFeatures() {
  return (
    <section className={styles.features} aria-label="主要业务板块">
      <div className="container">
        <div className="row">
          {featureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/geowatch/intro">
            浏览解决方案
          </Link>
          <a
            className="button button--outline button--secondary button--lg"
            href="#gw-four-pillars">
            业务板块
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="GeoWatch Solutions — 矿山（边坡）监测、边坡工程防护、矿山环境治理（酸性废水）与关于我们。">
      <HomepageHeader />
      <main>
        <div id="gw-four-pillars">
          <HomepageFeatures />
        </div>
      </main>
    </Layout>
  );
}
