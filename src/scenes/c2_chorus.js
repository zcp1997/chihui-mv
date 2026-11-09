// c2_chorus.js：预副歌二（90.24 – 101.09）+ 副歌二（101.09 – 120.40）。构图沿用第一遍，每一镜都「更多」一点。
(() => {
  const { warmBG, singer, choir } = PRE;
  const XS5 = [1180, 1330, 1480, 1630, 1780];

  // 90.24 这个价不买就是亏（就是亏）：论坛补货帖 → 7 刀横幅，伴唱团多了两只
  function q01(t) {
    warmBG(t, 'q01');
    const a = backOut(seg(t, 90.3, 90.6));
    PR.card(1290, 260, 934, 104, { key: 'q01 c2', pad: 14 });
    shotImg('A02', 1290, 260, 934, { scale: a });
    const b = backOut(seg(t, 90.95, 91.25));
    if (t > 90.95) { PR.card(1270, 480, 900, 113, { key: 'q01 c7', pad: 10 }); shotImg('A11', 1270, 480, 900, { scale: b, rot: -.02 }); }
    singer(t, 'q01 ah');
    choir(t, 'q01', 91.52, { xs: XS5 });
    big('就是亏！', 1480, 700, 100, '#FFD84A', t - 91.52, { stroke: '#B4462F', life: .9 });
  }
  // 92.47 再观望一下就没了：这次刷新得更快，直接砸上「又没了」
  function q02(t) {
    warmBG(t, 'q02');
    const gone = t > 93.1, sh = gone && t < 93.35 ? shakeXY(t, 14) : [0, 0];
    PR.card(1300 + sh[0], 360 + sh[1], 800, 355, { key: 'q02 card' });
    shotImg(gone ? 'A12' : 'A03', 1300 + sh[0], 360 + sh[1], 800);
    if (gone) PR.stamp('又没了', 1520, 280, 60, t - 93.1, { key: 'q02 st', rot: .1 });
    singer(t, 'q02 ah', { eyes: gone ? 'blank' : 'open', mouth: gone ? 'o' : 'wavy', sweat: gone ? 1 : 0 });
    choir(t, 'q02', 94.23, { xs: XS5, eyes: age => age > 0 ? 'closed' : 'dot', flap: age => age > 0 ? 1.4 : .15 });
    big('就没了！', 1480, 700, 100, '#FFFFFF', t - 94.23, { stroke: '#4F6A98', life: .8 });
  }
  // 95.03 先买了以后再说：付款邮件一封封滑下来，阿灰头也不抬
  function q03(t) {
    warmBG(t, 'q03');
    for (let i = 0; i < 4; i++) {
      const t0 = 95.1 + i * .55; if (t < t0) continue;
      const k = backOut(seg(t, t0, t0 + .3)), y = lerp(-200, 170 + i * 120, k);
      PR.card(1260 + i * 24, y, 820, 186, { key: 'q03 m' + i, pad: 10 }); shotImg('A05', 1260 + i * 24, y, 820);
    }
    singer(t, 'q03 ah', { eyes: 'closed', mouth: 'smile' });
    big('先买了！', 760, 380, 96, '#FFFFFF', t - 95.1, { stroke: '#B4462F', life: 1.2 });
  }
  // 97.42 反正也就一顿饭的钱：一边扒猪脚饭，一边用另一只手下单
  function q04(t) {
    warmBG(t, 'q04');
    PR.card(1380, 280, 600, 269, { key: 'q04 btn' });
    const taps = [97.9, 98.6, 99.3, 100.0], hit = taps.some(h => t > h && t < h + .12);
    shotImg('A03', 1380, 280, 600, { scale: hit ? .96 : 1 });
    const fin = taps.reduce((m, h) => Math.min(m, Math.abs(t - h)), 9);
    PR.finger(1400 + Math.min(fin, .3) * 300, 320 - Math.min(fin, .3) * 200, 70, -.5, { key: 'q04 fg' });
    const chew = Math.abs(Math.sin(t * 9));
    AH.bust(400, 1130, 170, { key: 'q04 ah', t, eyes: 'happy', mouth: 'sing', open: .3 + chew * .5, blush: .6, tilt: -.05 });
    shotImg('A13', 740, 800 - chew * 10, 250, { rot: .05 });
    // 筷子：从碗里夹到嘴边
    boilSeed('q04 chop'); inkLine([[760, 760], [480 + chew * 30, 860 - chew * 10]], 2, '#8C6A4A', 'ink', 0); inkLine([[780, 775], [495 + chew * 30, 872 - chew * 10]], 2, '#8C6A4A', 'ink', 0);
    if (t > 99.75) big('一顿饭钱~', 1450, 680, 84, '#FFD84A', t - 99.75, { stroke: '#B4462F', life: 1.3 });
    const dk = seg(t, 100.4, 101.09);
    PR.dust(t, Math.round(60 * dk), 'q04 dust', { fall: 220, col: '#9C968E', op: 230, r: 6 });
    flash(dk * .5, '#3A3348');
  }

  // ---------- 副歌二 ----------
  // 101.09 又一台小鸡买来吃灰：机柜多了一整排，灰更厚，新来的被呛得打喷嚏
  function r01(t) {
    CHO.amberBG(t, 'r01');
    CHO.rackScene(t, 'r01', { cols: 5, rows: 3, cw: 210, ch: 200, y: 440, arrive: [101.75, 14], dust: i => .45 + hash(i * 3) * .4, sq: i => i === 14 ? .2 * spring(t, 102.6, 7, 26) : 0 });
    PR.dust(t, 50, 'r01 dust', { fall: 70, col: '#C9C2B6', op: 210, r: 6 });
    if (t > 102.6) big('阿嚏！', 1500, 760, 80, '#FFFFFF', t - 102.6, { life: .8 });
  }
  // 103.48 年付十刀 说贵也不贵：10 刀和 7 刀两张价格卡并排
  function r02(t) {
    CHO.amberBG(t, 'r02');
    const a = backOut(seg(t, 103.5, 103.8)), b = backOut(seg(t, 104.1, 104.4));
    PR.card(560, 360, 760, 265, { key: 'r02 a' }); shotImg('A10', 560, 360, 760, { scale: a, rot: -.03 });
    if (t > 104.1) { PR.card(1380, 400, 900, 113, { key: 'r02 b', pad: 10 }); shotImg('A11', 1380, 400, 900, { scale: b, rot: .03 }); }
    big('$10', 560, 700, 120, '#FFFFFF', t - 103.8, { stroke: '#B4462F', life: 2.5 });
    big('$7', 1380, 650, 120, '#FFFFFF', t - 104.4, { stroke: '#B4462F', life: 2 });
  }
  // 105.96 用不用得上无所谓：CPU 0.0% 的进度条上，小鸡在做瑜伽
  function r03(t) {
    CHO.amberBG(t, 'r03', { col: '#C9875F' });
    PR.card(960, 470, 1150, 449, { key: 'r03 card' });
    const r = shotImg('A14', 960, 470, 1150);
    const [bx, by] = onShot(r, 110, 95), pose = Math.floor((t - 105.96) / (BEAT * 2)) % 2;
    CK.chick(bx - 30, by - 80, 62, { key: 'r03 ck', eyes: 'closed', flap: pose ? 1.6 : .9, rot: pose ? .25 : -.25, sq: -.08 });
    big('0.0%', 1560, 180, 90, '#FFD84A', .3, { stroke: '#B4462F', life: 9 });
  }
  // 108.03 反正下单那一刻很陶醉：慢动作按下 Order Now，炸出一圈星星
  function r04(t) {
    CHO.amberBG(t, 'r04', { col: '#E59AA6', col2: '#F5C1C8' });
    const press = ease(seg(t, 108.1, 109.4)), boom = t > 109.4;
    PR.card(960, 440, 1180, 420, { key: 'r04 card' });
    shotImg('A03', 960, 440, 1180, { src: [70, 40, 404, 145], scale: boom && t < 109.6 ? .96 : 1 });
    PR.finger(980 + (1 - press) * 700, 450 - (1 - press) * 250, 100, -.3, { key: 'r04 fg' });
    if (boom) { const k = easeOut(seg(t, 109.4, 110.2)); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; paint(starPts(980 + Math.cos(a) * k * 520, 450 + Math.sin(a) * k * 330, 30 * (1 - k * .5), .4, 5), { wash: i % 2 ? '#FFD84A' : '#FFFFFF', ink: null }); } flash(.3 * Math.exp(-(t - 109.4) * 6), '#FFFFFF'); }
  }
  // 110.75 我妈问这能当饭吃吗：这次妈妈本人站在他身后，探头看屏幕
  function r05(t) {
    PR.nightBG('r05', { floor: false });
    const s = PR.monitor(1450, 470, 760, 480, { key: 'r05 mon', glow: .5, screen: '#F4F5F8' });
    shotImg('A15', s.cx, s.cy, s.w, { src: [0, 0, 1420, 1420 * s.h / s.w], h: s.h });
    const peek = easeOut(seg(t, 110.8, 111.3));
    PR2.mom(lerp(250, 520, peek), 1150, 170, { key: 'r05 mom', talk: t < 112.6 ? .4 + .6 * Math.abs(Math.sin(t * 14)) : 0, eyes: 'narrow', brow: -1 });
    AH.bust(900, 1230, 150, { key: 'r05 ah', t, eyes: 'wide', mouth: 'o', sweat: 1, look: -1 });
    PR2.bubble(560, 230, 560, 140, '这能当饭吃吗？', { key: 'r05 bub', scale: backOut(seg(t, 111.0, 111.3)), tail: [500, 360], fs: 50 });
  }
  // 112.82 不能呀：护住屏幕
  function r06(t) {
    PR.nightBG('r06', { floor: false });
    const s = PR.monitor(1300, 470, 760, 480, { key: 'r06 mon', glow: .5, screen: '#F4F5F8' });
    shotImg('A15', s.cx, s.cy, s.w, { src: [0, 0, 1420, 1420 * s.h / s.w], h: s.h });
    AH.body(1150, 1060, 80, { key: 'r06 ah', t, eyes: 'squeeze', mouth: 'wavy', sweat: 1, aL: 2.1, aR: 1.9, rot: .08 });
    big('不能呀', 520, 300, 140, '#FFFFFF', t - 112.82, { stroke: '#4F6A98', life: 2 });
  }
  // 113.54 可半夜睡不着的时候：同一个深夜，月亮换了位置
  const r07 = t => CHO.bedPhone(t, 'r07', { moonX: -260, eyes: 'open' });
  // 115.29 打开探针：探针面板换一块区域
  function r08(t) {
    PR.nightBG('r08', { floor: false });
    const g = IMG.A15, k = ease(seg(t, 115.29, 116.73)), vw = g.H0 * (1500 - 34 * 3.2) / (780 - 68);
    CHO.phoneLandscape(t, 'r08', 'A15', [lerp(g.W0 - vw, 0, k), 0, vw, g.H0]);
  }
  // 116.73 看着心爱的机器都在线
  const r09 = t => CHO.onlineList(t, 'r09', 116.73, 119.1);
  // 119.28 也不算没人陪：小鸡们挤在手机边上排排坐
  function r10(t) {
    PR.nightBG('r10', { floor: false });
    const s = PR.phone(960, 460, 380, 720, { key: 'r10 ph', glow: .8, screen: '#CFE0FF' });
    for (let i = 0; i < 6; i++) { const side = i < 3 ? -1 : 1, k = i % 3; CK.chick(960 + side * (280 + k * 150), 760, 70, { key: 'r10 ck' + i, eyes: 'happy', flap: .2 + .2 * pulse(t + i * .1), look: -side }); }
    if (t > 120.2) flash(.6, '#FFFFFF');
  }

  shots([[90.24, q01], [92.47, q02], [95.03, q03], [97.42, q04], [101.09, r01], [103.48, r02], [105.96, r03], [108.03, r04], [110.75, r05], [112.82, r06], [113.54, r07], [115.29, r08], [116.73, r09], [119.28, r10]]);
})();
