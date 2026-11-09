// c1_chorus.js：副歌一（43.24 – 71.49）。共用的副歌镜头挂在 window.CHO，副歌二、最后副歌也用。
(() => {
  const AMBER = '#D98F68', AMBER2 = '#EBB085';

  function amberBG(t, key, o = {}) {
    boilSeed(key + ' bg'); paint(rectPts(-60, -60, W + 120, H + 120), { wash: o.col || AMBER, ink: null });
    boilSeed(key + ' bg2'); paint([[-60, -60], [W + 60, -60], [W + 60, 300], [-60, 420]], { wash: o.col2 || AMBER2, washOp: 160, ink: null });
    glow(960, 420, 900, '#FFD9A8', .25);
  }
  // 机柜里一格一只小鸡。n 只（从 0 开始数），dust 落灰，arrive = [到达时间, 编号] 让最后一只飞进来
  function rackScene(t, key, o = {}) {
    const cols = o.cols || 4, rows = o.rows || 2, cw = o.cw || 250, ch = o.ch || 250, x = o.x ?? 960, y = o.y ?? 450;
    const r = Math.min(cw, ch) * .27;
    let slotPos = null;
    PR2.rack(x, y, cols, rows, cw, ch, (i, cx, cy) => {
      if (o.arrive && i === o.arrive[1]) { slotPos = [cx, cy + r * .25]; if (t < o.arrive[0]) return; }
      const bounce = o.dance ? Math.abs(Math.sin((bpOf(t) + i * .25) * Math.PI)) * r * .35 : 0;
      CK.chick(cx, cy + r * .25 - bounce, r, { key: key + ' ck' + i, dust: o.dust ? o.dust(i) : .3, eyes: o.eyes ? o.eyes(i) : (hash(i) > .5 ? 'closed' : 'dot'), flap: o.dance ? .6 + .5 * Math.sin(t * 8 + i) : .1, glowA: .5, sq: o.sq ? o.sq(i) : 0 });
    }, { key: key + ' rack', led: o.led });
    // 新来的一只飞进最后一格
    if (o.arrive && slotPos) {
      const [ta] = o.arrive, k = seg(t, ta - .65, ta);
      if (t < ta) { const [cx, cy] = arcPt([W + 120, -120], slotPos, -160, easeOut(k)); CK.chick(cx, cy, r, { key: key + ' new', flap: .5 + .5 * Math.sin(t * 30), eyes: 'wide', rot: (1 - k) * .8 }); }
      if (t >= ta && t < ta + 1.2) for (let i = 0; i < 12; i++) { const a = i / 12 * TAU, d = easeOut(seg(t, ta, ta + .5)) * 130; boilSeed(key + ' puff' + i); paint(ellPts(slotPos[0] + Math.cos(a) * d, slotPos[1] + Math.sin(a) * d * .6, 26, 20, 8), { wash: '#C9C2B6', washOp: 220 * (1 - seg(t, ta + .4, ta + 1.2)), ink: null }); }
      if (t >= ta) big('噗', slotPos[0] + 110, slotPos[1] - 120, 70, '#FFFFFF', t - ta, { life: .7 });
    }
    return r;
  }
  // 深夜躺床上看手机（侧躺，手机光照脸）
  function bedPhone(t, key, o = {}) {
    PR.nightBG(key, { floor: false });
    PR.nightWindow(1380 + (o.moonX || 0), 90, 440, 360, { key: key + ' win' });
    PR.bedFrame(-80, 300, 1300, 380, { key: key + ' bedf' });
    AH.sleep(420, 640, 120, { key: key + ' ah', t, face: { eyes: o.eyes || 'open', mouth: o.mouth || 'flat', glasses: true, lensGlow: .8, look: .5 }, mouth: o.mouth || 'flat' });
    // 手里举着手机
    boilSeed(key + ' ph'); paint(rrPts(640, 420, 110, 190, 18), { wash: '#24252E', ink: PAL.ink, sw: 1 });
    paint(rrPts(648, 430, 94, 170, 14), { wash: '#CFE0FF', ink: null });
    glow(695, 520, 260, '#9FB8FF', .8);
    paint(ellPts(700, 620, 40, 30, 10), { wash: AH.C.skin, ink: PAL.ink, sw: .9 });
    PR.dust(t, 18, key + ' dust', { x0: 500, x1: 1000, y0: 300, y1: 800, op: 110 });
  }
  // 横着的手机，屏幕里平移探针截图
  function phoneLandscape(t, key, id, src, o = {}) {
    const x = o.x ?? 960, y = o.y ?? 460, w = o.w ?? 1500, h = o.h ?? 780;
    if (o.glow !== false) glow(x, y, w * .7, '#7FA8FF', .5);
    boilSeed(key + ' body'); paint(rrPts(x - w / 2, y - h / 2, w, h, 70), { wash: '#24252E', ink: PAL.ink, sw: 1.2 });
    const b = 34, sx = x - w / 2 + b * 1.6, sy = y - h / 2 + b, sw = w - b * 3.2, sh = h - 2 * b;
    boilSeed(key + ' scr'); paint(rrPts(sx, sy, sw, sh, 40), { wash: '#F4F5F8', ink: null });
    const g = IMG[id]; if (!g) return;
    const [cx0, cy0, cw0, ch0] = src; // 截图里要显示的区域（按屏幕比例取）
    shotImg(id, x, y, sw, { src: [cx0, cy0, cw0, ch0], h: sh });
  }
  // 探针在线列表：手机 + 列表往上滚，每个「在线」冒出绿点；右边小鸡一只只亮起
  function onlineList(t, key, t0, t1, o = {}) {
    PR.nightBG(key, { floor: false, wall: '#1E2452' });
    PR.dust(t, 20, key + ' dust', { op: 90 });
    const s = PR.phone(470, 500, 470, 900, { key: key + ' ph', glow: .5 });
    const g = IMG.A16, k = ease(seg(t, t0, t1)), sh = g.H0 * (s.h / (s.w * g.H0 / g.W0)) ;
    // 列表比屏幕长：把截图按屏宽缩放后，可见区域从顶部往下滚
    const scale = s.w / g.W0, visH = s.h / scale, top = lerp(0, Math.max(0, g.H0 - visH), k);
    shotImg('A16', s.cx, s.cy, s.w, { src: [0, top, g.W0, visH], h: s.h });
    const n = 7;
    for (let i = 0; i < n; i++) {
      const ti = lerp(t0, t1, i / n) + .1, on = t > ti;
      const cx = 900 + (i % 4) * 250 + (i >= 4 ? 125 : 0), cy = i < 4 ? 330 : 640;
      const pop = backOut(seg(t, ti, ti + .3));
      if (on) CK.chick(cx, cy, 78 * pop, { key: key + ' ck' + i, eyes: 'happy', light: 1, flap: .2 + .2 * pulse(t), glowA: 1 });
    }
  }

  // ---------- 副歌一 ----------
  // 43.24 又一台小鸡 买来吃灰：机柜最后一格塞进一只新的，扬起灰，灰聚成片名
  function c01(t) {
    amberBG(t, 'c01');
    rackScene(t, 'c01', { arrive: [43.95, 7], dust: i => .25 + hash(i * 3) * .4 });
    PR.dust(t, 40, 'c01 dust', { fall: 60, col: '#C9C2B6', op: 200, r: 5 });
    const k = ease(seg(t, 44.3, 45.0));
    if (k > 0) letter('吃灰', 960, 470, 300 * lerp(1.15, 1, k), '#E9E2D6', { font: `${300 * lerp(1.15, 1, k)}px ${TITLE_FONT}`, stroke: '#3A3348', alpha: k * (1 - seg(t, 45.25, 45.56)), ink: true });
  }
  // 45.56 年付十刀 说贵也不贵：价格卡 + 计算器
  function c02(t) {
    amberBG(t, 'c02');
    PR.card(700, 230, 900, 127, { key: 'c02 card' });
    shotImg('A10', 700, 230, 900, { src: [0, 10, 994, 127] });
    boilSeed('c02 calc'); paint(rrPts(320, 420, 760, 420, 40), { wash: '#3A3D4A', ink: PAL.ink, sw: 1.2 });
    paint(rrPts(360, 460, 680, 150, 20), { wash: '#B9D8B0', ink: PAL.ink, sw: .8 });
    const steps = ['10', '10 ÷ 365', '10 ÷ 365 =', '0.027'];
    const si = Math.min(3, Math.floor((t - 45.56) / .45));
    ui(steps[si] + (si === 3 ? ' 刀/天' : ''), 1010, 535, si === 3 ? 76 : 64, '#1F3A1F', { align: 'right', font: `700 ${si === 3 ? 76 : 64}px ${PR2.MONO}` });
    for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) { boilSeed('c02 k' + r + c); const pressed = Math.floor((t - 45.56) / .2) % 10 === r * 5 + c && t < 47; paint(rrPts(380 + c * 132, 650 + r * 90 + (pressed ? 6 : 0), 110, 70, 14), { wash: c === 4 ? '#F2A27E' : '#E8E6EF', ink: PAL.ink, sw: .7 }); }
    AH.bust(1550, 1190, 150, { key: 'c02 ah', t, eyes: si === 3 ? 'happy' : 'open', mouth: si === 3 ? 'smile' : 'flat', blush: si === 3 ? .7 : 0, tilt: si === 3 ? Math.sin(t * 8) * .06 : 0, look: -1 });
    if (si === 3) big('不贵！', 1500, 520, 90, '#FFFFFF', t - 46.95, { stroke: '#B4462F', life: 1 });
  }
  // 48.03 用不用得上 无所谓：CPU 0.0%，小鸡趴在空进度条上打呼噜
  function c03(t) {
    amberBG(t, 'c03', { col: '#C9875F' });
    PR.card(960, 470, 1150, 449, { key: 'c03 card' });
    const r = shotImg('A14', 960, 470, 1150);
    const [cx, cy] = onShot(r, 210, 70), d = ease(seg(t, 48.4, 48.8));
    boilSeed('c03 ring'); if (d > 0) inkLine(ellPts(cx, cy, 120, 50, 26, 0, -.05).slice(0, Math.round(26 * d) + 1), 2, '#E0412F', 'ink', .5);
    const [bx, by] = onShot(r, 110, 95);
    CK.chick(bx - 50, by - 66, 58, { key: 'c03 ck', eyes: 'closed', flap: .05, sq: .12 + .05 * Math.sin(t * 3), rot: -.2 });
    for (let i = 0; i < 3; i++) { const a = frac((t + i * .5) / 1.5); letter('z', bx + 10 + a * 70, by - 140 - a * 100, 30 + i * 8, '#FFFFFF', { alpha: Math.sin(a * Math.PI), ink: false, font: `700 ${30 + i * 8}px "Permanent Marker"` }); }
    big('0.0%', 1560, 180, 90, '#FFD84A', t - 48.8, { stroke: '#B4462F', life: 1.3 });
  }
  // 50.19 反正下单那一刻很陶醉：陶醉脸特写，Order Now 像舞台追光
  function c04(t) {
    amberBG(t, 'c04', { col: '#E59AA6', col2: '#F5C1C8' });
    glow(1380, 360, 600, '#FFFFFF', .5);
    for (let i = 0; i < 6; i++) { boilSeed('c04 beam' + i); paint([[1380, -60], [1380 - 300 + i * 120, 760], [1380 - 220 + i * 120, 760]], { wash: '#FFF3E0', washOp: 60, ink: null }); }
    PR.card(1380, 360, 640, 287, { key: 'c04 btn' });
    shotImg('A03', 1380, 360, 640, { scale: 1 + .03 * pulse(t) });
    for (let i = 0; i < 9; i++) { const a = frac((t - 50.19) * .45 + hash(i)), bx = 200 + hash(i * 3) * 900, by = 1000 - a * 900, r = 20 + hash(i * 5) * 30; boilSeed('c04 bub' + i); paint(ellPts(bx, by, r, r, 14), { wash: '#FFD6E2', washOp: 160 * Math.sin(a * Math.PI), ink: '#E58FA8', sw: .5 }); }
    AH.bust(560, 1220, 210, { key: 'c04 ah', t, eyes: 'closed', mouth: 'smile', blush: 1, tilt: Math.sin(t * 2.2) * .1, lensGlow: .3 });
    for (let i = 0; i < 3; i++) { const a = frac(t * .8 + i / 3); paint(starPts(560 + Math.cos(i * 2 + t) * 300, 350 - a * 120, 18, .4, 4), { wash: '#FFFFFF', washOp: 255 * Math.sin(a * Math.PI), ink: null }); }
  }
  // 52.82 我妈问 这能当饭吃吗
  function momCall(t, key, t0) {
    PR.nightBG(key, { floor: false });
    const s = PR.phone(560, 500, 520, 920, { key: key + ' ph', glow: .5, screen: '#F6E3C9' });
    boilSeed(key + ' kit'); paint(rectPts(s.x0, s.y0, s.w, s.h * .45), { wash: '#E9D2B0', ink: null });
    for (let i = 0; i < 4; i++) { boilSeed(key + ' tile' + i); paint(rectPts(s.x0 + i * s.w / 4 + 6, s.y0 + 30, s.w / 4 - 12, 90), { wash: '#F6EBD8', ink: '#D5BF9C', sw: .5 }); }
    const talk = t > t0 && t < t0 + 1.7 ? .4 + .6 * Math.abs(Math.sin(t * 14)) : 0;
    PR2.mom(s.cx, s.y0 + s.h * .95, 150, { key: key + ' mom', talk, spatula: true, wave: 1, brow: -1 });
    ui('妈', s.cx, s.y0 + 26, 30, '#5B4A3A');
    PR2.bubble(1240, 300, 640, 160, '这能当饭吃吗？', { key: key + ' bub', scale: backOut(seg(t, t0 + .2, t0 + .5)), tail: [900, 420], fs: 56 });
    AH.bust(1520, 1200, 130, { key: key + ' ah', t, eyes: 'open', mouth: 'wavy', sweat: 1, sweatDrop: frac(t), look: -1 });
  }
  const c05 = t => momCall(t, 'c05', 52.82);
  // 54.89 不能呀
  function noCan(t, key, t0) {
    PR.nightBG(key, { floor: false });
    AH.bust(960, 1250, 220, { key: key + ' ah', t, eyes: 'squeeze', mouth: 'wavy', sweat: 1, tilt: Math.sin((t - t0) * 30) * .12 * Math.exp(-(t - t0) * 2) });
    big('不能呀', 960, 230, 150, '#FFFFFF', t - t0, { stroke: '#4F6A98', life: 2 });
  }
  const c06 = t => noCan(t, 'c06', 54.89);
  // 55.69 可半夜睡不着的时候
  const c07 = t => bedPhone(t, 'c07');
  // 57.37 打开探针
  function c08(t) {
    PR.nightBG('c08', { floor: false });
    const g = IMG.A15, k = ease(seg(t, 57.37, 58.8)), vw = g.H0 * (1500 - 34 * 3.2) / (780 - 68);
    phoneLandscape(t, 'c08', 'A15', [lerp(0, g.W0 - vw, k), 0, vw, g.H0]);
  }
  // 58.80 看着心爱的机器都在线
  const c09 = t => onlineList(t, 'c09', 58.8, 61.2);
  // 61.36 也不算没人陪：抱着手机睡着，小鸡们从屏幕里探出身子给他拉被子；器乐段镜头退出窗外
  function c10(t) {
    const out = ease(seg(t, 65.5, 70.5));
    if (out < 1) {
      camBegin(lerp(700, 1500, out), lerp(540, 300, out), lerp(1, 2.6, out));
      PR.nightBG('c10', { floor: false });
      PR.nightWindow(1380, 90, 440, 360, { key: 'c10 win' });
      PR.bedFrame(-80, 300, 1300, 380, { key: 'c10 bedf' });
      const pull = ease(seg(t, 62.2, 63.6));
      AH.sleep(420, 640, 120, { key: 'c10 ah', t, face: { eyes: 'closed', mouth: 'smile' }, mouth: 'smile', quilt: '#5A6FA8' });
      // 胸前的手机
      boilSeed('c10 ph'); paint(rrPts(560, 700, 160, 100, 14), { wash: '#24252E', ink: PAL.ink, sw: 1 }); paint(rrPts(570, 708, 140, 84, 10), { wash: '#CFE0FF', ink: null });
      glow(640, 740, 200, '#9FB8FF', .7);
      for (let i = 0; i < 3; i++) {
        const k = backOut(seg(t, 61.5 + i * .3, 62.0 + i * .3)), cx = 560 + i * 85 + pull * 30, cy = 650 - k * 60 - pull * 30;
        if (k > 0) CK.chick(cx, cy, 52 * clamp(k), { key: 'c10 ck' + i, eyes: 'happy', flap: .8, glowA: .8 });
      }
      camEnd();
    }
    // 窗外：城市夜景，几扇窗亮着
    if (out > .45) {
      const a = seg(out, .45, .75);
      boilSeed('c10 citysky'); paint(rectPts(-60, -60, W + 120, H + 120), { wash: '#2A3570', washOp: 255 * a, ink: null });
      if (a > .5) PR2.city('c10 city', { lit: (i) => hash(i * 1.3) > .86 ? 1 : 0, glow: .5, base: 1100, n: 9, step: 225 });
    }
    flash(seg(t, 70.6, 71.49), '#0B1A12');
  }

  window.CHO = { amberBG, rackScene, bedPhone, phoneLandscape, onlineList, momCall, noCan };
  shots([[43.24, c01], [45.56, c02], [48.03, c03], [50.19, c04], [52.82, c05], [54.89, c06], [55.69, c07], [57.37, c08], [58.80, c09], [61.36, c10]]);
})();
