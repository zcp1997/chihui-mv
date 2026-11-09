// r_rap.js：Rap（120.40 – 138.83），高饱和快切，截图卡片带震屏砸进来。
(() => {
  const POP = ['#1FB57E', '#FF5A5F', '#3D5AFE', '#FFB300', '#9B5DE5'];
  // 底色每半小节换一次，四周有速度线
  function popBG(t, key, o = {}) {
    const i = Math.floor(bpOf(t) / 2) + (o.shift || 0), col = o.col || POP[((i % POP.length) + POP.length) % POP.length];
    boilSeed(key + ' bg'); paint(rectPts(-200, -200, W + 400, H + 400), { wash: col, ink: null });
    for (let k = 0; k < 14; k++) { boilSeed(key + ' sp' + k); const a = k / 14 * TAU + hash(k), r0 = 700 + hash(k * 3) * 200; inkLine([[960 + Math.cos(a) * r0, 540 + Math.sin(a) * r0 * .6], [960 + Math.cos(a) * (r0 + 500), 540 + Math.sin(a) * (r0 + 500) * .6]], 1.2, '#FFFFFF', 'ink', 0); }
  }
  const slam = (t, t0) => t < t0 ? 0 : 1 + .25 * Math.exp(-(t - t0) * 14);   // 砸进来：先放大再落定
  const kick = (t, t0) => t > t0 && t < t0 + .14 ? shakeXY(t, 16) : [0, 0];

  // 120.40 NodeSeek 一刷就是一整天
  function k01(t) {
    popBG(t, 'k01', { col: '#1FB57E' });
    if (t < 120.95) { const sh = kick(t, 120.4); PR.card(960 + sh[0], 420 + sh[1], 1100, 217, { key: 'k01 logo' }); shotImg('A25', 960 + sh[0], 420 + sh[1], 1100, { scale: slam(t, 120.4) }); }
    else {
      const g = IMG.A26, k = (t - 120.95) / 1.2, visH = 520 * g.W0 / 900;
      PR.card(900, 450, 900, 520, { key: 'k01 list' });
      shotImg('A26', 900, 450, 900, { src: [0, clamp(k) * (g.H0 - visH), g.W0, visH], h: 520 });
    }
    // 太阳东升西落
    const sa = Math.PI + seg(t, 120.4, 122.15) * Math.PI, sx = 1640 + Math.cos(sa) * 180, sy = 330 + Math.sin(sa) * 180;
    paint(ellPts(sx, sy, 40, 40, 16), { wash: '#FFD84A', ink: PAL.ink, sw: .9 }); glow(sx, sy, 90, '#FFD84A', .6);
    inkLine([[1440, 330], [1840, 330]], 1.2, '#FFFFFF', 'ink', 0);
  }
  // 122.15 小鸡被墙 工单一刷就是一整晚
  function k02(t) {
    popBG(t, 'k02', { col: '#FF5A5F' });
    const sh = kick(t, 122.15);
    PR.card(560 + sh[0], 440 + sh[1], 600, 557, { key: 'k02 map' });
    const r = shotImg('A27', 560 + sh[0], 440 + sh[1], 600, { scale: slam(t, 122.15) });
    // 笼子里的小鸡
    CK.chick(560, 470, 70, { key: 'k02 ck', eyes: 'x', light: 0, flap: .1 });
    boilSeed('k02 cage'); for (let i = 0; i < 6; i++) inkLine([[480 + i * 32, 360], [480 + i * 32, 560]], 1.6, '#D2382B', 'ink', 0);
    paint(rrPts(470, 340, 180, 30, 10), { wash: '#D2382B', ink: PAL.ink, sw: .8 });
    if (t > 123.2) {
      const s2 = kick(t, 123.2), f5 = Math.floor((t - 123.2) / (BEAT / 2)) % 2 === 0;
      PR.card(1350 + s2[0], 330 + s2[1], 820, 258, { key: 'k02 tk' });
      shotImg('A28', 1350 + s2[0], 330 + s2[1], 820, { scale: slam(t, 123.2) });
      PR2.key(1350, 680, 80, 'F5', { key: 'k02 f5', down: f5 });
      boilSeed('k02 spin'); const a = t * 10; inkLine(Array.from({ length: 8 }, (_, i) => [1530 + Math.cos(a + i * .6) * 40, 680 + Math.sin(a + i * .6) * 40]), 1.4, '#FFFFFF', 'ink', .5);
    }
  }
  // 124.55 测评脚本跑完截图 等人喊真香
  function k03(t) {
    popBG(t, 'k03', { col: '#3D5AFE' });
    const sh = kick(t, 124.55);
    PR.card(960 + sh[0], 170 + sh[1], 1500, 187, { key: 'k03 tabs' });
    shotImg('A29', 960 + sh[0], 170 + sh[1], 1500, { scale: slam(t, 124.55) });
    if (t > 125.3) { PR.card(800, 600, 560, 430, { key: 'k03 re' }); shotImg('A30', 800, 600, 560, { scale: slam(t, 125.3) }); }
    // 弹幕「真香」
    for (let i = 0; i < 9; i++) { const t0 = 125.5 + i * (BEAT / 2); if (t > t0) big(i % 3 === 2 ? '已上车' : '真香！', 1250 + hash(i * 3) * 550, 380 + hash(i * 7) * 450, 54 + hash(i) * 30, i % 2 ? '#FFD84A' : '#FFFFFF', t - t0, { stroke: '#2B2233', life: 3, rot: (hash(i) - .5) * .3 }); }
  }
  // 126.94 商家跑路那天 比失恋还受伤
  function k04(t) {
    popBG(t, 'k04', { col: '#4A5A80' });
    for (let i = 0; i < 30; i++) { boilSeed('k04 rain' + i); const x = hash(i) * W, y = (hash(i * 3) * H + t * 900) % H; inkLine([[x, y], [x - 14, y + 50]], .7, '#BFD4F2', 'inkfine', 0); }
    const sh = kick(t, 126.94);
    PR.card(960 + sh[0], 170 + sh[1], 1200, 269, { key: 'k04 note' });
    shotImg('A31', 960 + sh[0], 170 + sh[1], 1200, { scale: slam(t, 126.94) });
    // 背包袱的小人头也不回地走远
    const wk = seg(t, 127.2, 129.4), mx = lerp(1300, 1800, wk), mb = Math.abs(Math.sin(t * 10)) * 8;
    boilSeed('k04 man'); paint(ellPts(mx, 760 - mb, 50, 70, 14), { wash: '#6B4A35', ink: PAL.ink, sw: .9 }); paint(ellPts(mx, 660 - mb, 34, 34, 12), { wash: '#6B4A35', ink: PAL.ink, sw: .9 });
    inkLine([[mx - 20, 700 - mb], [mx + 60, 620 - mb]], 1.6, '#3A2E26', 'ink', 0); paint(ellPts(mx + 70, 610 - mb, 34, 28, 12), { wash: '#C99A68', ink: PAL.ink, sw: .8 });
    AH.bust(520, 1200, 160, { key: 'k04 ah', t, eyes: 'squeeze', mouth: 'wavy', sweat: 1 });
    // 心碎成两半
    const br = easeOut(seg(t, 128.2, 128.6));
    for (const s of [-1, 1]) { boilSeed('k04 heart' + s); push(); translate(960 + s * br * 40, 560 + br * 20); rotate(s * br * .3); paint(s < 0 ? [[0, -40], [-30, -80], [-90, -60], [-90, 0], [0, 90], [-10, 30], [12, -10]] : [[0, -40], [30, -80], [90, -60], [90, 0], [0, 90], [-10, 30], [12, -10]], { wash: '#E0412F', ink: PAL.ink, sw: 1, curv: .4 }); pop(); }
  }
  // 129.50 黑五一到 信用卡跪着求我别再买
  function k05(t) {
    popBG(t, 'k05', { col: '#1A1A1A' });
    const sh = kick(t, 129.5);
    PR.card(960 + sh[0], 160 + sh[1], 1500, 141, { key: 'k05 bf' });
    shotImg('A32', 960 + sh[0], 160 + sh[1], 1500, { scale: slam(t, 129.5) });
    big('BLACK FRIDAY', 520, 360, 70, '#FFD84A', .3, { stroke: '#E0412F', life: 9, font: `900 70px "Permanent Marker"` });
    AH.body(1250, 900, 72, { key: 'k05 ah', t, eyes: 'star', mouth: 'grin', aL: .4, aR: 2.6 });
    const sob = Math.sin(t * 16) * .04;
    PR2.creditCard(1010, 820, 80, { key: 'k05 cc', rot: -.15 + sob, arms: true });
    PR2.bubble(700, 560, 360, 120, '别买了！', { key: 'k05 bub', scale: backOut(seg(t, 130.1, 130.4)), tail: [860, 690], fs: 54 });
  }
  // 131.89 传家宝 年付七刀 溢价十倍都决不卖
  function k06(t) {
    popBG(t, 'k06', { col: '#9B5DE5' });
    const sh = kick(t, 131.89);
    if (t < 132.8) { PR.card(1300 + sh[0], 260 + sh[1], 900, 113, { key: 'k06 b7' }); shotImg('A11', 1300 + sh[0], 260 + sh[1], 900, { scale: slam(t, 131.89) }); }
    else { PR.card(1350, 360, 640, 359, { key: 'k06 hz' }); shotImg('A33', 1350, 360, 640, { scale: slam(t, 132.8), rot: .03 }); }
    const shake = Math.sin(t * 18) * .12 * (t > 133.2 ? 1 : 0);
    AH.bust(400, 1200, 160, { key: 'k06 ah', t, eyes: 'squeeze', mouth: 'flat', tilt: shake });
    CK.chick(740, 830, 95, { key: 'k06 ck', eyes: 'happy', flap: .2 });
    PR2.crown(740, 830 - 95 * 1.62, 46, { key: 'k06 crown' });
    boilSeed('k06 arm'); paint(ribbon([[560, 1060], [660, 960], [700, 900]], 70, 56), { wash: AH.C.hood, ink: PAL.ink, sw: 1 });
    big('×10 也不卖', 1350, 760, 90, '#FFFFFF', t - 133.3, { stroke: '#2B2233', life: 2 });
  }
  // 134.28 你说我有病 买一堆用不上的机器
  function k07(t) {
    popBG(t, 'k07', { col: '#FF8A3D' });
    // 小鸡堆成山
    let i = 0; for (let row = 0; row < 5; row++) for (let c = 0; c <= 4 - row; c++, i++) CK.chick(1180 + c * 120 + row * 60, 860 - row * 105, 58, { key: 'k07 m' + i, eyes: hash(i) > .5 ? 'closed' : 'dot', dust: hash(i * 3) * .5, glowA: .3 });
    PR2.passer(380, 1000, 90, '#5A6FA8', { key: 'k07 p1', dir: 1 });
    PR2.passer(170, 1020, 80, '#6E9F58', { key: 'k07 p2', dir: 1, hair: '#7A5A44' });
    big('有病！', 480, 380, 110, '#FFFFFF', t - 134.5, { stroke: '#2B2233', life: 2 });
  }
  // 136.68 我说这叫 MJJ 的浪漫主义：墨镜，小鸡排成一颗心
  function k08(t) {
    popBG(t, 'k08', { col: '#E64980' });
    const n = 16, k = easeOut(seg(t, 136.7, 137.6));
    for (let i = 0; i < n; i++) { const [hx, hy] = PR2.heartPt(960, 430, 24, i / n), sx = 960 + Math.cos(i) * 1200, sy = 540 + Math.sin(i) * 900; CK.chick(lerp(sx, hx, k), lerp(sy, hy, k), 44, { key: 'k08 h' + i, eyes: 'happy', flap: .5 + .4 * Math.sin(t * 9 + i), glowA: .4 }); }
    AH.bust(960, 1000, 120, { key: 'k08 ah', t, eyes: 'open', mouth: 'smile', glasses: false, tilt: .06 });
    PR2.shades(960, 1000 - 120 * 2.05 + 120 * .08, 120);
    if (t > 137.4) letter('MJJ 的浪漫主义', 960, 80, 96, '#FFFFFF', { font: `900 96px ${CN}`, stroke: '#2B2233', pop: (t - 137.4) * 5 });
    flash(seg(t, 138.4, 138.83) * .7, '#D8CFB0');
  }

  shots([[120.40, k01], [122.15, k02], [124.55, k03], [126.94, k04], [129.50, k05], [131.89, k06], [134.28, k07], [136.68, k08]]);
})();
