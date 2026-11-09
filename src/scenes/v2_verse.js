// v2_verse.js：主歌二（71.49 – 90.24），卧室暗调 + 终端绿。
(() => {
  function termBG(t, key) {
    boilSeed(key + ' bg'); paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#11191B', ink: null });
    glow(960, 470, 900, '#3FBF7F', .18);
    for (let i = 0; i < 12; i++) { boilSeed(key + ' ln' + i); const y = 40 + i * 90, w = 200 + hash(i * 7) * 600, x = hash(i) * (W - w); inkLine([[x, y], [x + w, y]], .6, '#1F3A30', 'inkfine', 0); }
  }
  function cursor(x, y, s = 1) {
    boilSeed('cursor ' + Math.round(x / 50));
    paint([[x, y], [x, y + 46 * s], [x + 12 * s, y + 35 * s], [x + 22 * s, y + 56 * s], [x + 30 * s, y + 52 * s], [x + 20 * s, y + 32 * s], [x + 36 * s, y + 32 * s]], { wash: '#FFFFFF', ink: PAL.ink, sw: .8 });
  }
  // 发行版帽子：Debian 红漩涡 / Ubuntu 橙圆圈
  function hat(x, y, r, kind) {
    boilSeed('hat ' + kind);
    const col = kind === 'deb' ? '#C70036' : '#E95420';
    paint([[x - r * .75, y], [x - r * .6, y - r * .55], [x, y - r * .8], [x + r * .6, y - r * .55], [x + r * .75, y]], { wash: col, ink: PAL.ink, sw: .8, curv: .5 });
    paint(rrPts(x - r * .82, y - r * .1, r * 1.64, r * .22, r * .1), { wash: mixCol(col, '#FFFFFF', .3), ink: PAL.ink, sw: .6 });
    if (kind === 'deb') { const sp = []; for (let i = 0; i < 18; i++) { const a = i * .55, rr = r * .04 + i * r * .012; sp.push([x + Math.cos(a) * rr, y - r * .4 + Math.sin(a) * rr]); } inkLine(sp, .9, '#FFFFFF', 'inkfine', .5); }
    else { paint(ellPts(x, y - r * .4, r * .2, r * .2, 12), { ink: '#FFFFFF', sw: .9 }); for (let i = 0; i < 3; i++) { const a = i / 3 * TAU - Math.PI / 2; paint(ellPts(x + Math.cos(a) * r * .24, y - r * .4 + Math.sin(a) * r * .24, r * .06, r * .06, 6), { wash: '#FFFFFF', ink: null }); } }
  }

  // 71.49 系统重装了十八遍：确认弹窗一张张叠成一摞，计数跳到 18
  function v01(t) {
    termBG(t, 'v01');
    const n = Math.min(18, 1 + Math.floor((t - 71.49) / .095));
    let r;
    for (let i = 0; i < n; i++) {
      const x = 760 + i * 14, y = 330 + i * 18;
      PR.card(x, y, 950, 205, { key: 'v01 c' + i, pad: 8 });
      r = shotImg('A19', x, y, 950);
    }
    const [bx, by] = onShot(r, 318, 55);
    cursor(bx + 10, by + 6 + (frac((t - 71.49) / .095) < .4 ? 6 : 0));
    ui(`第 ${n} 遍`, 1640, 200, 72, '#7CF2A8');
    big('×' + n, 1640, 330, 110, '#FFFFFF', .5, { stroke: '#1F6B45', life: 9 });
    AH.bust(1640, 1210, 120, { key: 'v01 ah', t, eyes: 'squeeze', mouth: 'grin', lensGlow: .8 });
  }
  // 73.32 Debian 换 Ubuntu 又换回 Debian
  function v02(t) {
    termBG(t, 'v02');
    const step = t < 74.28 ? 0 : t < 75.24 ? 1 : 2, kind = step === 1 ? 'ub' : 'deb', t0 = [73.32, 74.28, 75.24][step];
    const sh = t - t0 < .15 ? shakeXY(t, 14) : [0, 0];
    PR.card(960 + sh[0], 300 + sh[1], 1500, 265, { key: 'v02 card', pad: 12 });
    shotImg(step === 1 ? 'A18' : 'A17', 960 + sh[0], 300 + sh[1], 1500, { src: step === 1 ? [1670, 120, 1700, 300] : [0, 120, 1700, 300] });
    const j = take(t, t0, .6);
    CK.chick(960, 710 + j.dy * 30, 110, { key: 'v02 ck', eyes: 'wide', flap: .4, sq: j.sq, light: 1 });
    hat(960, 710 + j.dy * 30 - 92 * (1 - j.sq), 110, kind);
    big(kind === 'deb' ? 'Debian！' : 'Ubuntu！', 1450, 680, 80, kind === 'deb' ? '#FF6B8A' : '#FF9A5A', t - t0, { stroke: '#FFFFFF', life: .9 });
  }
  // 76.20 建了个博客 只有一篇
  function v03(t) {
    termBG(t, 'v03');
    const s = PR.monitor(860, 440, 1180, 700, { key: 'v03 mon', glow: .35, screen: '#1D1D24' });
    shotImg('A20', s.cx, s.cy, s.w, { src: [0, 0, 1640, 1640 * s.h / s.w], h: s.h });
    PR2.sticky(1650, 330, 140, '共 1 篇', { key: 'v03 stk', rot: .08, scale: backOut(seg(t, 76.7, 77.0)) });
  }
  // 78.11 Hello World 是开头也是完结篇
  function v04(t) {
    termBG(t, 'v04');
    const z = lerp(1, 1.08, ease(seg(t, 78.11, 80.75)));
    PR.card(960, 440, 1400, 717, { key: 'v04 card', pad: 14 });
    shotImg('A20', 960, 440, 1400 * z, { src: [0, 0, 820, 420], h: 717 * z });
    PR.stamp('全剧终', 1300, 560, 90, t - 79.2, { key: 'v04 st', rot: -.15 });
  }
  // 80.75 搭了个网盘 存着三张表情包
  function v05(t) {
    termBG(t, 'v05');
    PR.card(960, 360, 1500, 288, { key: 'v05 card' });
    const r = shotImg('A21', 960, 360, 1500);
    [95, 145, 195].forEach((py, i) => { if (t > 81.1 + i * .35) { const [, y] = onShot(r, 0, py); boilSeed('v05 hl' + i); paint(rrPts(r.x0 + 6, y - 28, r.w - 12, 56, 8), { ink: '#E0412F', sw: 1.2 }); big(String(i + 1), r.x0 - 40, y, 60, '#FFD84A', t - 81.1 - i * .35, { life: 5 }); } });
    // 容量条
    boilSeed('v05 bar'); paint(rrPts(260, 700, 1400, 54, 27), { wash: '#2A3533', ink: PAL.ink, sw: .9 });
    paint(rrPts(266, 706, 14, 42, 7), { wash: '#59D98C', ink: null });
    ui('已用 76.7 KB / 1 TB', 960, 800, 52, '#C9F2D8');
  }
  // 83.14 测了一整晚 晚高峰的延迟曲线
  function v06(t) {
    termBG(t, 'v06');
    shotImg('A24', 960, 540, 2100, { alpha: .22 });
    const k = ease(seg(t, 83.3, 85.6));
    PR.card(1020, 610, 1500, 708, { key: 'v06 curve' });
    shotImg('A23', 1020, 610, 1500, { src: [lerp(0, 689, k), 0, 900, 425], h: 708 });
    PR.card(470, 190, 760, 175, { key: 'v06 lat', pad: 10 });
    shotImg('A22', 470, 190, 760);
    const hh = 20 + Math.min(3, Math.floor((t - 83.14) / .6));
    PR.clock(1650, 140, 60, `${hh}:00`, { key: 'v06 clk', col: '#7CF2A8' });
  }
  // 85.85 测完很满意
  function v07(t) {
    termBG(t, 'v07');
    AH.bust(960, 1220, 210, { key: 'v07 ah', t, eyes: 'happy', mouth: 'smile', blush: .7, tilt: Math.sin((t - 85.85) * 9) * .08, lensGlow: .6 });
    big('满意～', 1400, 300, 100, '#7CF2A8', t - 86.0, { stroke: '#11191B', life: 1.2 });
  }
  // 87.13 关掉终端
  function v08(t) {
    termBG(t, 'v08');
    const sc = 1 - easeIn(seg(t, 87.9, 88.25));
    const lines = [['root@chick-07:~# exit', '#C9F2D8'], ['logout', '#9AA59F'], ['Connection to chick-07 closed.', '#C9F2D8']];
    const w = PR2.term(960, 450, 1200, 520, lines.slice(0, 1 + Math.min(2, Math.floor((t - 87.13) / .25))), { key: 'v08 term', scale: sc, cursor: true, glow: .4, title: 'chick-07' });
    if (w && t < 87.9) cursor(w.x0 + 28 + (87.9 - t) * 300, w.y0 + 14);
    if (t > 87.82 && t < 87.95) flash(.2, '#FFFFFF');
  }
  // 88.32 从此再没见面：那一格里的小鸡灯还亮着，灰一层层盖满；字幕 397 天后
  function v09(t) {
    termBG(t, 'v09');
    const d = ease(seg(t, 88.4, 89.9));
    boilSeed('v09 slot'); paint(rrPts(560, 140, 800, 680, 20), { wash: '#2E3140', ink: PAL.ink, sw: 1.2 });
    paint(rectPts(600, 180, 720, 600), { wash: '#1B1D27', ink: '#4A4E60', sw: .6 });
    CK.chick(960, 520, 190, { key: 'v09 ck', dust: d, eyes: 'closed', light: 1 - d * .4, flap: .05 });
    PR.dust(t, 50, 'v09 dust', { x0: 600, x1: 1320, y0: 180, y1: 780, fall: 50, col: '#B9B2A8', op: 220, r: 5 });
    if (t > 89.0) { const k = backOut(seg(t, 89.0, 89.3)); ui('397 天后', 1620, 260, 80 * k, '#E9E2D2'); PR.card(1620, 420, 420, 128, { key: 'v09 tag', pad: 8 }); shotImg('A16', 1620, 420, 420, { src: [40, 790, 322, 98], scale: k }); }
    flash(seg(t, 90.0, 90.24) * .6, '#C9C2B6');
  }

  shots([[71.49, v01], [73.32, v02], [76.20, v03], [78.11, v04], [80.75, v05], [83.14, v06], [85.85, v07], [87.13, v08], [88.32, v09]]);
})();
