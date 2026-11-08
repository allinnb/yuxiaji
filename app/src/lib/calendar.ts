import { Solar } from "lunar-javascript";

export const ZHIS = [
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
];
export const MONTH_NAMES = [
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
const DAYS = [
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
export const dayCn = (day: number) => DAYS[day] || "";
export const T = (index: number) =>
  ["大安", "留连", "速喜", "赤口", "小吉", "空亡"][index % 6];
export function calendarNow(date = new Date()) {
  const lunar: any = Solar.fromDate(date).getLunar();
  return {
    lunar,
    month: Math.abs(lunar.getMonth()),
    day: lunar.getDay(),
    zhi: lunar.getTimeZhi(),
    monthCn: lunar.getMonthInChinese(),
    dayCn: lunar.getDayInChinese(),
    yearGz: lunar.getYearInGanZhi(),
    dayGz: lunar.getDayInGanZhi(),
    gan: lunar.getDayGan(),
    solar: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
  };
}
