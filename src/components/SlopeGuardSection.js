import React from 'react';
import Link from '@docusaurus/Link';

export default function SlopeGuardSection() {
  return (
    <div className="section-card slopeguard">
      <div className="section-icon" aria-hidden>
        🛡️
      </div>
      <h2>边坡工程防护 SlopeGuard</h2>
      <p className="section-card__lead">
        排水、锚固与防护结构一体化方案，服务边坡加固与灾害防控
      </p>

      <div className="sub-sections sub-sections--two">
        <Link
          to="/docs/slopeguard/products/corrugated-pipe/overview"
          className="sub-item">
          <h3>解决方案及产品</h3>
          <p>绿色装配式柔性护坡 · 主/被动防护网 · 锚杆锚索 · 波纹管工程应用</p>
        </Link>

        <Link
          to="/docs/slopeguard/cases/high-slope-protection"
          className="sub-item">
          <h3>案例</h3>
          <p>高边坡 · 滑坡治理 · 落石防护 · 隧道洞口</p>
        </Link>
      </div>
    </div>
  );
}
