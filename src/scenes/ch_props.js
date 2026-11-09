// ch_props.js：布景和道具。window.PR。
(() => {
  const NAVY = '#1C2148', NAVY2 = '#252B5A', NAVY3 = '#2E3568';

  // 深夜卧室的墙：几条深浅不一的藏蓝，加地板
  function nightBG(key, o = {}) {
    boilSeed(key + ' wall');
    paint(rectPts(-1200, -800, W + 2400, H + 1600), { wash: o.wall || NAVY, ink: null });
    paint(rectPts(-60, -60, W + 120, 420, 6), { wash: o.wall2 || NAVY2, washOp: 150, ink: null });
    if (o.floor !== false) { boilSeed(key + ' floor'); paint([[-60, o.fy ?? 860], [W + 60, (o.fy ?? 860) - 10], [W + 60, H + 60], [-60, H + 60]], { wash: o.floorCol || '#171A38', ink: null }); }
  }
  // 屏幕光里飘的灰尘（纯函数：每颗的位置只看 t 和编号）
  function dust(t, n, key, o = {}) {
    const x0 = o.x0 ?? 0, x1 = o.x1 ?? W, y0 = o.y0 ?? 0, y1 = o.y1 ?? H, col = o.col || '#E9E2D2';
    for (let i = 0; i < n; i++) {
      const sp = .15 + hash(i * 3.1) * .35, px = x0 + ((hash(i) * (x1 - x0) + Math.sin(t * sp + i) * 40 + t * 8 * (hash(i * 5) - .5)) % (x1 - x0) + (x1 - x0)) % (x1 - x0);
      const py = y0 + ((hash(i * 7.3) * (y1 - y0) + t * (o.fall ?? 12) * (.5 + hash(i * 2))) % (y1 - y0));
      const r = (o.r ?? 3) * (.5 + hash(i * 9));
      boilSeed(key + ' d' + i);
      paint(ellPts(px, py, r, r, 6), { wash: col, washOp: (o.op ?? 150) * (.4 + .6 * hash(i * 11)), ink: null });
    }
  }
  // 手机：返回屏幕区域
  function phone(x, y, w, h, o = {}) {
    const key = o.key || 'phone', r = w * .12, b = w * .045;
    if (o.glow) glow(x, y, w * 1.1, o.glowCol || '#7FA8FF', o.glow);
    boilSeed(key + ' body');
    paint(rrPts(x - w / 2, y - h / 2, w, h, r), { wash: o.body || '#24252E', ink: PAL.ink, sw: 1.1 });
    const s = { x0: x - w / 2 + b, y0: y - h / 2 + b * 1.6, w: w - 2 * b, h: h - b * 3.2 };
    s.cx = s.x0 + s.w / 2; s.cy = s.y0 + s.h / 2;
    boilSeed(key + ' screen');
    paint(rrPts(s.x0, s.y0, s.w, s.h, r * .6), { wash: o.screen || '#F4F4F7', ink: null });
    boilSeed(key + ' notch');
    paint(rrPts(x - w * .14, y - h / 2 + b * .45, w * .28, b * .7, b * .35), { wash: '#111216', ink: null });
    return s;
  }
  // 白色卡片（截图底），带一点手绘阴影
  function card(x, y, w, h, o = {}) {
    const key = o.key || 'card', p = o.pad ?? 18;
    boilSeed(key + ' shadow');
    paint(rrPts(x - w / 2 - p + 12, y - h / 2 - p + 14, w + 2 * p, h + 2 * p, 16), { wash: '#000000', washOp: 70, ink: null });
    boilSeed(key + ' card');
    paint(rrPts(x - w / 2 - p, y - h / 2 - p, w + 2 * p, h + 2 * p, 16), { wash: o.col || '#FFFFFF', ink: PAL.ink, sw: .9 });
  }
  // 显示器
  function monitor(x, y, w, h, o = {}) {
    const key = o.key || 'mon';
    if (o.glow) glow(x, y, w * .9, o.glowCol || '#7FC6FF', o.glow);
    boilSeed(key + ' stand');
    paint([[x - w * .06, y + h / 2], [x + w * .06, y + h / 2], [x + w * .09, y + h / 2 + h * .2], [x - w * .09, y + h / 2 + h * .2]], { wash: '#2A2C36', ink: PAL.ink, sw: .8 });
    paint(rrPts(x - w * .2, y + h / 2 + h * .18, w * .4, h * .06, 6), { wash: '#2A2C36', ink: PAL.ink, sw: .8 });
    boilSeed(key + ' body');
    paint(rrPts(x - w / 2, y - h / 2, w, h, 12), { wash: '#2A2C36', ink: PAL.ink, sw: 1 });
    const b = w * .025, s = { x0: x - w / 2 + b, y0: y - h / 2 + b, w: w - 2 * b, h: h - 2 * b };
    s.cx = s.x0 + s.w / 2; s.cy = s.y0 + s.h / 2;
    boilSeed(key + ' scr');
    paint(rectPts(s.x0, s.y0, s.w, s.h), { wash: o.screen || '#0E1A2E', ink: null });
    return s;
  }
  // 数字钟
  function clock(x, y, s, txt, o = {}) {
    boilSeed((o.key || 'clk') + ' body');
    paint(rrPts(x - s * 1.6, y - s * .6, s * 3.2, s * 1.2, s * .25), { wash: '#262833', ink: PAL.ink, sw: .8 });
    glow(x, y, s * 1.6, o.col || '#FF6B5A', .55);
    ui(txt, x, y + s * .02, s * .82, o.col || '#FF7A66', { font: `700 ${s * .82}px "Consolas", "Courier New", monospace` });
  }
  // 夜窗 + 月亮
  function nightWindow(x, y, w, h, o = {}) {
    const key = o.key || 'win';
    boilSeed(key + ' sky');
    paint(rectPts(x, y, w, h), { wash: '#2A3570', ink: PAL.ink, sw: 1 });
    glow(x + w * .7, y + h * .3, w * .35, '#FFF1C4', .7);
    boilSeed(key + ' moon');
    paint(ellPts(x + w * .7, y + h * .3, w * .1, w * .1, 16), { wash: '#FFF3D0', ink: null });
    paint(ellPts(x + w * .74, y + h * .27, w * .085, w * .085, 16), { wash: '#2A3570', ink: null });
    for (let i = 0; i < 6; i++) { boilSeed(key + ' st' + i); const sx = x + w * (.1 + hash(i) * .8), sy = y + h * (.1 + hash(i * 3) * .5); paint(ellPts(sx, sy, 3, 3, 5), { wash: '#FFF3D0', ink: null }); }
    // 楼的剪影
    boilSeed(key + ' city');
    const pts = [[x, y + h]]; for (let i = 0; i <= 6; i++) { const bx = x + w * i / 6, bh = h * (.18 + hash(i * 5) * .25); pts.push([bx, y + h - bh], [bx + w / 6, y + h - bh]); } pts.push([x + w, y + h]);
    paint(pts, { wash: '#161A3A', ink: null });
    boilSeed(key + ' frame');
    paint(rectPts(x, y, w, h), { ink: '#3B3A52', sw: 2.2 });
    inkLine([[x + w / 2, y], [x + w / 2, y + h]], 1.6, '#3B3A52', 'ink', 0);
  }
  // 床头柜
  function nightstand(x, y, w, h, o = {}) {
    boilSeed((o.key || 'ns') + ' ns');
    paint(rectPts(x - w / 2, y, w, h, 2), { wash: '#4A3A4E', ink: PAL.ink, sw: .9 });
    inkLine([[x - w / 2 + 12, y + h * .45], [x + w / 2 - 12, y + h * .45]], .7, PAL.ink, 'inkfine', 0);
  }
  // 床头板
  function bedFrame(x, y, w, h, o = {}) {
    boilSeed((o.key || 'bed') + ' head');
    paint(rrPts(x, y, w, h, 30), { wash: '#4B3F5E', ink: PAL.ink, sw: 1 });
  }
  // 思考泡
  function thought(x, y, rx, ry, o = {}) {
    const key = o.key || 'th', pts = [], n = 14;
    for (let i = 0; i < n * 3; i++) { const a = i / (n * 3) * TAU, k = 1 + .09 * Math.abs(Math.sin(a * n / 2)); pts.push([x + Math.cos(a) * rx * k, y + Math.sin(a) * ry * k]); }
    boilSeed(key + ' cloud');
    paint(pts, { wash: o.col || '#FFF8EA', ink: PAL.ink, sw: 1.1, curv: .5 });
    if (o.tail) for (let i = 0; i < 3; i++) { boilSeed(key + ' t' + i); const [tx, ty] = o.tail[i]; paint(ellPts(tx, ty, 14 + i * 9, 12 + i * 8, 12), { wash: o.col || '#FFF8EA', ink: PAL.ink, sw: .9 }); }
  }
  // 快递纸箱
  function box(x, y, w, h, o = {}) {
    const key = o.key || 'box';
    boilSeed(key + ' back');
    paint([[x - w / 2, y - h], [x + w / 2, y - h], [x + w / 2 + w * .12, y - h - h * .32], [x - w / 2 + w * .12, y - h - h * .32]], { wash: '#B8895A', ink: PAL.ink, sw: 1 });
    if (o.inside) o.inside();
    boilSeed(key + ' front');
    paint([[x - w / 2, y - h], [x + w / 2, y - h], [x + w / 2, y], [x - w / 2, y]], { wash: '#C99A68', ink: PAL.ink, sw: 1.1 });
    paint([[x + w / 2, y - h], [x + w / 2 + w * .12, y - h - h * .32], [x + w / 2 + w * .12, y - h * .32], [x + w / 2, y]], { wash: '#A87B4E', ink: PAL.ink, sw: 1 });
    boilSeed(key + ' tape');
    paint([[x - w * .08, y - h], [x + w * .08, y - h], [x + w * .08, y], [x - w * .08, y]], { wash: '#E3CC8E', washOp: 220, ink: null });
    // 盖子半开
    boilSeed(key + ' flap');
    paint([[x - w / 2, y - h], [x - w / 2 - w * .1, y - h - h * .45], [x + w * .05, y - h - h * .5], [x + w * .02, y - h]], { wash: '#D6A974', ink: PAL.ink, sw: 1 });
  }
  // 长腿的大脑
  function brain(x, y, r, o = {}) {
    const key = o.key || 'brain', run = o.run || 0;
    boilSeed(key + ' legs');
    for (const s of [0, 1]) {
      const ph = run * TAU + s * Math.PI, fx = x + Math.sin(ph) * r * .55 + (s ? r * .2 : -r * .2), fy = y + r * 1.25 - Math.max(0, Math.cos(ph)) * r * .25;
      inkLine([[x + (s ? r * .2 : -r * .2), y + r * .6], [fx, fy]], 1.2, PAL.ink, 'ink', .2);
      paint(ellPts(fx + r * .12, fy, r * .2, r * .09, 8), { wash: '#E8E1D6', ink: PAL.ink, sw: .7 });
    }
    boilSeed(key + ' body');
    const pts = []; for (let i = 0; i < 30; i++) { const a = i / 30 * TAU, k = 1 + .08 * Math.sin(a * 7); pts.push([x + Math.cos(a) * r * 1.15 * k, y + Math.sin(a) * r * .85 * k]); }
    paint(pts, { wash: '#F2A8B5', ink: PAL.ink, sw: 1, curv: .5 });
    inkLine([[x, y - r * .8], [x - r * .1, y - r * .2], [x + r * .05, y + r * .5]], .9, '#C26A7E', 'inkfine', .6);
    inkLine([[x - r * .7, y - r * .3], [x - r * .4, y - r * .1], [x - r * .65, y + r * .25]], .8, '#C26A7E', 'inkfine', .6);
    inkLine([[x + r * .5, y - r * .45], [x + r * .75, y - r * .05], [x + r * .45, y + r * .3]], .8, '#C26A7E', 'inkfine', .6);
    // 小眼睛
    for (const s of [-1, 1]) paint(ellPts(x + r * .35 + s * r * .18, y - r * .05, r * .07, r * .1, 8), { wash: PAL.ink, ink: null });
    if (o.sweat) paint([[x - r * 1.0, y - r * .7], [x - r * .9, y - r * .4], [x - r * 1.1, y - r * .4]], { wash: '#9FD3EE', ink: PAL.ink, sw: .6, curv: .5 });
  }
  // 伸出食指的手（从画面外伸进来）。(x, y) 是指尖，ang 是手指朝向（0 朝左）
  function finger(x, y, s, ang = 0, o = {}) {
    boilSeed((o.key || 'fg') + ' hand');
    push(); translate(x, y); rotate(ang);
    paint(ribbon([[s * 4.5, s * .9], [s * 2.6, s * .55]], s * 1.6, s * 1.5), { wash: AH.C.hood, ink: PAL.ink, sw: 1 });
    paint(rrPts(s * .9, -s * .1, s * 1.9, s * 1.35, s * .5), { wash: AH.C.skin, ink: PAL.ink, sw: 1 });
    paint(rrPts(0, -s * .05, s * 1.5, s * .48, s * .24), { wash: AH.C.skin, ink: PAL.ink, sw: 1 });
    paint(rrPts(s * .1, 0, s * .32, s * .36, s * .12), { wash: '#F7E6D8', ink: PAL.ink, sw: .6 });
    for (let i = 0; i < 3; i++) inkLine([[s * 1.2, s * (.55 + i * .26)], [s * 1.55, s * (.55 + i * .26)]], .6, PAL.ink, 'inkfine', .3);
    pop();
  }
  // 红色印章
  function stamp(txt, x, y, size, age, o = {}) {
    if (age < 0) return;
    const k = age < .12 ? lerp(2.2, 1, easeIn(age / .12)) : 1 + .06 * spring(age, .12, 10, 30);
    const w = size * (txt.length * 1.05 + .7), h = size * 1.5, col = o.col || '#D2382B';
    push(); translate(x, y); rotate(o.rot ?? -.12); scale(k);
    boilSeed((o.key || 'stamp') + ' box');
    paint(rrPts(-w / 2, -h / 2, w, h, size * .15), { ink: col, sw: size / 40, br: 'dry' });
    paint(rrPts(-w / 2 + size * .15, -h / 2 + size * .15, w - size * .3, h - size * .3, size * .1), { wash: col, washOp: 30, ink: col, sw: size / 70 });
    pop();
    letter(txt, x, y, size * k, col, { font: `900 ${size * k}px ${CN}`, rot: o.rot ?? -.12, ink: false, alpha: .92 });
  }
  // 小飞机（侧面），窗里探出小鸡头
  function plane(x, y, s, o = {}) {
    const key = o.key || 'pl';
    boilSeed(key + ' tail');
    paint([[x - s * 2.4, y - s * .2], [x - s * 2.9, y - s * 1.1], [x - s * 2.5, y - s * 1.1], [x - s * 1.9, y - s * .3]], { wash: '#E9ECF2', ink: PAL.ink, sw: .9 });
    boilSeed(key + ' body');
    paint([[x - s * 2.6, y - s * .3], [x + s * 2.2, y - s * .35], [x + s * 2.8, y], [x + s * 2.2, y + s * .35], [x - s * 2.4, y + s * .25]], { wash: '#F4F6FA', ink: PAL.ink, sw: 1, curv: .4 });
    boilSeed(key + ' wing');
    paint([[x - s * .3, y + s * .05], [x + s * .6, y + s * .05], [x - s * .4, y + s * 1.0], [x - s * .9, y + s * 1.0]], { wash: '#D9DEE8', ink: PAL.ink, sw: .9 });
    for (let i = 0; i < 4; i++) {
      const wx = x - s * 1.4 + i * s * .8;
      boilSeed(key + ' w' + i);
      paint(ellPts(wx, y - s * .08, s * .2, s * .16, 10), { wash: '#9CC8EA', ink: PAL.ink, sw: .6 });
      if (o.chicks) paint(ellPts(wx, y - s * .06, s * .13, s * .12, 10), { wash: CK.C.chick, ink: null });
    }
  }
  // 购物车
  function cart(x, y, s, o = {}) {
    boilSeed((o.key || 'cart') + ' cart');
    inkLine([[x - s * 2.2, y - s * 1.9], [x - s * 1.7, y - s * 1.9], [x - s * 1.3, y - s * .4], [x + s * 1.5, y - s * .4]], 1.6, PAL.ink, 'ink', 0);
    paint([[x - s * 1.6, y - s * 1.5], [x + s * 1.9, y - s * 1.5], [x + s * 1.55, y - s * .55], [x - s * 1.3, y - s * .55]], { wash: '#E9E4F0', washOp: 160, ink: PAL.ink, sw: 1.2 });
    for (let i = 1; i < 5; i++) inkLine([[x - s * 1.6 + i * s * .7, y - s * 1.5], [x - s * 1.4 + i * s * .6, y - s * .55]], .6, PAL.ink, 'inkfine', 0);
    for (const wx of [-1, 1.2]) paint(ellPts(x + wx * s, y - s * .1, s * .2, s * .2, 10), { wash: '#2A2C36', ink: PAL.ink, sw: .8 });
  }
  // 彩纸屑
  function confetti(t, n, key, o = {}) {
    const cols = o.cols || ['#FFD84A', '#FF7A66', '#8FE3C8', '#B49CFF', '#FFFFFF'];
    for (let i = 0; i < n; i++) {
      const sp = 60 + hash(i * 4) * 90, px = hash(i) * W + Math.sin(t * 1.5 + i) * 30, py = ((hash(i * 7) * (H + 200) + t * sp) % (H + 200)) - 100, a = t * (2 + hash(i) * 3) + i;
      boilSeed(key + ' c' + i);
      paint([[px + Math.cos(a) * 12, py + Math.sin(a) * 5], [px - Math.sin(a) * 6, py + Math.cos(a) * 8], [px - Math.cos(a) * 12, py - Math.sin(a) * 5], [px + Math.sin(a) * 6, py - Math.cos(a) * 8]], { wash: cols[i % cols.length], washOp: 220, ink: null });
    }
  }
  // 天平
  function balance(x, y, s, tilt, left, right, o = {}) {
    boilSeed((o.key || 'bal') + ' post');
    paint([[x - s * .12, y], [x + s * .12, y], [x + s * .2, y + s * 4], [x - s * .2, y + s * 4]], { wash: '#B9894A', ink: PAL.ink, sw: 1 });
    paint(rrPts(x - s * 1.4, y + s * 3.9, s * 2.8, s * .4, s * .12), { wash: '#9C7038', ink: PAL.ink, sw: 1 });
    const L = s * 4.4, c = Math.cos(tilt), sn = Math.sin(tilt), lx = x - L * c, ly = y - L * sn, rx = x + L * c, ry = y + L * sn;
    boilSeed((o.key || 'bal') + ' beam');
    paint(ribbon([[lx, ly], [x, y], [rx, ry]], s * .22, s * .22), { wash: '#D7A75E', ink: PAL.ink, sw: 1 });
    paint(ellPts(x, y, s * .3, s * .3, 12), { wash: '#B9894A', ink: PAL.ink, sw: .9 });
    for (const [px, py, fn, k] of [[lx, ly, left, 'l'], [rx, ry, right, 'r']]) {
      boilSeed((o.key || 'bal') + ' pan' + k);
      inkLine([[px, py], [px - s * 1.1, py + s * 1.9]], .7, PAL.ink, 'inkfine', 0); inkLine([[px, py], [px + s * 1.1, py + s * 1.9]], .7, PAL.ink, 'inkfine', 0);
      if (fn) fn(px, py + s * 1.9);
      paint([[px - s * 1.5, py + s * 1.9], [px + s * 1.5, py + s * 1.9], [px + s * 1.1, py + s * 2.35], [px - s * 1.1, py + s * 2.35]], { wash: '#D7A75E', ink: PAL.ink, sw: 1, curv: .3 });
    }
  }
  // 撕纸边的分屏线
  function splitLine(x, key, o = {}) {
    boilSeed(key);
    const pts = []; for (let i = 0; i <= 12; i++) pts.push([x + (i % 2 ? 18 : -18) + (o.slope || 0) * (i / 12 - .5) * H, -40 + i * (H + 80) / 12]);
    inkLine(pts, 2.4, o.col || '#FFF8EA', 'ink', .1);
  }
  window.PR = { nightBG, dust, phone, card, monitor, clock, nightWindow, nightstand, bedFrame, thought, box, brain, finger, stamp, plane, cart, confetti, balance, splitLine, NAVY, NAVY2, NAVY3 };
})();
