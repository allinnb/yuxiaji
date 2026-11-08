import React from "react";

type Props = { gan: string; dir: any };
const sectors = [
  ["离", "☲", "南"],
  ["坤", "☷", "西南"],
  ["兑", "☱", "西"],
  ["乾", "☰", "西北"],
  ["坎", "☵", "北"],
  ["艮", "☶", "东北"],
  ["震", "☳", "东"],
  ["巽", "☴", "东南"],
];
export default function Compass({ gan, dir }: Props) {
  const norm = (s: string) => s.replace(/^正/, "");
  const marks = (d: string) =>
    [
      ["喜", dir.xi],
      ["福", dir.fu],
      ["财", dir.cai],
      ["避", dir.wugui],
    ]
      .filter(([, m]: any) => norm(m.map[gan]) === d)
      .map(([k]) => k as string);
  return (
    <svg
      className="compass"
      viewBox="0 0 320 320"
      role="img"
      aria-label="后天八卦罗盘"
    >
      <circle cx="160" cy="160" r="148" />
      <circle cx="160" cy="160" r="104" />
      <circle cx="160" cy="160" r="58" />
      <text x="160" y="165" textAnchor="middle">
        中
      </text>
      {sectors.map(([name, gua, pos], i) => {
        const a = (i * Math.PI) / 4 - Math.PI / 2,
          x = 160 + 112 * Math.cos(a),
          y = 160 + 112 * Math.sin(a),
          ms = marks(pos);
        return (
          <g
            key={name}
            className={
              (ms.includes("避") ? "avoid " : "") +
              (ms.some((k) => k !== "避") ? "marked" : "")
            }
          >
            <path
              d={`M160 160 L${160 + 148 * Math.cos(a - Math.PI / 8)} ${160 + 148 * Math.sin(a - Math.PI / 8)} A148 148 0 0 1 ${160 + 148 * Math.cos(a + Math.PI / 8)} ${160 + 148 * Math.sin(a + Math.PI / 8)} Z`}
            />
            <text className="gua" x={x} y={y - 14} textAnchor="middle">
              {gua}
            </text>
            <text className="dir" x={x} y={y + 8} textAnchor="middle">
              {name}
            </text>
            <text className="dir-mark" x={x} y={y + 27} textAnchor="middle">
              {ms.join("·")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
