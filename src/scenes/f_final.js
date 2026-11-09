// f_final.js：最后一遍副歌（178.56 – 204.73）+ 尾声（204.73 – 218.41）。暖金，满城窗户亮起。
(() => {
  const GOLD = '#E8B35E';
  // 金色灰尘
  const goldDust = (t, n, key) => PR.dust(t, n, key, { fall: 30, col: '#FFE3A0', op: 220, r: 5 });
  function nightCity(t, key, o = {}) {
    boilSeed(key + ' sky'); paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#1E2452', ink: null });
    boilSeed(key + ' sky2'); paint([[-200, 600], [W + 200, 600], [W + 200, H + 200], [-200, H + 200]], { wash: '#3A2E5C', washOp: 160, ink: null });
    return PR2.city(key + ' city', { lit: o.lit, win: o.win, glow: o.glow ?? .35, base: 1100, n: 10, step: 205, bh: o.bh || 640, cols: 4 });
  }

  // 178.56 又一台小鸡买来吃灰：手机的光把他照回人的样子，这次灰是金色的
  function f01(t) {
    CHO.amberBG(t, 'f01', { col: GOLD, col2: '#F6D59A' });
    CHO.rackScene(t, 'f01', { x: 1200, cols: 4, rows: 2, cw: 220, ch: 220, arrive: [179.3, 7], dust: i => .2 });
    goldDust(t, 40, 'f01 gd');
    AH.bust(380, 1200, 150, { key: 'f01 ah', t, eyes: 'happy', mouth: 'smile', blush: .6, lensGlow: .6 });
    glow(380, 900, 260, '#FFE1A8', .5);
  }
  // 180.80 就当给自己也续一年费：续费催款，按下续费，自己胸前的工牌跳出「到期 +365 天」
  function f02(t) {
    CHO.amberBG(t, 'f02', { col: GOLD, col2: '#F6D59A' });
    PR.card(1220, 220, 900, 244, { key: 'f02 due' });
    shotImg('A36', 1220, 220, 900);
    const hit = t > 181.8;
    boilSeed('f02 btn'); paint(rrPts(1070, 440, 300, 90, 45), { wash: hit ? '#2E9E5B' : '#3D5AFE', ink: PAL.ink, sw: 1 });
    ui(hit ? '已续费' : '续费一年', 1220, 485, 44, '#FFFFFF');
    const tap = kf(t, [[180.8, .4], [181.75, 0], [181.9, 0], [182.3, .5]], ease);
    PR.finger(1230 + tap * 300, 500 + tap * 300, 70, .6, { key: 'f02 fg' });
    AH.bust(420, 1200, 150, { key: 'f02 ah', t, eyes: hit ? 'happy' : 'open', mouth: hit ? 'smile' : 'flat', blush: hit ? .6 : 0 });
    // 工牌
    boilSeed('f02 badge'); inkLine([[385, 1008], [395, 1045]], 1, '#E0412F', 'ink', 0); inkLine([[455, 1008], [445, 1045]], 1, '#E0412F', 'ink', 0);
    paint(rrPts(360, 1040, 120, 70, 10), { wash: '#FFFDF6', ink: PAL.ink, sw: .8 });
    if (hit) big('到期 +365 天', 760, 600, 70, '#7CF2A8', t - 181.9, { stroke: '#1F3A1F', life: 1.5 });
  }
  // 183.35 用不用得上无所谓：小鸡们在机柜里跳舞
  function f03(t) {
    CHO.amberBG(t, 'f03', { col: GOLD, col2: '#F6D59A' });
    CHO.rackScene(t, 'f03', { cols: 5, rows: 3, cw: 210, ch: 200, y: 440, dance: true, dust: i => .1, eyes: () => 'happy' });
    goldDust(t, 30, 'f03 gd');
  }
  // 185.50 凌晨两点不止我没睡：退到窗外，一扇扇窗亮起，每扇窗里都有人举着手机
  function personWin(i, cx, cy, ww, wh) { paint(ellPts(cx, cy + 4, ww * .16, wh * .3, 8), { wash: '#3A2E26', ink: null }); paint(rectPts(cx + ww * .12, cy - 4, ww * .1, wh * .3), { wash: '#CFE0FF', ink: null }); }
  function f04(t) {
    const k = seg(t, 185.5, 188.0);
    nightCity(t, 'f04', { lit: i => hash(i * 1.7) < k * .7 + .05 ? 1 : 0, win: personWin });
    PR.clock(960, 120, 70, '02:00', { key: 'f04 clk', col: '#7CF2A8' });
  }
  // 188.22 群里一声补货啦：未读角标往上跳
  function f05(t) {
    PR.nightBG('f05', { floor: false });
    const s = PR.phone(960, 470, 480, 880, { key: 'f05 ph', glow: .7, screen: '#EEF1F6' });
    PR.card(s.cx, s.y0 + 200, s.w - 30, 52, { key: 'f05 c2', pad: 6 }); shotImg('A02', s.cx, s.y0 + 200, s.w - 30);
    for (let i = 0; i < 3; i++) { const t0 = 188.4 + i * .4; if (t < t0) continue; const y = s.y0 + 330 + i * 130; PR.card(s.cx, y, s.w - 40, 80, { key: 'f05 n' + i, pad: 6 }); shotImg('A01', s.cx, y, s.w - 40, { scale: backOut(seg(t, t0, t0 + .25)) }); }
    const n = Math.min(98, Math.floor(Math.pow(seg(t, 188.3, 190.37), 1.6) * 98) + 1);
    PR2.badge(s.x0 + s.w - 10, s.y0 + 10, 44, String(n), { key: 'f05 bdg' });
    if (t > 188.3) big('补货啦！', 1500, 300, 90, '#FFD84A', t - 188.3, { stroke: '#B4462F', life: 1.2 });
  }
  // 190.37 九十九加 全是同类：角标炸开，所有窗户里的人一起举起手机
  function f06(t) {
    nightCity(t, 'f06', { lit: () => 1, win: personWin, glow: .5 });
    const k = backOut(seg(t, 190.4, 190.8));
    PR2.badge(960, 420, 150, '99+', { key: 'f06 bdg', scale: k * (1 + .06 * pulse(t)) });
    for (let i = 0; i < 10; i++) { const a = i / 10 * TAU, d = easeOut(seg(t, 190.4, 191.0)) * 360; paint(starPts(960 + Math.cos(a) * d, 420 + Math.sin(a) * d * .7, 22, .4, 4), { wash: '#FFD84A', ink: null }); }
  }
  // 192.77 我们一起吃灰：每扇窗里飞出一只小鸡，在夜空里汇成一片
  function f07(t) {
    const wins = nightCity(t, 'f07', { lit: () => 1, win: personWin, glow: .3 });
    for (let i = 0; i < 26; i++) {
      const [wx, wy] = wins[Math.floor(hash(i * 5.3) * wins.length)], t0 = 192.8 + hash(i) * .9, k = easeOut(seg(t, t0, t0 + 1.6));
      if (t < t0) continue;
      const tx = 200 + hash(i * 3) * 1520, ty = 90 + hash(i * 7) * 380;
      CK.chick(lerp(wx, tx, k), lerp(wy, ty, k), 26 + 12 * k, { key: 'f07 c' + i, flap: .5 + .5 * Math.sin(t * 25 + i), eyes: 'happy', glowA: .8 });
    }
    goldDust(t, 40, 'f07 gd');
  }
  // 195.08 探针上的节点一个都不掉队：小鸡变成探针上的绿点，面板往外扩成满屏灯火
  function f08(t) {
    boilSeed('f08 bg'); paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#0D1424', ink: null });
    const z = lerp(1, .32, ease(seg(t, 196.0, 203.5)));
    camBegin(960, 470, z);
    // 外圈：一片绿点
    for (let gx = -16; gx <= 16; gx++) for (let gy = -10; gy <= 10; gy++) {
      if (Math.abs(gx) <= 3 && Math.abs(gy) <= 3) continue;
      const i = (gx + 20) * 50 + gy + 20, on = t > 196 + hash(i) * 6;
      if (on) glow(960 + gx * 170 + (hash(i * 3) - .5) * 60, 470 + gy * 130 + (hash(i * 7) - .5) * 40, 50, '#59D98C', .8);
    }
    PR2.probe(960, 470, 5, 4, 220, 120, () => 1, { key: 'f08 pr', title: '探针 · 我们' });
    camEnd();
    goldDust(t, 30, 'f08 gd');
    flash(seg(t, 204.2, 204.73) * .7, '#0A0C18');
  }
  // 204.73 又补货了：手机叮一声
  function f09(t) {
    PR.nightBG('f09', { floor: false });
    const s = PR.phone(960, 470, 440, 860, { key: 'f09 ph', glow: .8, screen: '#3B2F6E' });
    ui('02:00', s.cx, s.y0 + 140, 100, '#FFFFFF', { font: `300 100px ${CN}` });
    const k = backOut(seg(t, 204.8, 205.1));
    PR.card(s.cx, s.y0 + 300, s.w - 40, 52, { key: 'f09 n', pad: 8 }); shotImg('A02', s.cx, s.y0 + 300, s.w - 40, { scale: k });
    big('叮！', 1350, 260, 100, '#FFD84A', t - 204.8, { life: 1 });
  }
  // 206.41 先买了再说：阿灰笑了，手指悬在 Order Now 上，停住
  function f10(t) {
    PR.nightBG('f10', { floor: false });
    glow(1300, 420, 600, '#6E8BFF', .4);
    PR.card(1300, 420, 800, 359, { key: 'f10 btn' });
    shotImg('A03', 1300, 420, 800);
    const k = ease(seg(t, 206.45, 207.4));
    PR.finger(1300 + (1 - k) * 500, 380 - (1 - k) * 260 - 30 + Math.sin(t * 3) * 4, 80, -.5, { key: 'f10 fg' });
    AH.bust(430, 1190, 170, { key: 'f10 ah', t, eyes: 'happy', mouth: 'smile', blush: .5, lensGlow: .7 });
    PR.dust(t, 20, 'f10 dust', { op: 90 });
  }
  // 208.00 片尾字卡（鸡汤）：压暗的探针绿点当夜空，一句一句淡入，最后跟音乐一起淡出
  const CARD_FONT = '"STZhongsong", "华文中宋", "Songti SC", serif', CREAM = '#F0EADE';
  const CARD = [
    [208.6, '机器可以吃灰，热爱不会。', 66, 340],
    [211.2, '愿你的小鸡永远在线，也愿你被人记得。', 56, 470],
    [213.8, '—— 献给每一位 MJJ 的歌', 40, 620],
  ];
  window.EXTRA_FONTS = (window.EXTRA_FONTS || []).concat([[`66px ${CARD_FONT}`, CARD.map(c => c[1]).join('') + '吃灰']]);
  function f11(t) {
    boilSeed('f11 bg'); paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#0B101E', ink: null });
    for (let gx = -6; gx <= 6; gx++) for (let gy = -3; gy <= 3; gy++) {
      const i = (gx + 10) * 20 + gy + 10, b = .25 + .2 * Math.sin(t * 1.3 + hash(i) * 6);
      glow(960 + gx * 160 + (hash(i * 3) - .5) * 70, 470 + gy * 150 + (hash(i * 7) - .5) * 50, 38, '#59D98C', b);
    }
    PR.dust(t, 30, 'f11 gd', { fall: 14, col: '#FFE3A0', op: 150, r: 4 });
    const out = 1 - ease(seg(t, 217.2, 218.35));
    // 底下一排小鸡，头顶的灯轮流闪
    for (let i = 0; i < 7; i++) {
      const k = ease(seg(t, 208.2 + i * .08, 208.8 + i * .08)) * out;
      if (k > .02) CK.chick(600 + i * 120, 930, 36, { key: 'f11 ck' + i, eyes: 'closed', light: k * (.55 + .45 * Math.sin(t * 2.4 + i * .9)), glowA: .7 * k, flap: .1 });
    }
    for (const [t0, txt, size, y] of CARD) {
      const a = ease(seg(t, t0, t0 + .7)) * out;
      if (a > .01) letter(txt, 960, y - 10 * (1 - a), size, CREAM, { font: `${size}px ${CARD_FONT}`, spacing: Math.round(size * .18), alpha: a, ink: false, shadow: 'rgba(0,0,0,.75)' });
    }
    const ta = ease(seg(t, 215.0, 215.8)) * out;
    if (ta > .01) letter('吃灰', 960, 790, 44, '#BFB6A6', { font: `44px ${CARD_FONT}`, spacing: 18, alpha: ta, ink: false, shadow: 'rgba(0,0,0,.75)' });
    // 从上一镜淡进来；最后整体压暗淡出（小鸡没有透明度，靠这层盖住）
    flash(1 - ease(seg(t, 208.0, 208.5)), '#0B101E');
    flash(ease(seg(t, 217.0, 218.3)), '#05070D');
  }

  shots([[178.56, f01], [180.80, f02], [183.35, f03], [185.50, f04], [188.22, f05], [190.37, f06], [192.77, f07], [195.08, f08], [204.73, f09], [206.41, f10], [208.00, f11]]);
})();
