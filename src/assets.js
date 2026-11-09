// assets.js：真实截图的载入与绘制，以及中文字的写法。
// 截图放在 assets/shots/，按分镜编号取用（A01…A36），清单见 assets/shots/README.md。
// 缺哪张就用灰色占位图代替，没有截图也能跑起来看动画。
const SHOT_DIR = 'assets/shots/';
const SHOT_FILES = {
  A01: 'A01_群里喊补货_ONECAT.jpg', A02: 'A02_论坛补货帖.png', A03: 'A03_库存4_Available.jpg',
  A04: 'A04_支付宝付款成功_打码.png', A05: 'A05_付款成功邮件_打码.jpg', A06: 'A06_上一台还没开过机_PENDING.jpg',
  A07: 'A07_四个机房_HK_JP_DE_LA.png', A08: 'A08_世界地图节点.jpg', A09: 'A09_护照封面.jpg',
  A10: 'A10_年付10刀.jpg', A11: 'A11_年付7刀.jpg', A12: 'A12_库存0_Available.jpg', A13: 'A13_猪脚饭.jpg',
  A14: 'A14_CPU0占用.jpg', A15: 'A15_探针面板.jpg', A16: 'A16_探针在线列表.jpg', A17: 'A17_重装_选Debian.jpg',
  A18: 'A18_重装_选Ubuntu.jpg', A19: 'A19_重装确认弹窗.png', A20: 'A20_HelloWorld博客_裁掉插画.jpg', A21: 'A21_网盘三张表情包.jpg',
  A22: 'A22_三网延迟.jpg', A23: 'A23_24小时丢包曲线.png', A24: 'A24_mtr路由_打码.jpg', A25: 'A25_NodeSeek_logo.png',
  A26: 'A26_NodeSeek帖子列表.png', A27: 'A27_ITDOG全国红.png', A28: 'A28_工单_请求更换ip.jpg', A29: 'A29_测评帖.jpg',
  A30: 'A30_评论区回复_打码.png', A31: 'A31_商家跑路公告.jpg', A32: 'A32_黑五促销帖.jpg', A33: 'A33_收传家宝.png',
  A34: 'A34_Snapshot为空_打码.png', A35: 'A35_1核1G.png', A36: 'A36_续费催款.png',
};
const IMG = {};

// 用原生 Image 载入，再画进一张 p5.Graphics，WebGL 里用 image() 当纹理画。
window.PRELOADS = (window.PRELOADS || []).concat([() => Promise.all(Object.entries(SHOT_FILES).map(([id, f]) => new Promise((ok, bad) => {
  const el = new Image();
  // 超过 2000 像素宽的截图缩小后再当纹理（省显存）；W0/H0 记原图尺寸，裁切坐标仍按原图写
  el.onload = () => {
    const k = Math.min(1, 2000 / el.naturalWidth), g = createGraphics(Math.round(el.naturalWidth * k), Math.round(el.naturalHeight * k));
    g.pixelDensity(1); g.drawingContext.drawImage(el, 0, 0, g.width, g.height); g.W0 = el.naturalWidth; g.H0 = el.naturalHeight; g.K = k; IMG[id] = g; ok();
  };
  el.onerror = () => {   // 缺图：画一张带编号的占位图（尺寸取常见的 4:3）
    console.warn('缺少截图，用占位图代替：' + f);
    const g = createGraphics(800, 600); g.pixelDensity(1); const c = g.drawingContext;
    c.fillStyle = '#D9D4CC'; c.fillRect(0, 0, 800, 600); c.fillStyle = '#6E6A64'; c.font = '700 64px sans-serif'; c.textAlign = 'center'; c.fillText(id, 400, 280);
    c.font = '28px sans-serif'; c.fillText(f, 400, 340);
    g.W0 = 800; g.H0 = 600; g.K = 1; IMG[id] = g; ok();
  };
  el.src = encodeURI(SHOT_DIR + f);
})))]);

// 画一张截图：中心在 (x, y)，宽 w（高按比例，或给 o.h）。
// o.src = [sx, sy, sw, sh] 只取原图一部分；o.rot 旋转；o.alpha 透明；o.scale 额外缩放（弹出动画用）。
function shotImg(id, x, y, w, o = {}) {
  const g = IMG[id]; if (!g) return;
  const [sx, sy, sw, sh] = o.src || [0, 0, g.W0, g.H0], K = g.K;
  const h = o.h || w * sh / sw, k = o.scale ?? 1, a = o.alpha ?? 1;
  if (k <= .01 || a <= .01) return;
  flushBrush();
  push(); translate(x, y); rotate(o.rot || 0); scale(k);
  if (a < 1) tint(255, 255 * a);
  image(g, -w / 2, -h / 2, w, h, sx * K, sy * K, sw * K, sh * K);
  noTint(); pop();
  return { x0: x - w / 2, y0: y - h / 2, w, h, sx: w / sw, sy: h / sh };
}
// 截图坐标 → 画面坐标（配合 shotImg 的返回值，在截图上画圈、高亮）
const onShot = (r, px, py, src = [0, 0]) => [r.x0 + (px - src[0]) * r.sx, r.y0 + (py - src[1]) * r.sy];

// ---------- 中文字 ----------
const CN = '"Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif';
// UI 字：干净，不带墨影
function ui(txt, x, y, size, col, o = {}) { letter(txt, x, y, size, col, { font: `${o.bold === false ? 400 : 700} ${size}px ${CN}`, ink: false, ...o }); }
// 音效大字：粗体、描边、弹出
function big(txt, x, y, size, col, age, o = {}) {
  sfx(txt, x, y, size, col, age, { font: `900 ${size}px ${CN}`, stroke: o.stroke ?? PAL.ink, ink: true, life: o.life ?? 1.4, ...o });
}
window.EXTRA_FONTS = (window.EXTRA_FONTS || []).concat([[`700 60px ${CN}`, '凌晨两点补货啦上班就是亏没了未办理家公司上一台'], [`900 60px ${CN}`, '就是亏没了']]);
const TITLE_FONT = '"Ma Shan Zheng", "STKaiti", serif';
window.EXTRA_FONTS = window.EXTRA_FONTS.concat([[`120px ${TITLE_FONT}`, '吃灰']]);
