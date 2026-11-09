import React from "react";
export default function Almanac({ now, almanac }: { now: any; almanac: any }) {
  return (
    <section className="card almanac">
      <p className="eyebrow">今日黃曆</p>
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
        沖煞：{almanac.clash} · 值神：{almanac.deity}
      </p>
      <details>
        <summary>彭祖百忌</summary>
        <p>{almanac.taboo}</p>
      </details>
      <small>方位依《玉匣記》；{almanac.jieqiText}；民俗文化參考</small>
    </section>
  );
}
