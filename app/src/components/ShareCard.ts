import QRCode from "qrcode";

export type ShareKind = "sign" | "liu" | "out";
export type ShareData = { title: string; lines: string[]; url?: string };

export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth = 860,
) {
  const out: string[] = [];
  let line = "";
  for (const ch of text) {
    const next = line + ch;
    if (line && ctx.measureText(next).width > maxWidth) {
      out.push(line);
      line = ch;
    } else line = next;
  }
  if (line) out.push(line);
  return out;
}

export async function createShareCard(kind: ShareKind, data: ShareData) {
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1440;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#f3ead6";
  ctx.fillRect(0, 0, 1080, 1440);
  ctx.fillStyle = "rgba(243,234,214,.84)";
  ctx.beginPath();
  ctx.roundRect(60, 280, 960, 820, 24);
  ctx.fill();
  ctx.strokeStyle = "#b08d57";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "#2a241e";
  ctx.font = "88px MaShan";
  [..."玉匣"].forEach((ch, i) => ctx.fillText(ch, 980, 90 + i * 96));
  ctx.font = "40px LXGW";
  const kindName =
    data.title === "身体预兆"
      ? "身兆"
      : data.title === "小六壬"
        ? "小六壬"
        : "出门";
  [...kindName].forEach((ch, i) => ctx.fillText(ch, 980, 300 + i * 54));
  ctx.font = "38px LXGW";
  let y = 380;
  data.lines
    .flatMap((line) => wrapText(ctx, line))
    .forEach((line) => {
      ctx.fillText(line, 110, y);
      y += 64;
    });
  const qr = document.createElement("canvas");
  await QRCode.toCanvas(qr, data.url ?? "https://yuxiaji.puwa.online/", {
    width: 200,
    margin: 1,
    color: { dark: "#2a241e", light: "#fdf8ee" },
  });
  ctx.drawImage(qr, 820, 1150);
  ctx.fillStyle = "#a8382a";
  ctx.font = "26px LXGW";
  ctx.textAlign = "center";
  ctx.fillText("用手机相机扫码", 920, 1375);
  ctx.textAlign = "start";
  ctx.fillStyle = "#2a241e";
  ctx.font = "30px LXGW";
  ctx.fillText("民俗参考", 90, 1330);
  ctx.fillStyle = "#a8382a";
  ctx.fillRect(90, 1180, 90, 90);
  ctx.fillStyle = "#fff";
  ctx.font = "48px MaShan";
  ctx.fillText("敕", 920, 1315);
  return new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
}
