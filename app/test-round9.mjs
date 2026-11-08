import { Solar } from "lunar-javascript";
const l = Solar.fromYmd(2026, 11, 8).getLunar();
const jq = l.getNextJieQi(true);
const days = Math.ceil((new Date(jq.getSolar().toYmd()) - new Date("2026-11-08")) / 86400000);
if (jq.getName() !== "小雪" || jq.getSolar().toYmd() !== "2026-11-22" || days !== 14) throw new Error(`节气错误: ${jq.getName()} ${jq.getSolar().toYmd()} ${days}`);
console.log(`ok: 2026-11-08 → 下一节气${jq.getName()} ${jq.getSolar().toYmd()}，${days}天`);
