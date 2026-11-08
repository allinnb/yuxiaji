import React from "react";
export default function Header({ now }: { now: any }) {
  return (
    <header>
      <div className="brand">
        玉匣<span>古书里的日常小仪式</span>
      </div>
      <div className="seal">玉匣</div>
      <div className="calendar">
        {now.solar} · {now.yearGz} {now.monthCn}月{now.dayCn} · {now.dayGz} ·{" "}
        {now.zhi}时
      </div>
    </header>
  );
}
