// v1_pre.js：预副歌一（32.39 – 43.24），一问一答。暖色底，左边阿灰唱，右边截图，右下三只小鸡当伴唱团。
(() => {
  const WARM = '#F2A27E', WARM2 = '#F7C08E';

  function warmBG(t, key) {
    boilSeed(key + ' bg'); paint(rectPts(-60, -60, W + 120, H + 120), { wash: WARM, ink: null });
    boilSeed(key + ' bg2'); paint([[-60, -60], [W + 60, -60], [W + 60, 380], [-60, 520]], { wash: WARM2, washOp: 170, ink: null });
    for (let i = 0; i < 7; i++) { boilSeed(key + ' ray' + i); const a = -1.2 + i * .4 + Math.sin(t * .5) * .05; paint([[430, 760], [430 + Math.cos(a) * 1400, 760 + Math.sin(a) * 1400], [430 + Math.cos(a + .14) * 1400, 760 + Math.sin(a + .14) * 1400]], { wash: '#FFE1B8', washOp: 70, ink: null }); }
    PR.confetti(t, 26, key + ' conf');
  }
  // 阿灰在左边唱：嘴跟着拍子开合
  function singer(t, key, o = {}) {
    const open = .35 + .65 * pulse2(t, 5);
    AH.bust(400, 1190, 150, { key, t, eyes: o.eyes || 'happy', mouth: o.mouth || 'sing', open, blush: .6, bob: -pulse(t) * 10, tilt: Math.sin(bpOf(t) * Math.PI) * .05, sweat: o.sweat, look: o.look });
  }
  // 伴唱团：答句时间 call，三只一起跳起来张嘴
  function choir(t, key, call, o = {}) {
    const xs = o.xs || [1330, 1510, 1690];
    xs.forEach((x, i) => {
      const age = t - call, j = age > 0 && age < .6 ? jump(t, call + i * .04, call + .35 + i * .04, .9) : { dy: 0, sq: 0 };
      const shout = age > 0 && age < .9 ? 1 : .0;
      CK.chick(x, 850 + j.dy * 62, 62, { key: key + ' ck' + i, shout, sq: j.sq, eyes: o.eyes ? o.eyes(age) : (shout ? 'happy' : 'dot'), flap: o.flap ? o.flap(age) : (shout ? 1 : .15 + .15 * pulse(t + i * .1)), look: -1 });
    });
  }

  // 32.39 这个价 不买就是亏（就是亏）
  function p01(t, lt) {
    warmBG(t, 'p01');
    const a = backOut(seg(t, 32.45, 32.8));
    PR.card(1300, 300, 880, 306, { key: 'p01 c10' });
    const r = shotImg('A10', 1300, 300, 880, { scale: a });
    if (r && t > 32.85) { const [cx, cy] = onShot(r, 425, 46); boilSeed('p01 ring'); inkLine(ellPts(cx, cy, 82 * (1 + .06 * pulse(t)), 26, 26, 0, -.05).slice(0, Math.round(26 * ease(seg(t, 32.85, 33.15))) + 1), 1.6, '#E0412F', 'ink', .5); }
    const b = backOut(seg(t, 33.1, 33.4));
    if (t > 33.1) { PR.card(1270, 560, 900, 113, { key: 'p01 c7', pad: 10 }); const r2 = shotImg('A11', 1270, 560, 900, { scale: b, rot: .02 }); if (r2 && t > 33.4) { const [cx, cy] = onShot(r2, 525, 110); boilSeed('p01 ring2'); inkLine(ellPts(cx, cy, 64, 24, 24), 1.6, '#E0412F', 'ink', .5); } }
    singer(t, 'p01 ah');
    choir(t, 'p01', 33.67);
    big('就是亏！', 1510, 720, 96, '#FFD84A', t - 33.67, { stroke: '#B4462F', life: .8 });
  }

  // 34.47 再观望一下 就没了（就没了）：先犹豫，一刷新变成 0
  function p02(t, lt) {
    warmBG(t, 'p02');
    const gone = t > 35.35, sh = t > 35.35 && t < 35.6 ? shakeXY(t, 12) : [0, 0];
    PR.card(1300 + sh[0], 380 + sh[1], 800, 355, { key: 'p02 card' });
    shotImg(gone ? 'A12' : 'A03', 1300 + sh[0], 380 + sh[1], 800);
    if (!gone) { // 观望中：转圈 + 小沙漏
      boilSeed('p02 dots'); for (let i = 0; i < 3; i++) if (frac(t * 2) * 3 > i) paint(ellPts(1660 + i * 26, 130, 8, 8, 8), { wash: '#B4462F', ink: null });
      ui('观望中', 1560, 130, 40, '#B4462F');
    } else PR.stamp('售罄', 1520, 300, 64, t - 35.35, { key: 'p02 st', rot: .12 });
    singer(t, 'p02 ah', { eyes: gone ? 'blank' : 'open', mouth: gone ? 'o' : 'wavy', look: gone ? 0 : 1, sweat: gone ? 1 : 0 });
    // 就没了：小鸡们一起摊手
    choir(t, 'p02', 36.22, { eyes: age => age > 0 ? 'closed' : 'dot', flap: age => age > 0 ? 1.4 : .15 });
    big('就没了！', 1510, 720, 96, '#FFFFFF', t - 36.22, { stroke: '#4F6A98', life: .9 });
  }

  // 37.18 先买了 以后再说：一拍桌子，小鸡一只只掉进购物车
  function p03(t, lt) {
    warmBG(t, 'p03');
    const hits = [37.18, 37.86, 38.55, 39.23];
    const hitK = hits.reduce((s, h) => s + (t > h && t < h + .12 ? 1 : 0), 0);
    PR.card(1290, 210, 520, 233, { key: 'p03 btn' });
    shotImg('A03', 1290, 210, 520, { scale: hitK ? .95 : 1 });
    PR.cart(1300, 870, 120, { key: 'p03 cart' });
    hits.slice(0, 3).forEach((h, i) => {
      if (t < h + .05) return;
      const k = easeIn(seg(t, h + .05, h + .45)), x = 1180 + i * 120, y = lerp(-100, 720 - (i % 2) * 20, k);
      CK.chick(x, y, 58, { key: 'p03 ck' + i, eyes: k < 1 ? 'wide' : 'happy', flap: k < 1 ? 1 : .2, sq: k >= 1 ? .2 * spring(t, h + .45, 8, 22) : 0 });
    });
    PR.cart(1300, 870, 120, { key: 'p03 cartF' });
    const slam = ring(t, hits, 9, 30);
    AH.bust(400, 1190 + slam * 14, 150, { key: 'p03 ah', t, eyes: 'squeeze', mouth: 'grin', blush: .5 });
    if (hitK) flash(.15, '#FFFFFF');
    big('买！', 820, 380, 120, '#FFFFFF', t - 37.18, { stroke: '#B4462F', life: .7 });
  }

  // 39.57 反正也就一顿饭的钱（一顿饭钱~）：天平左边猪脚饭、右边小鸡，晃两下刚好持平
  function p04(t, lt) {
    warmBG(t, 'p04');
    const tilt = t < 40.0 ? lerp(-.0, .32, ease(seg(t, 39.57, 39.95))) : .32 * Math.exp(-(t - 40.0) * 2.2) * Math.cos((t - 40.0) * 7);
    PR.balance(960, 250, 78, tilt,
      (x, y) => { shotImg('A13', x, y - 150, 290, { rot: -.03 }); },
      (x, y) => { CK.chick(x, y - 92, 84, { key: 'p04 ck', eyes: t > 41.2 ? 'happy' : 'dot', flap: .2 + .2 * pulse(t) }); },
      { key: 'p04 bal' });
    if (t > 41.0) { const k = backOut(seg(t, 41.0, 41.3)); ui('=', 960, 120, 130 * k, '#FFFFFF'); ui('一顿饭', 617, 580, 56, '#7A3B22'); ui('一年', 1303, 580, 56, '#7A3B22'); }
    if (t > 41.9) big('一顿饭钱~', 1560, 300, 80, '#FFD84A', t - 41.9, { stroke: '#B4462F', life: 1.4, rot: .06 });
    // 副歌前：灰从上面落下来，画面暗下去
    const dk = seg(t, 42.5, 43.24);
    PR.dust(t, Math.round(60 * dk), 'p04 dust', { fall: 220, col: '#9C968E', op: 230, r: 6 });
    flash(dk * .55, '#3A3348');
  }

  window.PRE = { warmBG, singer, choir };
  shots([[32.39, p01], [34.47, p02], [37.18, p03], [39.57, p04]]);
})();
