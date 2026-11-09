// b_bridge.js：Bridge（138.83 – 159.10），白天灰黄 → 深夜 SSH 绿。
(() => {
  const OFFICE = '#D8CFB0';
  function officeBG(t, key, o = {}) {
    boilSeed(key + ' bg'); paint(rectPts(-200, -200, W + 400, H + 400), { wash: o.col || OFFICE, ink: null });
    boilSeed(key + ' win'); for (let i = 0; i < 4; i++) paint(rectPts(80 + i * 460, 60, 380, 300), { wash: '#E9E3CC', ink: '#B9AE8E', sw: .6 });
    boilSeed(key + ' desk'); paint([[-60, 820], [W + 60, 800], [W + 60, H + 60], [-60, H + 60]], { wash: '#B9A782', ink: PAL.ink, sw: .8 });
  }
  // 138.83 白天我改别人的需求 背别人的锅
  function b01(t) {
    officeBG(t, 'b01');
    const s = PR.monitor(560, 470, 700, 430, { key: 'b01 mon', screen: '#EDEFF3' });
    for (let i = 0; i < 6; i++) { boilSeed('b01 ln' + i); inkLine([[s.x0 + 40, s.y0 + 50 + i * 50], [s.x0 + 40 + 200 + hash(i) * 300, s.y0 + 50 + i * 50]], .8, '#9AA0AC', 'inkfine', 0); }
    PR2.sticky(400, 360, 90, '需求变更 v7', { key: 'b01 s1', rot: -.08, scale: backOut(seg(t, 139.2, 139.45)) });
    PR2.sticky(700, 420, 90, 'v8', { key: 'b01 s2', rot: .1, scale: backOut(seg(t, 140.4, 140.65)) });
    PR2.sticky(560, 560, 90, '紧急！', { key: 'b01 s3', rot: -.04, col: '#FF9E8A', scale: backOut(seg(t, 141.0, 141.25)) });
    // 老板的手：西装袖子从右上伸进来
    const reach = kf(t, [[138.83, 0], [139.2, 1], [139.6, 0], [140.4, 1], [140.8, 0], [141.0, 1], [141.5, .3]], easeOut);
    boilSeed('b01 boss'); paint(ribbon([[2100, -100], [lerp(1900, 900, reach), lerp(0, 330, reach)]], 130, 110), { wash: '#2F3442', ink: PAL.ink, sw: 1 });
    paint(ellPts(lerp(1900, 860, reach), lerp(0, 350, reach), 50, 44, 12), { wash: AH.C.skin, ink: PAL.ink, sw: .9 });
    // 阿灰背着一口大黑锅
    PR2.wok(1430, 790, 150, { key: 'b01 wok', rot: -.2 });
    AH.bust(1350, 1230, 150, { key: 'b01 ah', t, eyes: 'open', mouth: 'flat', look: -1, bags: true });
    big('锅', 1640, 640, 90, '#FFFFFF', .3, { stroke: '#2B2233', life: 9 });
  }
  // 141.54 房租 KPI 还有家里催婚的电话
  function b02(t, key = 'b02', squash = 0) {
    officeBG(t, key, { col: mixCol(OFFICE, '#8C8C8C', squash) });
    const k1 = backOut(seg(t, 141.6, 141.9)), k2 = backOut(seg(t, 142.3, 142.6)), k3 = backOut(seg(t, 143.0, 143.3));
    const dy = squash * 250;
    AH.bust(960, 1230 + dy * .6, 150 * (1 - squash * .25), { key: key + ' ah', t, eyes: squash > .3 ? 'squeeze' : 'open', mouth: 'wavy', sweat: 1 });
    PR2.popup(520, 260 + dy, 620, 260, '房租提醒', ['¥4,500', '明天到期'], { key: key + ' p1', scale: k1, bar: '#FFD6CC' });
    const p2 = PR2.popup(1400, 300 + dy, 620, 300, 'KPI 季度考核', [''], { key: key + ' p2', scale: k2, bar: '#E3E8F7' });
    if (p2 && k2 > .5) { boilSeed(key + ' kpi'); inkLine([[p2.x0 + 80, p2.y0 + 120], [p2.x0 + 240, p2.y0 + 160], [p2.x0 + 360, p2.y0 + 150], [p2.x0 + 540, p2.y0 + 260]], 2.4, '#E0412F', 'ink', .3); inkLine([[p2.x0 + 540, p2.y0 + 260], [p2.x0 + 500, p2.y0 + 250]], 2.4, '#E0412F', 'ink', 0); inkLine([[p2.x0 + 540, p2.y0 + 260], [p2.x0 + 535, p2.y0 + 220]], 2.4, '#E0412F', 'ink', 0); }
    const buzz = t > 143.0 ? Math.sin(t * 80) * 6 : 0;
    PR2.popup(960 + buzz, 540 + dy, 560, 340, '来电', ['妈', '（第 3 次）'], { key: key + ' p3', scale: k3, bar: '#D4F2DE', buttons: [['挂断', '#E0412F'], ['接听', '#2EC46A']] });
  }
  // 143.94 没有一样我说了算：弹窗压下来，画面只剩灰色，然后灯全灭
  function b03(t) {
    b02(t, 'b03', ease(seg(t, 143.94, 145.4)));
    big('没有一样我说了算', 960, 120, 70, '#FFFFFF', .3, { stroke: '#2B2233', life: 9, alpha: 1 - seg(t, 145.5, 145.8) });
    flash(seg(t, 145.6, 146.0), '#05060A');
  }
  // 146.01 只有深夜连上 SSH 的那一秒
  function b04(t) {
    boilSeed('b04 bg'); paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#05070A', ink: null });
    const typed = seg(t, 146.1, 147.5), ent = t > 147.9;
    const lines = [['$ ssh root@chick-01', '#C9F2D8']];
    if (ent) lines.push(['Welcome to Debian GNU/Linux 12', '#9AA59F'], ['Last login: 02:00 from home', '#9AA59F']);
    if (t > 148.4) lines.push(['root@chick-01:~# ', '#7CF2A8']);
    PR2.term(1100, 400, 1300, 520, lines, { key: 'b04 term', typed: ent ? null : typed, cursor: true, glow: ent ? .8 : .3, title: 'chick-01' });
    if (ent && t < 148.05) flash(.25, '#7CF2A8');
    AH.bust(330, 1210, 140, { key: 'b04 ah', t, eyes: ent ? 'wide' : 'open', mouth: ent ? 'smile' : 'flat', lensGlow: ent ? 1 : .4 });
    glow(330, 900, 300, '#59D98C', ent ? .6 : .2);
    PR2.key(1600, 830, 60, 'Enter', { key: 'b04 ent', down: t > 147.85 && t < 148.0, col: '#CFF5DC' });
  }
  // 148.80 在这二十台小鸡上
  function b05(t) {
    boilSeed('b05 bg'); paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#0A1210', ink: null });
    PR2.probe(960, 440, 5, 4, 330, 170, i => t > 148.85 + i * .05 ? 1 : 0, { key: 'b05 pr' });
  }
  // 150.00 我是 root：大字提示符，纸王冠，小鸡们敬礼
  function b06(t) {
    boilSeed('b06 bg'); paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#0A1210', ink: null });
    glow(960, 400, 800, '#59D98C', .35);
    letter('root@~#', 960, 190, 150, '#7CF2A8', { font: `700 150px ${PR2.MONO}`, pop: (t - 150.0) * 5, ink: false });
    for (let i = 0; i < 6; i++) { const side = i < 3 ? -1 : 1, k = i % 3; CK.chick(960 + side * (330 + k * 170), 700 - k * 30, 70, { key: 'b06 ck' + i, eyes: 'happy', flap: side < 0 ? .1 : .1, look: -side }); boilSeed('b06 sal' + i); inkLine([[960 + side * (330 + k * 170) - side * 60, 690 - k * 30], [960 + side * (330 + k * 170) - side * 40, 610 - k * 30]], 2.2, CK.C.chickDk, 'ink', 0); }
    AH.bust(960, 1200, 150, { key: 'b06 ah', t, eyes: 'happy', mouth: 'grin', blush: .6, lensGlow: .8 });
    PR2.crown(960, 1200 - 150 * 3.05, 70, { key: 'b06 crown' });
  }
  // 151.52 要是人生也能一键重装就好了
  function b07(t) {
    boilSeed('b07 bg'); paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#141A24', ink: null });
    const real = t < 152.4;
    if (real) { PR.card(960, 400, 950, 205, { key: 'b07 real', pad: 8 }); shotImg('A19', 960, 400, 950, { scale: slam(t, 151.52) }); }
    else PR2.popup(960, 400, 900, 380, '一键重装', ['重装人生？', ''], { key: 'b07 pop', scale: backOut(seg(t, 152.4, 152.7)), fs: 64, buttons: [['确定', '#2E3B4E'], ['取消', '#C9D3E4', '#2B2233']] });
    const hover = t > 152.9 ? 1 : 0, tr = Math.sin(t * 30) * 6 * hover;
    PR.finger(862 + tr + (1 - ease(seg(t, 152.6, 153.2))) * 300, 585 + (1 - ease(seg(t, 152.6, 153.2))) * 500, 80, 1.35, { key: 'b07 fg' });
  }
  const slam = (t, t0) => t < t0 ? 0 : 1 + .2 * Math.exp(-(t - t0) * 14);
  // 155.43 可惜它没有快照
  function b08(t) {
    boilSeed('b08 bg'); paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#141A24', ink: null });
    const z = ease(seg(t, 155.6, 157.6));
    camBegin(lerp(960, 560, z), lerp(470, 640, z), lerp(1, 1.9, z));
    PR.card(960, 470, 1600, 732, { key: 'b08 card' });
    shotImg('A34', 960, 470, 1600, { src: [0, 0, 2584, 1182], h: 732 });
    camEnd();
    const back = ease(seg(t, 156.6, 158.2));
    PR.finger(1400 + back * 700, 860 + back * 200, 80, -.6, { key: 'b08 fg' });
    // 冷紫色慢慢渗进来
    flash(seg(t, 158.2, 159.1) * .85, '#2A2348');
  }

  shots([[138.83, b01], [141.54, t => b02(t)], [143.94, b03], [146.01, b04], [148.80, b05], [150.00, b06], [151.52, b07], [155.43, b08]]);
})();
