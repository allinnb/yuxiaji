// src/PalmChart.jsx  小六壬掌诀图（左手，传统图式：拇指在左，六宫顺时针）
// props: active 当前宫序 0-5（大安 留连 速喜 赤口 小吉 空亡）；visited 已经过的宫序数组
const NAMES = ['大安', '留连', '速喜', '赤口', '小吉', '空亡'];
const POS = [
  [129.8, 169.6],
  [118.8, 80.7],
  [167.7, 55.3],
  [216.6, 72.3],
  [208.4, 165.4],
  [169.5, 158.0]
];
const HAND = (
  <>
    <path d="M118 200 C140 186 230 190 254 206 C266 222 262 262 254 296 C246 330 232 350 224 372 L146 372 C140 350 124 336 110 312 C94 290 98 250 108 226 Z" /><path d="M134.9 330.6 L131.0 325.2 L127.1 319.8 L123.2 314.5 L119.3 309.1 L115.4 303.7 L111.5 298.4 L107.7 292.9 L104.0 287.4 L100.2 281.9 L96.5 276.4 L92.8 270.9 L89.1 265.4 L85.4 259.9 L81.9 254.3 L78.6 248.4 L74.4 243.3 L70.7 237.8 L67.0 232.2 L63.4 226.6 L59.8 221.1 L56.1 215.5 L53.6 211.6 A14.8 16.0 -36.0 0 1 77.6 194.1 L77.6 194.1 L80.5 197.8 L84.7 203.0 L88.9 208.1 L93.1 213.3 L97.2 218.5 L101.3 223.7 L104.9 229.3 L109.5 234.2 L113.7 239.3 L117.8 244.5 L121.9 249.8 L126.0 255.0 L130.1 260.2 L134.2 265.5 L138.2 270.7 L142.2 276.0 L146.1 281.4 L150.0 286.8 L153.9 292.1 L157.8 297.5 L161.7 302.9 L165.6 308.2 Z" /><path d="M120.9 232.7 L120.0 225.5 L119.1 218.3 L118.2 211.0 L117.3 203.8 L116.5 196.6 L115.7 189.3 L115.0 182.0 L114.3 174.8 L113.6 167.5 L112.9 160.3 L112.3 153.0 L112.2 145.7 L110.9 138.5 L110.1 131.2 L109.5 124.0 L108.8 116.7 L108.4 109.4 L108.1 102.1 L106.9 94.9 L106.3 87.6 L105.7 80.3 L105.1 73.1 L104.9 71.7 A12.7 13.7 -7.0 0 1 130.2 68.6 L130.2 68.6 L130.4 70.0 L131.5 77.2 L132.7 84.4 L133.8 91.6 L134.5 98.8 L135.9 106.0 L137.3 113.2 L138.4 120.4 L139.5 127.6 L140.6 134.8 L141.0 142.1 L142.7 149.3 L143.9 156.5 L145.0 163.7 L146.0 170.9 L147.1 178.1 L148.1 185.3 L149.2 192.5 L150.1 199.8 L151.0 207.0 L151.9 214.3 L152.8 221.5 L153.6 228.7 Z" /><path d="M153.7 227.8 L153.5 219.6 L153.4 211.3 L153.3 203.1 L153.1 194.9 L153.0 186.7 L153.0 178.4 L153.0 170.2 L153.1 162.0 L153.1 153.7 L153.2 145.5 L153.5 137.3 L153.9 129.0 L153.4 120.8 L153.4 112.6 L153.5 104.3 L153.6 96.1 L154.2 87.9 L154.2 79.6 L154.0 71.4 L154.1 63.2 L154.2 54.9 L154.4 46.7 L154.4 43.8 A13.0 14.1 -1.0 0 1 180.5 43.4 L180.5 43.4 L180.7 46.3 L181.1 54.5 L181.5 62.7 L181.9 70.9 L182.0 79.1 L182.3 87.4 L183.2 95.6 L183.5 103.8 L183.9 112.0 L184.3 120.3 L184.0 128.5 L184.8 136.7 L185.3 144.9 L185.7 153.2 L186.0 161.4 L186.3 169.6 L186.6 177.8 L186.9 186.1 L187.1 194.3 L187.3 202.5 L187.4 210.7 L187.5 219.0 L187.7 227.2 Z" /><path d="M186.9 228.0 L187.5 220.4 L188.2 212.8 L188.9 205.2 L189.5 197.7 L190.2 190.1 L191.0 182.5 L191.9 175.0 L192.7 167.4 L193.5 159.8 L194.4 152.3 L195.4 144.8 L196.7 137.2 L196.9 129.6 L197.8 122.1 L198.7 114.5 L199.6 106.9 L200.9 99.4 L201.7 91.9 L202.3 84.3 L203.2 76.7 L204.1 69.2 L205.1 61.6 L205.4 59.2 A12.3 13.3 5.0 0 1 229.9 61.4 L229.9 61.4 L229.7 63.8 L229.3 71.4 L228.9 79.0 L228.5 86.6 L227.7 94.1 L227.3 101.7 L227.3 109.4 L226.8 117.0 L226.4 124.6 L225.9 132.2 L224.9 139.7 L224.8 147.3 L224.5 154.9 L224.1 162.5 L223.6 170.1 L223.1 177.7 L222.6 185.3 L222.0 192.9 L221.4 200.5 L220.7 208.0 L220.1 215.6 L219.4 223.2 L218.8 230.8 Z" /><path d="M220.0 231.6 L221.2 225.9 L222.4 220.2 L223.6 214.5 L224.8 208.8 L226.1 203.1 L227.4 197.4 L228.7 191.7 L230.1 186.0 L231.4 180.3 L232.8 174.7 L234.2 169.0 L236.1 163.5 L237.0 157.7 L238.3 152.0 L239.7 146.3 L241.1 140.7 L242.6 135.0 L244.5 129.4 L245.4 123.7 L246.8 118.0 L248.2 112.3 L249.6 106.7 L249.9 105.8 A10.4 11.2 12.0 0 1 270.2 110.2 L270.2 110.2 L270.1 111.0 L269.1 116.8 L268.1 122.5 L267.1 128.3 L265.6 133.9 L265.0 139.8 L264.1 145.5 L263.0 151.3 L262.0 157.0 L260.9 162.7 L259.3 168.4 L258.8 174.2 L257.8 180.0 L256.7 185.7 L255.7 191.5 L254.6 197.2 L253.5 202.9 L252.4 208.7 L251.2 214.4 L250.0 220.1 L248.8 225.8 L247.6 231.5 L246.4 237.2 Z" />
  </>
);

