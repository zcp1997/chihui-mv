// v1_verse.js：前奏 + 主歌一（0 – 32.39）。时间都是歌曲时间（秒），镜头起点对齐歌曲的 SRT。
(() => {
  const C = AH.C;

  // ---------- 卧室（世界坐标 1920×1080）----------
  function bedroom(t, key, o = {}) {
    PR.nightBG(key, { fy: 900 });
    PR.nightWindow(110, 120, 420, 380, { key: key + ' win' });
    PR.clock(960, 170, 70, o.clock || (t < 2.2 ? '01:59' : '02:00'), { key: key + ' clk' });
    // 书桌 + 显示器（待机微光）
    boilSeed(key + ' desk');
    paint([[1300, 700], [1880, 700], [1880, 730], [1300, 730]], { wash: '#3A3048', ink: PAL.ink, sw: .9 });
    paint([[1330, 730], [1360, 730], [1360, 920], [1330, 920]], { wash: '#3A3048', ink: PAL.ink, sw: .8 });
    paint([[1820, 730], [1850, 730], [1850, 920], [1820, 920]], { wash: '#3A3048', ink: PAL.ink, sw: .8 });
    const s = PR.monitor(1590, 520, 420, 260, { key: key + ' mon', glow: .55, screen: '#0D1B2A' });
    for (let i = 0; i < 7; i++) { boilSeed(key + ' code' + i); const w = 60 + hash(i * 3) * 220; inkLine([[s.x0 + 24 + (i % 3) * 20, s.y0 + 26 + i * 30], [s.x0 + 24 + (i % 3) * 20 + w, s.y0 + 26 + i * 30]], .8, i % 2 ? '#4FD18B' : '#5AA8E8', 'inkfine', 0); }
    // 床
    PR.bedFrame(150, 600, 660, 300, { key: key + ' bed' });
    if (o.sleeper !== false) AH.sleep(330, 760, 78, { key: key + ' ah', t, face: o.face });
    else { boilSeed(key + ' emptyq'); paint([[100, 820], [900, 790], [960, 1100], [80, 1100]], { wash: '#5A6FA8', ink: PAL.ink, sw: 1, curv: .4 }); }
    PR.nightstand(1010, 760, 170, 170, { key: key + ' ns' });
    // 床头柜上的手机（平放的小黑块，亮屏时发光）
    if (o.phoneLit) glow(1010, 748, 90, '#9FB8FF', o.phoneLit);
    boilSeed(key + ' ph');
    paint(rrPts(960, 738, 100, 20, 6), { wash: o.phoneLit ? '#C9D6FF' : '#24252E', ink: PAL.ink, sw: .7 });
    PR.dust(t, 26, key + ' dust', { x0: 1250, x1: 1920, y0: 300, y1: 900, fall: 6, op: 120 });
  }

  // 0 – 2.87 前奏：黑场亮起，钟跳到 02:00，镜头推向床头的手机
  function s00(t, lt) {
    const z = kf(t, [[0, 1], [1.4, 1.02], [2.87, 1.55]]), cx = kf(t, [[0, 960], [1.4, 960], [2.87, 900]]), cy = kf(t, [[0, 540], [1.4, 540], [2.87, 690]]);
    camBegin(cx, cy, z);
    bedroom(t, 's00', { phoneLit: t > 2.2 ? .9 : 0 });
    if (t > 2.2) sfx('嗡', 1080, 690, 54, '#FFFFFF', t - 2.2, { font: `900 54px ${CN}`, life: .6 });
    camEnd();
    flash(1 - ease(seg(t, .1, 1.3)), '#07081A');
  }

  // 2.87 凌晨两点 群里有人喊补货啦：左边阿灰熟睡，右边手机升起，锁屏 02:00，弹出补货通知
  function s01(t, lt) {
    camBegin(560, 700, 1.35);
    bedroom(t, 's01', { phoneLit: .6, face: t > 5.55 ? { eyes: 'wide', mouth: 'o' } : null });
    camEnd();
    // Z z z
    if (t < 5.5) for (let i = 0; i < 3; i++) { const a = frac((t + i * .6) / 1.8); letter('z', 610 + a * 90 + i * 8, 470 - a * 140, 34 + i * 10, '#C9D6FF', { alpha: Math.sin(a * Math.PI), ink: false, font: `700 ${34 + i * 10}px "Permanent Marker"` }); }
    const up = easeOut(seg(t, 2.87, 3.3)), buzz = (t > 3.35 && t < 3.9) || (t > 4.6 && t < 5.0) ? Math.sin(t * 90) * 6 : 0;
    const px = 1500 + buzz, py = lerp(1500, 480, up);
    const s = PR.phone(px, py, 420, 820, { key: 's01 phone', glow: .8, screen: '#3B2F6E' });
    boilSeed('s01 lock'); paint(rrPts(s.x0, s.y0 + s.h * .55, s.w, s.h * .45, 30), { wash: '#5B3F86', washOp: 160, ink: null });
    ui('02:00', s.cx, s.y0 + 150, 112, '#FFFFFF', { font: `300 112px ${CN}` });
    ui('星期三', s.cx, s.y0 + 70, 28, '#E6E0FF', { bold: false });
    // 补货通知
    const nIn = backOut(seg(t, 3.35, 3.7));
    if (t > 3.35) {
      boilSeed('s01 note'); const ny = s.y0 + 300 + (1 - nIn) * -120;
      paint(rrPts(s.x0 + 14, ny - 6, s.w - 28, 112, 22), { wash: '#FFFFFF', washOp: 240, ink: null });
      shotImg('A01', s.cx, ny + 50, s.w - 44, { alpha: clamp(nIn * 1.5) });
    }
    if (t > 3.35) big('叮！', px - 300, py - 340, 90, '#FFD84A', t - 3.35, { rot: -.14 });
    if (t > 4.65) big('补货啦！', px - 330, py - 160, 70, '#FFFFFF', t - 4.65, { rot: .08, stroke: '#D2382B' });
  }

  // 6.22 我从床上弹起来 比上班还积极：左右分屏，08:00 赖床 / 02:00 弹起
  function s02(t, lt) {
    // 左：白天
    boilSeed('s02 dayw'); paint(rectPts(-40, -40, 1000, H + 80), { wash: '#E8D7B5', ink: null });
    boilSeed('s02 dayl'); paint([[-40, 300], [1000, 300], [1000, 420], [-40, 420]], { wash: '#F3E6C8', washOp: 160, ink: null });
    PR.bedFrame(80, 520, 760, 260, { key: 's02 bedL' });
    AH.sleep(270, 700, 74, { key: 's02 lazy', t, face: { eyes: 'squeeze', mouth: 'wavy' }, quilt: '#7D8FBF' });
    // 枕头捂住头
    const pw = Math.sin(t * 9) * .05;
    push(); translate(290, 600); rotate(-.2 + pw); boilSeed('s02 pil2'); paint(rrPts(-150, -80, 300, 130, 50), { wash: '#F2EEF6', ink: PAL.ink, sw: 1 }); pop();
    const ring = Math.sin(t * 60) * 8 * (frac(t * 1.2) < .7 ? 1 : 0);
    PR.clock(700 + ring, 260, 62, '08:00', { key: 's02 clkL', col: '#FF6B5A' });
    for (let i = 0; i < 3; i++) if (frac(t * 1.2 + i * .2) < .5) letter('铃', 560 + i * 140, 140 + (i % 2) * 30, 40, '#C24B3A', { font: `900 40px ${CN}`, rot: -.2 + i * .2, ink: false });
    ui('上班', 220, 150, 64, '#8C7A5A');
    // 右：深夜
    boilSeed('s02 nightw'); paint(rectPts(960, -40, 1000, H + 80), { wash: PR.NAVY, ink: null });
    PR.clock(1640, 200, 62, '02:00', { key: 's02 clkR', col: '#7CF2A8' });
    ui('补货', 1210, 150, 64, '#7CF2A8');
    // 弹起来：先从被子下猛地冲出（拉长），落地压扁，再站直
    const j = jump(t, 6.45, 7.05, 1.6), tk = take(t, 7.1, .7);
    const rise = easeOut(seg(t, 6.3, 6.6));
    AH.body(1440, lerp(1300, 900, rise), 78, { key: 's02 ah', t, dy: j.dy + tk.dy, sq: j.sq + tk.sq, eyes: t < 6.45 ? 'closed' : 'star', mouth: t < 6.45 ? 'flat' : 'grin', aL: lerp(.3, 2.7, rise), aR: lerp(.3, 2.5, rise), lensGlow: .4 });
    // 被子飞走
    const fq = easeOut(seg(t, 6.35, 7.4));
    push(); translate(lerp(1440, 2000, fq), lerp(930, 380, fq) + fq * fq * 200); rotate(fq * 2.4);
    boilSeed('s02 quilt'); paint([[-260, -40], [-80, -95], [120, -50], [270, -100], [250, 60], [70, 105], [-120, 70], [-250, 95]], { wash: '#5A6FA8', ink: PAL.ink, sw: 1, curv: .5 }); pop();
    boilSeed('s02 bedR'); paint([[960, 930], [1920, 920], [1920, 1120], [960, 1120]], { wash: '#4B3F5E', ink: PAL.ink, sw: 1 });
    if (t > 7.1) for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + t, r = 190 + Math.sin(t * 6 + i) * 20; paint(starPts(1440 + Math.cos(a) * r, 600 + Math.sin(a) * r * .7, 16, .4, 4), { wash: '#FFD84A', ink: null }); }
    PR.splitLine(960, 's02 split', { slope: .05 });
  }

  // 9.02 库存刷新 只剩个位数
  function s03(t, lt) {
    PR.nightBG('s03', { floor: false });
    glow(1300, 420, 700, '#6E8BFF', .45);
    PR.dust(t, 30, 's03 dust', { op: 100 });
    // 刷新转圈，然后页面弹出
    const pop = backOut(seg(t, 9.45, 9.8));
    PR.card(1300, 420, 880, 395, { key: 's03 card' });
    if (t < 9.5) { boilSeed('s03 spin'); const a = t * 9; inkLine(Array.from({ length: 9 }, (_, i) => [1300 + Math.cos(a + i * .6) * 60, 420 + Math.sin(a + i * .6) * 60]), 1.6, '#6A6FE8', 'ink', .5); }
    const r = shotImg('A03', 1300, 420, 880, { scale: lerp(.85, 1, pop), alpha: clamp(pop * 2) });
    if (r && t > 9.8) {
      const [cx, cy] = onShot(r, 272, 203), d = ease(seg(t, 9.8, 10.15)), pulseK = 1 + .05 * pulse(t, 8);
      const pts = ellPts(cx, cy, 215 * pulseK, 52 * pulseK, 30, 0, -.04).slice(0, Math.max(2, Math.round(30 * d)));
      boilSeed('s03 circ'); inkLine(pts, 2, '#E0412F', 'ink', .5);
      big('只剩4台！', 1560, 760, 84, '#FF6B5A', t - 10.25, { stroke: '#FFFFFF', life: 1.3 });
    }
    AH.bust(430, 1180, 160, { key: 's03 ah', t, eyes: 'wide', mouth: 'o', lensGlow: 1, sweat: 1, sweatDrop: frac(t), bob: pulse(t) * -8 });
    glow(430, 830, 320, '#6E8BFF', .35);
  }

  // 11.41 手指比脑子先一步：大特写按钮，手指先按下去，大脑在后面追
  function s04(t, lt) {
    PR.nightBG('s04', { floor: false, wall: '#20265A' });
    glow(960, 420, 800, '#6E8BFF', .4);
    const press = t > 11.78 && t < 12.05 ? 1 : 0;
    PR.card(960, 420, 1180, 420, { key: 's04 card' });
    shotImg('A03', 960, 420, 1180, { src: [70, 40, 404, 145], scale: press ? .97 : 1 });
    if (t > 11.78) { flash(.35 * Math.exp(-(t - 11.78) * 8), '#FFFFFF'); big('啪！', 1500, 180, 110, '#FFD84A', t - 11.78, { rot: .12 }); }
    // 手指：从右边伸进来，11.78 按下
    const fin = kf(t, [[11.41, 1.0], [11.7, .15], [11.78, 0], [12.05, 0], [12.4, .25]], easeOut);
    PR.finger(1010 + fin * 900, 430 - fin * 120, 90, -.25, { key: 's04 fg' });
    // 大脑：12.0 从左边跑进来，13.0 停在半路喘气
    const bx = kf(t, [[11.9, -200], [13.0, 420]], ease), run = (t - 11.9) * 3.5;
    PR.brain(bx, 800, 105, { key: 's04 br', run: t < 13.0 ? run : 0, sweat: true });
    if (t > 13.0) big('？', bx + 90, 640, 90, '#FFFFFF', t - 13.0, { life: .6 });
    for (let i = 0; i < 3; i++) if (t < 13) { const a = frac(t * 3 + i / 3); inkLine([[bx - 140 - a * 60, 790 + i * 30], [bx - 100 - a * 60, 790 + i * 30]], .8, '#C9D6FF', 'inkfine', 0); }
  }

  // 13.48 付完款 才想起：支付宝 -299 弹出，邮件滑入，阿灰定住
  function s05(t, lt) {
    PR.nightBG('s05', { floor: false });
    PR.dust(t, 24, 's05 dust', { op: 100 });
    const up = easeOut(seg(t, 13.48, 13.85));
    const s = PR.phone(1380, lerp(1400, 560, up), 470, 940, { key: 's05 phone', glow: .6 });
    shotImg('A04', s.cx, s.cy + 20, s.w - 10);
    const em = backOut(seg(t, 14.35, 14.75));
    if (t > 14.35) { PR.card(870, lerp(-200, 190, em), 760, 172, { key: 's05 mail', pad: 12 }); shotImg('A05', 870, lerp(-200, 190, em), 760); }
    const froze = t > 14.95;
    AH.bust(430, 1180, 160, { key: 's05 ah', t, eyes: froze ? 'blank' : 'happy', mouth: froze ? 'o' : 'grin', sweat: froze ? 1 : 0, blush: froze ? 0 : .8, lensGlow: .5, bob: froze ? 0 : pulse(t) * -8 });
    // 思考泡的尾巴一个个冒出来
    for (let i = 0; i < 3; i++) if (t > 15.05 + i * .15) { boilSeed('s05 tb' + i); const k = backOut(seg(t, 15.05 + i * .15, 15.25 + i * .15)); paint(ellPts(560 + i * 70, 470 - i * 90, (14 + i * 9) * k, (12 + i * 8) * k, 12), { wash: '#FFF8EA', ink: PAL.ink, sw: .9 }); }
    if (froze) big('……', 620, 640, 70, '#FFFFFF', t - 14.95, { life: .7 });
  }

  // 15.56 上一台 还没开过机：思考泡里，订单还挂着 PENDING，纸箱里的小鸡落满了灰
  function s06(t, lt) {
    PR.nightBG('s06', { floor: false });
    const zin = ease(seg(t, 17.6, 18.2)), z = lerp(1, 1.55, zin);
    camBegin(lerp(960, 960, zin), lerp(520, 640, zin), z);
    PR.thought(960, 500, 880, 450, { key: 's06 cloud' });
    PR.card(900, 200, 1400, 108, { key: 's06 pend', pad: 10 });
    shotImg('A06', 900, 200, 1400, { src: [30, 30, 1960, 175], h: 108 });
    // 纸箱 + 小鸡
    const sneeze = t > 18.25 ? 1 : 0, sk = spring(t, 18.25, 7, 26);
    PR.box(960, 820, 380, 230, { key: 's06 box', inside: () => CK.chick(1030, 520 - sk * 20, 88, { key: 's06 ck', dust: .55, eyes: sneeze ? 'x' : 'closed', light: 0, sq: sk * .2 }) });
    // 蜘蛛网
    boilSeed('s06 web'); for (let i = 0; i < 4; i++) inkLine([[1150, 590], [1150 + Math.cos(i * .4) * 90, 590 + Math.sin(i * .4) * 90]], .6, '#B9B2A8', 'inkfine', 0);
    inkLine([[1205, 590], [1195, 625], [1170, 640]], .6, '#B9B2A8', 'inkfine', .5);
    // 手写标注
    boilSeed('s06 arrow'); inkLine([[1430, 520], [1350, 580], [1250, 620]], 1.4, '#D2382B', 'ink', .5); inkLine([[1250, 620], [1290, 592]], 1.4, '#D2382B', 'ink', 0); inkLine([[1250, 620], [1295, 632]], 1.4, '#D2382B', 'ink', 0);
    letter('上一台', 1520, 480, 64, '#D2382B', { font: `700 64px ${CN}`, rot: -.08, ink: false });
    PR.dust(t, 40, 's06 dust', { x0: 700, x1: 1220, y0: 300, y1: 880, fall: 40, col: '#B9B2A8', op: 200, r: 4 });
    if (sneeze) { big('阿嚏！', 1180, 470, 70, '#FFFFFF', t - 18.25, { life: .65 }); for (let i = 0; i < 10; i++) { const a = i / 10 * TAU, d = easeOut(seg(t, 18.25, 18.7)) * 140; boilSeed('s06 puff' + i); paint(ellPts(1030 + Math.cos(a) * d, 520 + Math.sin(a) * d * .6, 22, 18, 8), { wash: '#C9C2B6', washOp: 200 * (1 - seg(t, 18.4, 18.9)), ink: null }); } }
    camEnd();
  }

  // 18.91 洛杉矶 东京 香港 法兰克福：手机里的机房列表按唱的顺序亮起，每亮一行蹦出一只小鸡
  const CITY = [['LA', 388, 18.91], ['东京', 172, 19.91], ['香港', 62, 20.91], ['法兰克福', 285, 21.91]];
  function s07(t, lt) {
    PR.nightBG('s07', { floor: false, wall: '#1E2452' });
    for (let i = 0; i < 5; i++) { boilSeed('s07 lat' + i); inkLine([[-40, 140 + i * 170], [W + 40, 160 + i * 170]], .5, '#36407A', 'inkfine', .3); }
    const s = PR.phone(430, 520, 470, 900, { key: 's07 phone', glow: .5 });
    const r = shotImg('A07', s.cx, s.cy, s.w - 20);
    CITY.forEach(([name, row, t0], i) => {
      if (t < t0) return;
      const [, ry] = onShot(r, 0, row);
      boilSeed('s07 hl' + i); paint(rrPts(s.x0 + 4, ry - 46, s.w - 8, 92, 10), { wash: '#FFD84A', washOp: t < t0 + .5 ? 90 : 45, ink: t < t0 + .5 ? '#E0A82E' : null, sw: .8 });
      const k = seg(t, t0, t0 + .55), tx = 990 + i * 255, ty = 600;
      const [cx, cy] = arcPt([s.x0 + s.w - 40, ry], [tx, ty], 260, easeOut(k));
      const land = jump(t, t0 + .55 - 1e-3, t0 + .55, 0);
      CK.chick(cx, cy, 90, { key: 's07 ck' + i, sign: k >= 1 ? name : null, flap: k < 1 ? .9 : .2 + .2 * pulse(t), sq: land.sq, eyes: k < 1 ? 'wide' : 'happy', rot: k < 1 ? (1 - k) * -.6 : 0 });
    });
  }

  // 22.90 我的鸡 住遍了半个地球：世界地图，小鸡沿航线飞到各自的节点
  const PINS = [[165, 168], [888, 152], [818, 192], [527, 108]];
  function s08(t, lt) {
    PR.nightBG('s08', { floor: false, wall: '#1E2452' });
    camBegin(960, 470, kf(t, [[22.9, 1], [25.05, 1.06]]));
    PR.card(960, 460, 1650, 514, { key: 's08 map', pad: 16 });
    const r = shotImg('A08', 960, 460, 1650);
    const [ox, oy] = onShot(r, 792, 148);
    PINS.forEach(([px, py], i) => {
      const t0 = 22.95 + i * .28, k = easeOut(seg(t, t0, t0 + .95)), [tx, ty] = onShot(r, px, py - 14);
      if (t < t0) return;
      const h = 140 + Math.abs(tx - ox) * .12;
      boilSeed('s08 trail' + i);
      const tr = []; for (let j = 0; j <= 14; j++) { const q = j / 14 * k; if (j % 2 === 0) tr.push(arcPt([ox, oy], [tx, ty], h, q)); }
      for (let j = 0; j + 1 < tr.length; j += 2) inkLine([tr[j], tr[j + 1]], .8, '#E0412F', 'inkfine', 0);
      const [cx, cy] = arcPt([ox, oy], [tx, ty], h, k);
      CK.chick(cx, cy - 20, 34, { key: 's08 ck' + i, flap: k < 1 ? .5 + .5 * Math.sin(t * 30) : .1, eyes: k < 1 ? 'dot' : 'happy', glowA: .6 });
    });
    camEnd();
  }

  // 25.05 比我这辈子去过的地方还多：阿灰自己的地图只有「家」和「公司」
  function s09(t, lt) {
    boilSeed('s09 paper'); paint(rectPts(-40, -40, W + 80, H + 80), { wash: '#EFE3C8', ink: null });
    for (let i = 0; i < 6; i++) { boilSeed('s09 road' + i); inkLine([[-40, 180 + i * 140 + hash(i) * 40], [W + 40, 140 + i * 150]], .5, '#CDBB98', 'inkfine', .4); inkLine([[200 + i * 300, -40], [260 + i * 290, H + 40]], .5, '#CDBB98', 'inkfine', .4); }
    ui('我去过的地方', 960, 110, 60, '#5B4A3A');
    const A = [520, 520], B = [1400, 520];
    boilSeed('s09 path'); for (let i = 0; i < 22; i += 2) inkLine([[lerp(A[0], B[0], i / 22), A[1] + Math.sin(i) * 6], [lerp(A[0], B[0], (i + 1) / 22), A[1] + Math.sin(i + 1) * 6]], 1.2, '#D2382B', 'ink', 0);
    for (const [p, name, col] of [[A, '家', '#6E9F58'], [B, '公司', '#5A6FA8']]) {
      boilSeed('s09 pin' + name); paint([[p[0], p[1]], [p[0] - 26, p[1] - 50], [p[0], p[1] - 80], [p[0] + 26, p[1] - 50]], { wash: col, ink: PAL.ink, sw: 1, curv: .5 });
      paint(ellPts(p[0], p[1] - 52, 10, 10, 8), { wash: '#FFFFFF', ink: null });
      ui(name, p[0], p[1] + 50, 50, '#3A2E26');
    }
    // 小阿灰来回跑：每个小节一个来回
    const ph = (t - 25.05) / (BEAT * 2), tri = 1 - Math.abs(1 - 2 * frac(ph));
    AH.body(lerp(A[0] + 70, B[0] - 70, ease(tri)), 600 + 150, 26, { key: 's09 ah', eyes: 'open', mouth: 'flat', legs: Math.sin(t * 22) * .5, aL: .3 + Math.sin(t * 22) * .4, aR: .3 - Math.sin(t * 22) * .4, dy: -Math.abs(Math.sin(t * 22)) * .3 });
    ui('共 2 处', 1600, 820, 52, '#D2382B');
  }

  // 27.61 可我连护照都还没办过：护照飘进来，盖上「未办理」；右边舷窗外飞机掠过，小鸡在挥手
  function s10(t, lt) {
    // 右半：舷窗（先画窗外的天和飞机，再用 irisShape 把窗外一圈涂成机舱壁）
    const wx = 1400, wy = 470, ww = 500, wh = 660;
    boilSeed('s10 sky'); paint(rrPts(wx - ww / 2, wy - wh / 2, ww, wh, 200), { wash: '#8EC3E6', ink: null });
    for (let i = 0; i < 4; i++) { boilSeed('s10 cl' + i); const cx = wx - 300 + ((hash(i) * 700 + t * 40) % 700), cy = wy - 200 + i * 120; paint(ellPts(cx, cy, 90, 30, 14), { wash: '#FFFFFF', washOp: 200, ink: null }); }
    const pk = seg(t, 28.2, 31.6);
    PR.plane(lerp(wx + 520, wx - 520, pk), wy + 40 + Math.sin(t * 2) * 10, 70, { key: 's10 pl', chicks: true });
    boilSeed('s10 frame'); irisShape(rrPts(wx - ww / 2, wy - wh / 2, ww, wh, 200), '#C9CDD8', 2400);
    paint(rrPts(wx - ww / 2 - 26, wy - wh / 2 - 26, ww + 52, wh + 52, 220), { ink: '#9AA1B2', sw: 2.4 });
    paint(rrPts(wx - ww / 2, wy - wh / 2, ww, wh, 200), { ink: '#7C8394', sw: 2 });
    // 左半：夜里的房间 + 护照
    boilSeed('s10 left'); paint([[-60, -60], [1010, -60], [990, H + 60], [-60, H + 60]], { wash: PR.NAVY, ink: null });
    PR.dust(t, 18, 's10 dust', { x1: 980, op: 90 });
    const fin = easeOut(seg(t, 27.61, 28.3)), bob = Math.sin(t * 2) * 10, shake = t > 30.2 && t < 30.5 ? shakeXY(t, 10) : [0, 0];
    glow(560, 470, 380, '#6E8BFF', .3);
    shotImg('A09', 560 + shake[0], lerp(1400, 470, fin) + bob + shake[1], 430, { rot: -.06 + Math.sin(t * 1.3) * .02 });
    PR.stamp('未办理', 575, 560 + bob, 70, t - 30.2, { key: 's10 st' });
    PR.splitLine(1000, 's10 split', { slope: .02 });
    if (t > 32.09) brushWipe((t - 32.09) / .6, ['#F28C5B', '#FFC15E']);
  }

  shots([[0, s00], [2.87, s01], [6.22, s02], [9.02, s03], [11.41, s04], [13.48, s05], [15.56, s06], [18.91, s07], [22.90, s08], [25.05, s09], [27.61, s10]]);
})();
