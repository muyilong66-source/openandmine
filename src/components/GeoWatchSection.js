import React from 'react';
import Link from '@docusaurus/Link';

const productLinks = [
  {label: '系统集成云平台', to: '/docs/geowatch/products/system-integration'},
  {label: '柔性测斜仪', to: '/docs/geowatch/products/flex-inclinometer/principle'},
  {label: '裂缝计', to: '/docs/geowatch/products/crackmeter/principle'},
  {label: '渗水计', to: '/docs/geowatch/products/piezometer/principle'},
  {label: '爆破振动仪', to: '/docs/geowatch/products/blasting-vibrometer/principle'},
  {label: '土压力计', to: '/docs/geowatch/products/earth-pressure/principle'},
  {label: 'GNSS表面位移监测', to: '/docs/geowatch/products/gnss/gnss-principle'},
];

export default function GeoWatchSection() {
  return (
    <div className="section-card geowatch">
      <div className="section-icon" aria-hidden>
        📡
      </div>
      <h2>矿山（边坡）监测 GeoWatch</h2>
      <p className="section-card__lead">
        全方位智能感知，守护矿山边坡安全
      </p>

      <div className="sub-sections sub-sections--geowatch">
        <div className="sub-item sub-item--nested sub-item--wide">
          <h3>解决方案及产品</h3>
          <p className="sub-item__hint">按产品线进入文档</p>
          <ul className="sub-item__link-list">
            {productLinks.map(({label, to}) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <Link to="/docs/geowatch/cases/open-pit-mine" className="sub-item">
          <h3>案例</h3>
          <p>露天矿 · 地下矿 · 公路边坡 · 水电站 · 尾矿库</p>
        </Link>

        <Link
          to="/docs/geowatch/theory/slope-monitoring-principles"
          className="sub-item">
          <h3>技术理论</h3>
          <p>边坡监测原理 · 变形机理 · 预警模型 · 数据分析与物联网传感</p>
        </Link>
      </div>
    </div>
  );
}
