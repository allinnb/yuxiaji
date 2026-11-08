export const PALACES = [
  "大安",
  "留连",
  "速喜",
  "赤口",
  "小吉",
  "空亡",
] as const;

export function liurenSeq(month: number, day: number, timeIndex: number) {
  const monthStop = (month - 1) % 6;
  const dayStop = (monthStop + day - 1) % 6;
  const hourStop = (dayStop + timeIndex) % 6;
  return [monthStop, dayStop, hourStop];
}

export function liurenIndex(month: number, day: number, timeIndex: number) {
  return liurenSeq(month, day, timeIndex)[2];
}

export function liurenLabels(month: number, day: number, timeIndex: number) {
  const [m, d, h] = liurenSeq(month, day, timeIndex);
  return [
    `${month}月落${PALACES[m]}`,
    `初${day}落${PALACES[d]}`,
    `时落${PALACES[h]}`,
  ];
}

export default liurenSeq;
