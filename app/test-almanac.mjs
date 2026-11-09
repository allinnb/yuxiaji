import { beijingYmd, getAlmanac, getJieQiCountdown } from "./src/almanac.ts";
import assert from "node:assert/strict";
const cases = [
  [
    2026,
    11,
    9,
    {
      ganZhi: "丁亥",
      zhiXing: "建",
      suitable: ["祭祀", "沐浴", "馀事勿取"],
      avoid: ["无"],
      clash: "冲(辛巳)蛇 煞西",
      deity: "天德",
      deityType: "黄道",
      taboo: "丁不剃头头必生疮，亥不嫁娶不利新郎",
    },
  ],
  [
    2026,
    11,
    10,
    {
      ganZhi: "戊子",
      zhiXing: "除",
      avoid: ["置产", "安床"],
      clash: "冲(壬午)马 煞南",
      deity: "白虎",
      deityType: "黑道",
      taboo: "戊不受田田主不祥，子不问卜自惹祸殃",
    },
  ],
  [
    2026,
    12,
    31,
    {
      ganZhi: "己卯",
      zhiXing: "平",
      suitable: ["祭祀", "平治道涂", "修坟", "除服", "成服", "馀事勿取"],
      avoid: ["移徙", "入宅", "嫁娶", "掘井", "安葬"],
      clash: "冲(癸酉)鸡 煞西",
      deity: "玉堂",
      deityType: "黄道",
    },
  ],
  [
    2027,
    2,
    6,
    {
      ganZhi: "丙辰",
      zhiXing: "满",
      avoid: ["入宅", "作灶", "治病", "安葬", "移徙"],
      clash: "冲(庚戌)狗 煞南",
      deity: "金匮",
      deityType: "黄道",
    },
  ],
];
for (const [y, m, d, expected] of cases) {
  const actual = getAlmanac(y, m, d);
  for (const [key, value] of Object.entries(expected))
    assert.deepEqual(actual[key], value, `${y}-${m}-${d} ${key}`);
  if (y === 2026 && m === 11 && d === 10) {
    assert.equal(actual.suitable[0], "嫁娶");
    assert.equal(actual.suitable.length, 17);
  }
  console.log(
    `ok: ${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")} ${actual.ganZhi} · ${actual.zhiXing}；${actual.clash}；${actual.deity} ${actual.deityType}`,
  );
}
let previous = "";
for (let d = 1; d <= 30; d++) {
  const current = JSON.stringify(getAlmanac(2026, 11, d));
  if (previous)
    assert.notEqual(current, previous, `相邻日期 ${d - 1}/${d} 不应相同`);
  previous = current;
}
console.log("ok: 连续30天相邻黄历结果均不完全相同");
const jieQiCases = [
  [2026, 11, 8, "距小雪还有14天"],
  [2026, 11, 9, "距小雪还有13天"],
  [2026, 11, 22, "今日小雪"],
  [2026, 11, 23, "距大雪还有14天"],
  [2026, 12, 6, "距大雪还有1天"],
  [2026, 12, 7, "今日大雪"],
  [2027, 2, 3, "距立春还有1天"],
  [2027, 2, 4, "今日立春"],
];
for (const [y, m, d, text] of jieQiCases) {
  const actual = getJieQiCountdown(y, m, d);
  assert.equal(actual.text, text);
  console.log(
    `ok: ${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")} → ${actual.text}`,
  );
}
for (
  let time = Date.UTC(2026, 10, 1);
  time <= Date.UTC(2027, 11, 31);
  time += 86400000
) {
  const p = new Date(time);
  const r = getJieQiCountdown(
    p.getUTCFullYear(),
    p.getUTCMonth() + 1,
    p.getUTCDate(),
  );
  assert.ok(!r.text.includes("NaN"));
  assert.ok(Number.isInteger(r.days) && r.days >= 0 && r.days <= 15);
}
console.log(
  "ok: 2026-11-01 至 2027-12-31 节气倒计时无 NaN，days 均为 0–15 整数",
);
assert.deepEqual(beijingYmd(new Date(Date.UTC(2026, 10, 9, 17, 0))), {
  year: 2026,
  month: 11,
  day: 10,
  hour: 1,
});
assert.deepEqual(beijingYmd(new Date(Date.UTC(2026, 10, 9, 15, 59))), {
  year: 2026,
  month: 11,
  day: 9,
  hour: 23,
});
console.log("ok: 北京日期跨 UTC 日界验证通过");
