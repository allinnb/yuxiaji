import { Solar } from "lunar-javascript";

export const ZHI_XING_NOTES: Record<string, string> = {
  建: "万物初生，宜开始、出行，忌动土",
  除: "除旧布新，宜扫除、求医",
  满: "丰收圆满，宜祭祀、开市，忌服药",
  平: "平常平稳，宜修补、涂泥，大事不宜",
  定: "安定，宜订约、立券，忌诉讼",
  执: "执守，宜建造、捕捉，忌移徙",
  破: "月破大耗，诸事不宜，只宜拆卸、治病",
  危: "危险，忌登高、远行",
  成: "成就，宜开业、嫁娶、入学",
  收: "收成，宜纳财，忌开市、安葬",
  开: "开通，宜开业、入学，忌安葬",
  闭: "闭塞，宜筑堤、收藏，忌开市、出行",
};

export type AlmanacData = {
  ganZhi: string;
  zhiXing: string;
  suitable: string[];
  avoid: string[];
  clash: string;
  deity: string;
  deityType: string;
  taboo: string;
  note: string;
};
export function getAlmanac(
  year: number,
  month: number,
  day: number,
): AlmanacData {
  const lunar: any = Solar.fromYmd(year, month, day).getLunar();
  const zhiXing = lunar.getZhiXing();
  return {
    ganZhi: lunar.getDayInGanZhi(),
    zhiXing,
    suitable: lunar.getDayYi(),
    avoid: lunar.getDayJi(),
    clash: `冲${lunar.getDayChongDesc()} 煞${lunar.getDaySha()}`,
    deity: lunar.getDayTianShen(),
    deityType: lunar.getDayTianShenType(),
    taboo: `${lunar.getPengZuGan()}，${lunar.getPengZuZhi()}`,
    note: ZHI_XING_NOTES[zhiXing],
  };
}
export function beijingYmd(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (type: string) =>
    Number(parts.find((p) => p.type === type)!.value);
  return { year: value("year"), month: value("month"), day: value("day") };
}
