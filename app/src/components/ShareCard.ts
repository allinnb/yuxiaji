export type ShareKind = "sign" | "liu" | "out";
export type ShareData = { title: string; lines: string[]; url?: string };

export function wrapText(text: string, maxChars = 24) {
  const out: string[] = [];
  for (let i = 0; i < text.length; i += maxChars)
    out.push(text.slice(i, i + maxChars));
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
  ctx.fillStyle = "#2a241e";
  ctx.font = "72px MaShan";
  ctx.fillText("玉匣", 90, 140);
  ctx.font = "42px LXGW";
  ctx.fillText(data.title, 90, 230);
  ctx.font = "38px LXGW";
  let y = 340;
  data.lines
    .flatMap((line) => wrapText(line))
    .forEach((line) => {
      ctx.fillText(line, 90, y);
      y += 64;
    });
  ctx.fillStyle = "#2a241e";
  ctx.font = "30px LXGW";
  ctx.fillText("民俗参考 · yuxiaji.puwa.online", 90, 1260);
  ctx.fillStyle = "#a8382a";
  ctx.fillRect(900, 1250, 90, 90);
  ctx.fillStyle = "#fff";
  ctx.font = "48px MaShan";
  ctx.fillText("敕", 920, 1315);
  return new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
}
