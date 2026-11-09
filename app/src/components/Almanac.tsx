import React from "react";
import type { AlmanacData } from "../almanac";
function Items({ values }: { values: string[] }) {
  const many = values.length > 8;
  const body = <p>{values.join(" · ")}</p>;
  return many ? (
    <details>
      <summary>{values.slice(0, 8).join(" · ")} · 更多</summary>
      {body}
    </details>
  ) : (
    body
  );
}
export default function Almanac({
  now,
  almanac,
}: {
  now: any;
  almanac: AlmanacData & { jieqiText: string };
}) {
  return (
    <section className="card almanac">
      <p className="eyebrow">今日黄历</p>
      <h2>{now.solar}</h2>
      <p>
        <strong>{almanac.ganZhi}日</strong> ·{" "}
        <details className="inline-details">
          <summary>{almanac.zhiXing}日</summary>
          <span>{almanac.note}</span>
        </details>
      </p>
      <div className="almanac-grid">
        <div>
          <strong>宜</strong>
          <Items values={almanac.suitable} />
        </div>
        <div>
          <strong>忌</strong>
          <Items values={almanac.avoid} />
        </div>
      </div>
      <p>
        冲煞：{almanac.clash} · 值神：{almanac.deity}（{almanac.deityType}）
      </p>
      <details>
        <summary>彭祖百忌</summary>
        <p>{almanac.taboo}</p>
      </details>
      <small>
        {almanac.jieqiText}；宜忌依《协纪辨方书》建除神煞体系，民俗参考
      </small>
    </section>
  );
}