export default function PalmChart({ active = -1, visited = [] }) {
  return (
    <svg className="palm" viewBox="8 22 276 360" role="img" aria-label="小六壬掌诀图">
      <defs>
        <linearGradient id="palm-skin" gradientUnits="userSpaceOnUse" x1="0" y1="30" x2="0" y2="380">
          <stop offset="0" stopColor="#f8efdc" />
          <stop offset="1" stopColor="#ead8b6" />
        </linearGradient>
        <filter id="palm-ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="1.4" />
        </filter>
        <radialGradient id="palm-glow">
          <stop offset="0" stopColor="#a8382a" stopOpacity=".5" />
          <stop offset="1" stopColor="#a8382a" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* 描边层在下、填充层在上，合成整只手的外轮廓 */}
      <g className="palm-outline" filter="url(#palm-ink)">{HAND}</g>
      <g className="palm-fill">{HAND}</g>
      <g className="palm-crease"><path d="M83.6 244.8 Q93.1 241.1 99.9 233.0" /><path d="M85.5 247.4 Q94.9 243.7 101.8 235.6" /><path d="M117.6 144.1 Q126.8 145.2 135.4 141.9" /><path d="M118.0 147.3 Q127.2 148.4 135.8 145.1" /><path d="M113.2 102.3 Q121.6 103.5 129.5 100.3" /><path d="M113.6 105.5 Q122.0 106.7 129.9 103.5" /><path d="M159.7 129.7 Q169.0 131.7 178.3 129.4" /><path d="M159.8 132.9 Q169.1 134.9 178.3 132.6" /><path d="M159.7 82.3 Q168.2 84.3 176.6 82.0" /><path d="M159.7 85.5 Q168.2 87.5 176.7 85.2" /><path d="M202.0 138.3 Q210.5 141.2 219.4 139.8" /><path d="M201.7 141.5 Q210.2 144.4 219.1 143.0" /><path d="M206.6 94.7 Q214.3 97.6 222.5 96.1" /><path d="M206.3 97.9 Q214.1 100.8 222.2 99.3" /><path d="M241.0 162.3 Q247.7 166.0 255.4 165.3" /><path d="M240.3 165.4 Q247.1 169.1 254.7 168.5" /><path d="M248.6 129.5 Q254.7 133.1 261.7 132.3" /><path d="M248.0 132.7 Q254.0 136.3 261.0 135.5" /></g>
      <g className="palm-lines"><path d="M252 236 C220 232 180 238 150 226" /><path d="M250 258 C214 252 172 254 128 240" /><path d="M134 232 C150 270 152 318 160 362" /></g>
      <path className="palm-loop" d="M129.8 169.6 L118.8 80.7 L167.7 55.3 L216.6 72.3 L208.4 165.4 L169.5 158.0 Z" />
      {POS.map(([x, y], i) => {
        const cls = i === active ? 'gong active' : visited.includes(i) ? 'gong visited' : 'gong';
        return (
          <g key={i} className={cls}>
            {i === active && <circle className="glow" cx={x} cy={y} r="24" />}
            <circle className="dot" cx={x} cy={y} r="12.5" />
            <text x={x} y={y + 3.8} textAnchor="middle">{NAMES[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ===== CSS：删掉旧的 .palm 相关规则，换成下面这些 =====
.palm{width:100%;max-width:300px;display:block;margin:16px auto}
.palm-outline{fill:#4a3c30;stroke:#4a3c30;stroke-width:3.2;stroke-linejoin:round}
.palm-fill{fill:url(#palm-skin)}
.palm-crease{fill:none;stroke:#a88f70;stroke-width:1;stroke-linecap:round;opacity:.85}
.palm-lines{fill:none;stroke:#bfa785;stroke-width:1.1;stroke-linecap:round;opacity:.75}
.palm-loop{fill:none;stroke:var(--gold);stroke-width:1;stroke-dasharray:1.5 3.5}
.palm .dot{fill:#fdf8ee;stroke:var(--gold);stroke-width:1.2;transition:fill .18s,stroke .18s}
.palm .gong text{font-family:LXGW,serif;font-size:10px;fill:var(--ink)}
.palm .visited .dot{fill:#e2c3a8}
.palm .active .dot{fill:var(--cinnabar);stroke:var(--cinnabar)}
.palm .active text{fill:#fff}
.palm .glow{fill:url(#palm-glow);transform-box:fill-box;transform-origin:center;animation:gong-pulse 1.6s ease-in-out infinite}
@keyframes gong-pulse{50%{opacity:.45;transform:scale(1.25)}}
*/
