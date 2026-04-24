import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

/** 首页 Hero：左现场图 + 右 SlopeGuard 文档图（均保留） */
const HERO_IMAGE_LEFT = '/img/home-hero-slope.png';
const HERO_IMAGE_RIGHT = '/img/slopeguard/flexible-slope/image7.png';

/** 图下可点击说明（「点我看看」在样式中突出） */
const HERO_LEFT_CAPTION_TO = '/docs/geowatch/products/flex-inclinometer/installation';
const HERO_RIGHT_CAPTION_TO = '/docs/slopeguard/products/flexible-slope/case-studies';

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
    /** 临时隐藏首页卡片；恢复：设为 false 或删除本字段 */
    hidden: true,
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

function Feature({icon, title, description, link}) {
  return (
    <div className={clsx('col', 'col--6', styles.featureColumn)}>
      <div className={styles.featureCard}>
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
        <header className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresHeading}>
            三大业务板块
          </Heading>
          <p className={styles.featuresIntro}>
            监测、防护、治理 — 一站式工程与文档中心
          </p>
        </header>
        <div className="row">
          {featureList
            .filter((props) => !props.hidden)
            .map((props) => (
              <Feature key={props.title} {...props} />
            ))}
        </div>
      </div>
    </section>
  );
}

function HeroSideVisual({src, alt, side, caption, captionTo}) {
  return (
    <div
      className={clsx(
        styles.heroVisual,
        side === 'left' ? styles.heroVisualLeft : styles.heroVisualRight,
      )}>
      <div className={styles.heroImageWrap}>
        <img
          className={styles.heroImage}
          src={src}
          alt={alt}
          width={740}
          height={900}
          decoding="async"
        />
        <div className={styles.heroImageScrim} aria-hidden />
      </div>
      {caption && captionTo ? (
        <p className={styles.heroCaption}>
          <Link className={styles.heroCaptionLink} to={captionTo}>
            {caption}
          </Link>
        </p>
      ) : null}
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const heroLeftSrc = useBaseUrl(HERO_IMAGE_LEFT);
  const heroRightSrc = useBaseUrl(HERO_IMAGE_RIGHT);
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx('container', styles.heroInner)}>
        <HeroSideVisual
          src={heroLeftSrc}
          alt="边坡工程现场：车载钻机与分级边坡施工"
          side="left"
          caption={
            <>
              柔性测斜仪（
              <span className={styles.heroCaptionCta}>点我看看</span>）
            </>
          }
          captionTo={HERO_LEFT_CAPTION_TO}
        />
        <div className={styles.heroText}>
          <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
            {siteConfig.title}
          </Heading>
          <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
            {siteConfig.tagline}
          </p>
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
        <HeroSideVisual
          src={heroRightSrc}
          alt="边坡工程防护（绿色装配式柔性护坡）"
          side="right"
          caption={
            <>
              绿色装配式柔性护坡（
              <span className={styles.heroCaptionCta}>点我看看</span>）
            </>
          }
          captionTo={HERO_RIGHT_CAPTION_TO}
        />
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="GeoWatch Solutions — 矿山（边坡）监测、边坡工程防护、矿山环境治理（酸性废水）。">
      <HomepageHeader />
      <main className={styles.homeMain}>
        <div id="gw-four-pillars" className={styles.pillarsWrap}>
          <HomepageFeatures />
        </div>
      </main>
    </Layout>
  );
}
