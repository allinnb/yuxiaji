import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Solar } from "lunar-javascript";
import data from "./data.json";
import PalmChart from "./components/PalmChart";
import Compass from "./components/Compass";
import Header from "./components/Header";
import Almanac from "./components/Almanac";
import { liurenSeq } from "./lib/liuren";
import "./style.css";
const zhis = [
    "子",
    "丑",
    "寅",
    "卯",
    "辰",
    "巳",
    "午",
    "未",
    "申",
    "酉",
    "戌",
    "亥",
  ],
  palaces = ["大安", "留连", "速喜", "赤口", "小吉", "空亡"],
  monthNames = [
    "正",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "十一",
    "十二",
  ];
function dayCn(n: number) {
  const s = [
    "",
    "初一",
    "初二",
    "初三",
    "初四",
    "初五",
    "初六",
    "初七",
    "初八",
    "初九",
    "初十",
    "十一",
    "十二",
    "十三",
    "十四",
    "十五",
    "十六",
    "十七",
    "十八",
    "十九",
    "二十",
    "廿一",
    "廿二",
    "廿三",
    "廿四",
    "廿五",
    "廿六",
    "廿七",
    "廿八",
    "廿九",
    "三十",
  ];
  return s[n] || "";
}
function getNow() {
  const date = new Date();
  const l: any = Solar.fromDate(date).getLunar();
  return {
    l,
    month: Math.abs(l.getMonth()),
    day: l.getDay(),
    zhi: l.getTimeZhi(),
    monthCn: l.getMonthInChinese(),
    dayCn: l.getDayInChinese(),
    yearGz: l.getYearInGanZhi(),
    dayGz: l.getDayInGanZhi(),
    gan: l.getDayGan(),
    solar: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
  };
}
function LegacyCompass({ gan, dir }: { gan: string; dir: any }) {
  const sectors = [
    ["离", "☲", "南", "top"],
    ["坤", "☷", "西南", "bl"],
    ["兑", "☱", "西", "left"],
    ["乾", "☰", "西北", "tl"],
    ["坎", "☵", "北", "bottom"],
    ["艮", "☶", "东北", "tr"],
    ["震", "☳", "东", "right"],
    ["巽", "☴", "东南", "br"],
  ];
  const norm = (s: string) => s.replace(/^正/, "");
  const marks = (d: string) =>
    [
      ["喜", dir.xi],
      ["福", dir.fu],
      ["财", dir.cai],
      ["避", dir.wugui],
    ]
      .filter(([, m]: any) => norm(m.map[gan]) === d)
      .map(([k]: any) => k);
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
      {sectors.map(([name, gua, pos, cls], i) => {
        const a = (i * Math.PI) / 4 - Math.PI / 2,
          x = 160 + 112 * Math.cos(a),
          y = 160 + 112 * Math.sin(a),
          m = marks(pos).join("·");
        return (
          <g
            key={name}
            className={
              (m.includes("避") ? "avoid " : "") +
              (m.split("·").some((k) => k !== "避") ? "marked" : "")
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
            <text x={x} y={y + 27} textAnchor="middle" className="dir-mark">
              {m}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
function LegacyPalm({ active, step }: { active: number; step: number }) {
  const points = [
    [74, 86],
    [74, 40],
    [160, 40],
    [246, 40],
    [246, 86],
    [160, 86],
  ];
  return (
    <svg className="palm" viewBox="0 0 320 150">
      <path d="M45 130 Q30 95 48 78 L58 22 Q64 10 74 22 L78 70 L145 12 Q160 4 164 20 L164 70 L224 24 Q240 18 245 34 L245 77 Q280 67 286 84 L270 130Z" />
      <path d="M78 70 L78 112 M164 70 L164 112 M245 77 L245 112" />
      {points.map((p, i) => (
        <g key={i} className={active === i ? "active" : ""}>
          <circle cx={p[0]} cy={p[1]} r="17" />
          <text x={p[0]} y={p[1] + 4} textAnchor="middle">
            {palaces[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}
function App() {
  const [now, setNow] = useState(getNow()),
    almanac = {
      suitable: ["整饰", "沐浴", "纳财", "出行", "祭祀", "安床"],
      avoid: ["动土", "嫁娶", "破土", "安葬", "开仓", "伐木"],
      clash: `冲${now.l.getDayShengXiao?.() ?? ""}`,
      deity: now.l.getDayZhi?.() ?? "值日",
      taboo: "甲不开仓，财物耗散；乙不栽植，千株不长",
    },
    [tab, setTab] = useState("sign"),
    [sign, setSign] = useState(0),
    [zhi, setZhi] = useState(now.zhi),
    [month, setMonth] = useState(now.month),
    [day, setDay] = useState(now.day),
    [time, setTime] = useState(now.zhi),
    [manual, setManual] = useState(false),
    [step, setStep] = useState(3),
    [visited, setVisited] = useState([] as number[]),
    [running, setRunning] = useState(false),
    timerRef = useRef([] as number[]),
    [v, setV] = useState(0),
    [h, setH] = useState(0),
    [hint, setHint] = useState(""),
    [chant, setChant] = useState(false),
    [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    const id = setInterval(() => setNow(getNow()), 60000);
    return () => {
      clearInterval(id);
      timerRef.current.forEach(clearTimeout);
    };
  }, []);
  const playLiuren = () => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setRunning(false);
      setStep(3);
      setVisited(seq.slice(0, 2));
      return;
    }
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    setRunning(true);
    setStep(0);
    setVisited([]);
    const timers = seq.map((_, i) =>
      window.setTimeout(() => {
        setStep(i);
        setVisited(seq.slice(0, i));
        if (i === seq.length - 1)
          window.setTimeout(() => setRunning(false), 500);
      }, i * 680),
    );
    timerRef.current = timers;
  };
  const item: any = (data as any).signs[sign],
    entry: any = item.entries.find((e: any) => e.zhi === zhi),
    idx = liurenSeq(month, day, zhis.indexOf(time))[2],
    palace: any = (data as any).xiaoliuren.palaces[idx],
    dir: any = (data as any).directions;
  const seq = liurenSeq(month, day, zhis.indexOf(time)),
    monthText = monthNames[month - 1] + "月",
    canvas = useRef(null),
    startRef = useRef(null),
    prevRef = useRef(null),
    last = useRef(null),
    width = useRef(5),
    segmentRef = useRef(0);
  useEffect(() => {
    const c: any = canvas.current;
    if (!c) return;
    const fit = () => {
      const r = c.getBoundingClientRect(),
        d = window.devicePixelRatio || 1;
      c.width = Math.round(r.width * d);
      c.height = Math.round(r.height * d);
      const g = c.getContext("2d");
      g.setTransform(d, 0, 0, d, 0, 0);
      g.lineCap = "round";
      g.lineJoin = "round";
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);
  const stroke = (e: any) => {
    const c = canvas.current;
    if (!c) return;
    const r = c.getBoundingClientRect(),
      p = { x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() };
    const g = c.getContext("2d")!;
    if (e.type === "pointerdown") {
      startRef.current = p;
      prevRef.current = null;
      last.current = p;
      c.setPointerCapture(e.pointerId);
      g.fillStyle = "#2a241e";
      g.beginPath();
      width.current = 10;
      segmentRef.current = 0;
      g.arc(p.x, p.y, width.current / 2, 0, 7);
      g.fill();
      return;
    }
    if (e.type === "pointermove" && last.current) {
      const q = last.current,
        p0 = prevRef.current || q,
        dt = Math.max(1, p.t - q.t),
        speed = Math.hypot(p.x - q.x, p.y - q.y) / dt;
      let w = Math.max(3, Math.min(10, 10 - speed * 4));
      segmentRef.current += 1;
      if (segmentRef.current > 1000000) segmentRef.current = 3;
      if (e.pointerType === "pen" && e.pressure) w *= 0.4 + e.pressure;
      if (segmentRef.current > 0 && segmentRef.current <= 3) w *= 0.5;
      width.current = width.current * 0.7 + w * 0.3;
      g.strokeStyle = "#2a241e";
      g.globalAlpha = 0.9;
      g.lineWidth = width.current;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo((p0.x + q.x) / 2, (p0.y + q.y) / 2);
      g.quadraticCurveTo(q.x, q.y, (q.x + p.x) / 2, (q.y + p.y) / 2);
      g.stroke();
      prevRef.current = q;
      last.current = p;
    }
    if (e.type === "pointercancel") {
      last.current = null;
      startRef.current = null;
      return;
    }
    if (e.type === "pointerup") {
      if (startRef.current && last.current) {
        const dx = p.x - startRef.current.x,
          dy = p.y - startRef.current.y;
        const vertical = Math.abs(dy) > Math.abs(dx) * 1.5 && Math.abs(dy) > 40,
          horizontal = Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 40;
        if (vertical && v < 4) setV((x) => x + 1);
        else if (horizontal && v < 4) setHint("先画四纵");
        else if (horizontal && h < 5) setH((x) => x + 1);
        else if (!vertical && !horizontal) setHint("笔画请横平竖直");
        if (v === 4 && h === 4 && horizontal) setChant(true);
      }
      g.globalAlpha = 1;
      last.current = null;
      prevRef.current = null;
      startRef.current = null;
    }
  };
  const reset = () => {
    const c = canvas.current;
    c?.getContext("2d")?.clearRect(0, 0, c.width, c.height);
    setV(0);
    setH(0);
    setChant(false);
  };
  const drawShare = async (kind: string) => {
    await document.fonts.ready;
    const c = document.createElement("canvas");
    c.width = 1080;
    c.height = 1440;
    const x = c.getContext("2d")!;
    x.fillStyle = "#f3ead6";
    x.fillRect(0, 0, c.width, c.height);
    x.fillStyle = "#2a241e";
    x.font = "72px MaShan";
    x.fillText("玉匣", 90, 140);
    x.font = "42px LXGW";
    x.fillText(
      kind === "sign" ? "身体预兆" : kind === "liu" ? "小六壬" : "出门仪式",
      90,
      230,
    );
    x.font = "38px LXGW";
    const shareLines =
      kind === "sign"
        ? [`${item.title} · ${zhi}时`, entry.text]
        : kind === "liu"
          ? [
              `${monthText}落${palaces[seq[0]]} → ${dayCn(day)}落${palaces[seq[1]]} → ${time}时落${palace.name}`,
              palace.verse,
            ]
          : [
              `喜神 ${dir.xi.map[now.gan]} · 福神 ${dir.fu.map[now.gan]} · 财神 ${dir.cai.map[now.gan]}`,
              (data as any).zongheng.incantation,
            ];
    shareLines.forEach((line, i) =>
      x.fillText(line.slice(0, 34), 90, 340 + i * 70),
    );
    x.font = "30px LXGW";
    x.fillText("民俗参考 · yuxiaji.puwa.online", 90, 1260);
    x.fillStyle = "#a8382a";
    x.fillRect(900, 1250, 90, 90);
    x.fillStyle = "#fff";
    x.fillText("敕", 925, 1310);
    c.toBlob(async (b) => {
      if (!b) return;
      const u = URL.createObjectURL(b);
      setShareUrl(u);
      const file = new File([b], `yuxiaji-${kind}.png`, { type: "image/png" });
      if (navigator.userAgent.includes("MicroMessenger")) return;
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share?.({ files: [file], title: "玉匣" });
        return;
      }
      const a = document.createElement("a");
      a.href = u;
      a.download = file.name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(u), 1000);
    }, "image/png");
  };
  return (
    <main>
      <Header now={now} />
      <Almanac now={now} almanac={almanac} />
      <section className="hero">
        <div className="mountains" />
        <p className="eyebrow">民俗文化 · 慢生活</p>
        <h1>
          把古人的智慧
          <br />
          <em>放进今天的日常</em>
        </h1>
        <p>一方小匣，收纳身体预兆、时课推演与出门仪式。</p>
      </section>
      <nav>
        {[
          ["sign", "卷一 身兆"],
          ["liu", "卷二 时课"],
          ["out", "卷三 出行"],
        ].map(([k, t]) => (
          <button
            className={tab === k ? "active" : ""}
            onClick={() => setTab(k)}
          >
            {t}
          </button>
        ))}
      </nav>
      {tab === "sign" && (
        <section className="card">
          <div className="section-head">
            <div>
              <p className="eyebrow">杂占篇</p>
              <h2>身体预兆速查</h2>
            </div>
            <button className="ghost" onClick={() => drawShare("sign")}>
              生成分享卡
            </button>
          </div>
          <div className="chips">
            {(data as any).signs.map((s: any, i: number) => (
              <button
                className={i === sign ? "selected" : ""}
                onClick={() => setSign(i)}
              >
                {s.name}
              </button>
            ))}
          </div>
          <label>
            时辰
            <select value={zhi} onChange={(e) => setZhi(e.target.value)}>
              {zhis.map((z) => (
                <option>{z}</option>
              ))}
            </select>
          </label>
          <div className={"result " + entry.tag}>
            <span>{entry.tag}</span>
            <p>{entry.text}</p>
            <small>——《玉匣记》·{item.title}</small>
          </div>
        </section>
      )}
      {tab === "liu" && (
        <section className="card">
          <p className="eyebrow">时课篇</p>
          <h2>小六壬 · 指掌起课</h2>
          <button
            className="ghost"
            onClick={() => {
              setMonth(now.month);
              setDay(now.day);
              setTime(now.zhi);
              playLiuren();
            }}
          >
            按此刻起课
          </button>
          <button className="ghost" onClick={playLiuren}>
            再看一遍
          </button>
          <label>
            <input
              type="checkbox"
              checked={manual}
              onChange={(e) => setManual(e.target.checked)}
            />{" "}
            手动输入
          </label>
          {manual && (
            <div className="inputs">
              <label>
                月份
                <input
                  type="number"
                  value={month}
                  min={1}
                  max={12}
                  onChange={(e) =>
                    setMonth(Math.max(1, Math.min(12, +e.target.value || 1)))
                  }
                />
              </label>
              <label>
                日期
                <input
                  type="number"
                  value={day}
                  min={1}
                  max={30}
                  onChange={(e) =>
                    setDay(Math.max(1, Math.min(30, +e.target.value || 1)))
                  }
                />
              </label>
              <label>
                时支
                <select value={time} onChange={(e) => setTime(e.target.value)}>
                  {zhis.map((z) => (
                    <option>{z}</option>
                  ))}
                </select>
              </label>
            </div>
          )}
          <PalmChart
            active={running ? seq[Math.min(step, 2)] : idx}
            visited={running ? visited : seq.slice(0, 2)}
          />
          <div className="steps">
            <span className={step >= 0 ? "active" : ""}>
              月：{palaces[seq[0]]}
            </span>
            <span className={step >= 1 ? "active" : ""}>
              日：{palaces[seq[1]]}
            </span>
            <span className={step >= 2 ? "active" : ""}>时：{palace.name}</span>
          </div>
          <p className="formula">
            {monthText}落{palaces[(month - 1) % 6]} → {dayCn(day)}落
            {palaces[(month - 1 + day - 1) % 6]} → {time}时落{palace.name}
          </p>
          <div className="palace">
            <h3>{palace.name}</h3>
            <p>{palace.verse}</p>
          </div>
          <button className="ghost" onClick={() => drawShare("liu")}>
            分享小六壬
          </button>
        </section>
      )}
      {tab === "out" && (
        <section className="card">
          <p className="eyebrow">出行篇</p>
          <h2>出门仪式</h2>
          <div className="directions">
            <Compass gan={now.gan} dir={dir} />
            <div>
              <p>
                喜神：<strong>{dir.xi.map[now.gan]}</strong>
              </p>
              <p>
                福神：<strong>{dir.fu.map[now.gan]}</strong>
              </p>
              <p>
                财神：<strong>{dir.cai.map[now.gan]}</strong>
              </p>
              <p className="avoid">五鬼：{dir.wugui.map[now.gan]}（避开）</p>
            </div>
          </div>
          <canvas
            ref={canvas}
            className="ritual"
            onPointerDown={stroke}
            onPointerMove={stroke}
            onPointerUp={stroke}
            onPointerCancel={stroke}
          />
          <div className="progress">
            竖 {v}/4 · 横 {h}/5
          </div>
          {hint && <p className="hint">{hint}</p>}
          <div className={"blessing " + (v === 4 && h === 5 ? "done" : "dim")}>
            <p>
              {v === 4 && h === 5
                ? [...(data as any).zongheng.incantation].map((ch, i) => (
                    <span key={i} style={{ animationDelay: `${i * 120}ms` }}>
                      {ch}
                    </span>
                  ))
                : (data as any).zongheng.incantation}
            </p>
            <small>{(data as any).zongheng.after}</small>
            {v === 4 && h === 5 && (
              <svg
                className="stamp"
                viewBox="0 0 90 90"
                role="img"
                aria-label="敕"
              >
                <defs>
                  <filter id="stamp-noise">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency=".8"
                      numOctaves="2"
                      seed="9"
                    />
                    <feDisplacementMap in="SourceGraphic" scale="1.8" />
                  </filter>
                </defs>
                <rect
                  x="8"
                  y="8"
                  width="74"
                  height="74"
                  fill="var(--cinnabar)"
                  filter="url(#stamp-noise)"
                />
                <text
                  x="45"
                  y="58"
                  textAnchor="middle"
                  fill="#fff"
                  fontFamily="MaShan"
                  fontSize="48"
                >
                  敕
                </text>
              </svg>
            )}
          </div>
          <button
            className="ghost"
            onClick={() => {
              setV(4);
              setH(5);
              setChant(true);
            }}
          >
            直接看咒文
          </button>
          <button className="ghost" onClick={reset}>
            重画
          </button>
          <button className="ghost" onClick={() => drawShare("out")}>
            分享出门卡
          </button>
        </section>
      )}
      {shareUrl && (
        <div
          className="share-modal"
          role="dialog"
          onClick={() => {
            URL.revokeObjectURL(shareUrl);
            setShareUrl("");
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <img src={shareUrl} alt="玉匣分享卡" />
            <p>长按图片保存</p>
          </div>
        </div>
      )}
      <footer>内容本于《玉匣记》，仅供民俗文化参考。</footer>
    </main>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
