import React from 'react';
import Link from '@docusaurus/Link';

export default function MineTreatSection() {
  return (
    <div className="section-card minetreat">
      <div className="section-icon" aria-hidden>
        💧
      </div>
      <h2>矿山环境治理（酸性废水）MineTreat</h2>
      <p className="section-card__lead">
        酸性水（AMD）治理、水质达标与生态修复相关工艺与案例
      </p>

      <div className="sub-sections sub-sections--three">
        <Link
          to="/docs/minetreat/products/neutralization/overview"
          className="sub-item">
          <h3>解决方案及产品</h3>
          <p>中和系统 · 重金属去除 · 生态湿地 · 综合方案与水质监测</p>
        </Link>

        <Link to="/docs/minetreat/cases/coal-mine-amd" className="sub-item">
          <h3>案例</h3>
          <p>煤矿 / 金属矿排水 · 废弃矿山 · 流域生态修复</p>
        </Link>

        <Link to="/docs/minetreat/theory/amd-formation" className="sub-item">
          <h3>技术理论</h3>
          <p>AMD 形成机理 · 水化学 · 处理原理 · 被动/主动处理与生态修复</p>
        </Link>
      </div>
    </div>
  );
}
