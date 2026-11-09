import { getAlmanac } from "./src/almanac.ts";
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
