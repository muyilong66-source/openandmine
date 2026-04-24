import React from 'react';
import Link from '@docusaurus/Link';

export default function AboutSection() {
  return (
    <div className="section-card about">
      <div className="section-icon" aria-hidden>
        🤝
      </div>
      <h2>关于我们</h2>
      <p className="section-card__lead">
        GeoWatch Solutions — 团队、文化与合作伙伴
      </p>

      <div className="sub-sections sub-sections--about">
        <Link to="/docs/about/company/overview" className="sub-item">
          <h3>公司简介</h3>
          <p>概况 · 发展历程 · 资质荣誉 · 合作伙伴</p>
        </Link>

        <Link to="/docs/about/team/management" className="sub-item">
          <h3>团队风采</h3>
          <p>管理 / 技术 / 现场团队与团队活动</p>
        </Link>

        <Link to="/docs/about/culture/vision" className="sub-item">
          <h3>企业文化</h3>
          <p>愿景 · 使命 · 价值观 · 社会责任</p>
        </Link>

        <Link to="/docs/about/join/why-us" className="sub-item">
          <h3>加入我们</h3>
          <p>人才发展 · 在招岗位 · 福利与联系</p>
        </Link>
      </div>
    </div>
  );
}
