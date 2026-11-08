import React from "react";
export default function Almanac({ now, almanac }: { now: any; almanac: any }) {
  return (
    <section className="card almanac">
      <p className="eyebrow">今日黄历</p>
      <h2>{now.solar}</h2>
      <div className="almanac-grid">
        <div>
          <strong>宜</strong>
          <p>{almanac.suitable.slice(0, 6).join(" · ")}</p>
        </div>
        <div>
          <strong>忌</strong>
          <p>{almanac.avoid.slice(0, 6).join(" · ")}</p>
        </div>
      </div>
      <p>
        冲煞：{almanac.clash} · 值神：{almanac.deity}
      </p>
      <details>
        <summary>彭祖百忌</summary>
        <p>{almanac.taboo}</p>
      </details>
      <small>方位依《玉匣记》；距离下一节气：待历书校订；民俗文化参考</small>
    </section>
  );
}
