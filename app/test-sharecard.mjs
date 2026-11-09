import { readFile } from "node:fs/promises";
const source = await readFile(
  new URL("./src/components/ShareCard.ts", import.meta.url),
  "utf8",
);
for (const required of [
  "import.meta.env.BASE_URL",
  "wrapText(ctx, line, 800)",
  'ctx.fillText("敕", 135, 1226)',
  'ctx.fillText("民俗參考", 200, 1240)',
  'ctx.fillText("用手機相機掃碼", 920, 1375)',
]) {
  if (!source.includes(required))
    throw new Error(`分享卡验收缺少: ${required}`);
}
console.log("ok: 分享卡底图路径、正文安全区、敕印和二维码文案验收通过");
