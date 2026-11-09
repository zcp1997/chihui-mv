// v3_verse.js：主歌三（159.10 – 178.56），冷紫城市 + 机房蓝，近乎念白。阿灰在这一段变成一只戴眼镜的灰色小鸡。
(() => {
  const PURPLE = '#2A2348', PURPLE2 = '#3A3160';
  function purpleBG(key) { boilSeed(key + ' bg'); paint(rectPts(-1200, -800, W + 2400, H + 1600), { wash: PURPLE, ink: null }); }
  // 小鸡版阿灰：灰色、戴眼镜、头顶的灯偏暗
  function ahChick(x, y, r, o = {}) {
    CK.chick(x, y, r, { key: o.key || 'ahck', dust: .85, eyes: o.eyes || 'dot', light: o.light ?? .7, flap: o.flap ?? .1, sq: o.sq || 0, glowA: o.glowA ?? .6 });
    AH.glasses(x, y - r * .22, r * .82, { key: (o.key || 'ahck') + ' gl', sw: clamp(r / 90, .4, 1) });
  }
  window.ahChick = ahChick;

  // 159.10 有时候我觉得：天桥上，背后是城市夜景
  function w01(t) {
    purpleBG('w01');
    PR2.city('w01 city', { col: '#211C3C', lit: i => hash(i * 2.1) > .8 ? 1 : 0, winCol: '#B9A7F2', base: 900, n: 10, step: 205, bh: 600 });
    boilSeed('w01 rail'); paint([[-60, 860], [W + 60, 850], [W + 60, H + 60], [-60, H + 60]], { wash: '#1A1630', ink: null });
    inkLine([[-60, 760], [W + 60, 752]], 2, '#6C6390', 'ink', 0); for (let i = 0; i < 20; i++) inkLine([[i * 100, 760], [i * 100, 860]], 1, '#6C6390', 'inkfine', 0);
    AH.body(960, 900, 62, { key: 'w01 ah', t, eyes: 'open', mouth: 'flat', aL: .15, aR: .15, look: .5 });
    glow(1500, 160, 120, '#E9E2FF', .6); paint(ellPts(1500, 160, 50, 50, 16), { wash: '#F2EEFF', ink: null });
  }
  // 161.41 我也是这城市机房里的一台小鸡：拉远后，写字楼的每扇窗都是一格机柜
  const COLS = 10, ROWS = 6, CW = 190, CH = 160, BX = 960 - COLS * CW / 2, BY = 540 - ROWS * CH / 2 - 40, AHI = 3 * COLS + 6;
  function w02(t) {
    purpleBG('w02');
    const k = ease(seg(t, 161.5, 164.0)), ax = BX + 6 * CW + CW / 2, ay = BY + 3 * CH + CH / 2;
    camBegin(lerp(ax, 960, k), lerp(ay, 500, k), lerp(3.6, 1, k));
    boilSeed('w02 bld'); paint(rectPts(BX - 40, BY - 40, COLS * CW + 80, ROWS * CH + 400), { wash: '#1F1A38', ink: PAL.ink, sw: 1 });
    for (let i = 0; i < COLS * ROWS; i++) {
      const cx = BX + (i % COLS) * CW + CW / 2, cy = BY + Math.floor(i / COLS) * CH + CH / 2;
      boilSeed('w02 win' + i); paint(rectPts(cx - CW / 2 + 12, cy - CH / 2 + 12, CW - 24, CH - 24), { wash: '#141127', ink: '#4A4270', sw: .5 });
      if (i === AHI) ahChick(cx, cy + 10, 44, { key: 'w02 me' });
      else CK.chick(cx, cy + 10, 40, { key: 'w02 c' + i, eyes: hash(i) > .5 ? 'closed' : 'dot', dust: .2 + hash(i * 3) * .4, glowA: .4 });
    }
    camEnd();
  }
  // 164.44 一核一G 年付很便宜：配置卡挂在胸前当工牌
  function w03(t) {
    purpleBG('w03');
    boilSeed('w03 slot'); paint(rrPts(520, 60, 880, 820, 20), { wash: '#1F1A38', ink: PAL.ink, sw: 1.2 });
    ahChick(960, 420, 200, { key: 'w03 me' });
    boilSeed('w03 lan'); inkLine([[860, 330], [760, 640]], 1.2, '#E0412F', 'ink', .3); inkLine([[1060, 330], [1160, 640]], 1.2, '#E0412F', 'ink', .3);
    PR.card(960, 700, 560, 119, { key: 'w03 card', pad: 10 });
    shotImg('A35', 960, 700, 560, { rot: Math.sin(t * 1.5) * .03 });
  }
  // 167.15 每天准时在线：早高峰地铁，一车厢头顶绿灯的小鸡人
  function w04(t) {
    purpleBG('w04');
    boilSeed('w04 car'); paint(rectPts(-60, 80, W + 120, 800), { wash: '#C9C3D9', ink: PAL.ink, sw: 1 });
    for (let i = 0; i < 5; i++) { boilSeed('w04 win' + i); const x = 60 + i * 380; paint(rrPts(x, 140, 300, 220, 20), { wash: '#2A2348', ink: PAL.ink, sw: .9 }); const lx = x + ((t * 900 + i * 137) % 300); inkLine([[lx, 170], [lx - 40, 330]], 2, '#FFE9A8', 'ink', 0); }
    inkLine([[-60, 420], [W + 60, 420]], 2, '#8C86A0', 'ink', 0);
    for (let i = 0; i < 14; i++) { boilSeed('w04 strap' + i); inkLine([[80 + i * 135, 420], [80 + i * 135, 480]], .8, '#8C86A0', 'inkfine', 0); paint(ellPts(80 + i * 135, 492, 14, 14, 8), { ink: '#8C86A0', sw: .8 }); }
    const sway = Math.sin(t * 3) * 10;
    for (let row = 0; row < 2; row++) for (let i = 0; i < 9; i++) {
      const x = 110 + i * 215 + row * 100 + sway, y = 640 + row * 150;
      if (row === 1 && i === 4) ahChick(x, y, 72, { key: 'w04 me' });
      else CK.chick(x, y, row ? 72 : 62, { key: 'w04 c' + row + i, eyes: hash(i + row * 9) > .4 ? 'closed' : 'dot', dust: .35, glowA: .5, rot: Math.sin(t * 3 + i) * .04 });
    }
  }
  // 169.39 跑着别人的程序：工位上敲键盘，进度条上写着别人的名字
  function w05(t) {
    purpleBG('w05');
    const s = PR.monitor(1180, 400, 900, 540, { key: 'w05 mon', glow: .4, screen: '#1A2238' });
    ui('别人的项目_v7.exe', s.cx, s.y0 + 120, 48, '#C9D6FF');
    const p = seg(t, 169.5, 172.3);
    boilSeed('w05 bar'); paint(rrPts(s.x0 + 80, s.cy, s.w - 160, 50, 25), { ink: '#C9D6FF', sw: 1 });
    paint(rrPts(s.x0 + 86, s.cy + 6, (s.w - 172) * p + 1, 38, 19), { wash: '#59D98C', ink: null });
    ui(Math.round(p * 100) + '%', s.cx, s.cy + 110, 44, '#C9D6FF');
    boilSeed('w05 desk'); paint([[-60, 820], [W + 60, 810], [W + 60, H + 60], [-60, H + 60]], { wash: '#3A3160', ink: PAL.ink, sw: .8 });
    ahChick(480, 680, 140, { key: 'w05 me', flap: .5 + .5 * Math.abs(Math.sin(t * 16)) });
    boilSeed('w05 kb'); paint(rrPts(560, 790, 420, 70, 14), { wash: '#26223A', ink: PAL.ink, sw: .9 });
  }
  // 172.42 没人记得我的 IP：标签淡掉，绿灯变暗；尾声处手机在黑暗里亮起
  function w06(t) {
    purpleBG('w06');
    const dim = ease(seg(t, 173.0, 176.5));
    boilSeed('w06 slot'); paint(rrPts(560, 100, 800, 780, 20), { wash: '#1F1A38', ink: PAL.ink, sw: 1.2 });
    ahChick(960, 500, 190, { key: 'w06 me', light: 1 - dim * .85, eyes: t > 175.5 ? 'closed' : 'dot' });
    if (dim < .98) { boilSeed('w06 tag'); paint(rrPts(1300, 300, 460, 100, 16), { wash: '#FFFDF6', washOp: 255 * (1 - dim), ink: null }); ui('IP: ***.***.*.*', 1530, 350, 44, '#2B2233', { alpha: 1 - dim, font: `700 44px ${PR2.MONO}` }); }
    const ph = seg(t, 177.2, 178.4);
    if (ph > 0) glow(960, 1000, 700 * ph, '#FFE1A8', ph);
    flash(seg(t, 178.2, 178.56) * .8, '#FFE9C4');
  }

  shots([[159.10, w01], [161.41, w02], [164.44, w03], [167.15, w04], [169.39, w05], [172.42, w06]]);
})();
