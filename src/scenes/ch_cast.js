// ch_cast.js：阿灰（主人公）和小鸡（VPS）。window.AH / window.CK。
(() => {
  const C = {
    skin: '#F3D9BF', skinDk: '#E0B596', hair: '#2B2233', hood: '#8E929E', hoodDk: '#6D717D', hoodLt: '#A9ADB8',
    pants: '#4F6A98', pantsDk: '#3C5279', plaid: '#C7D3EA', glass: '#1E1B24', bag: '#A893C2', blush: '#EBA08F',
    sock: '#EDE6DA', flop: '#3E8C84', lens: '#BFE9F2',
    chick: '#F6D35B', chickDk: '#E3B13A', chickLt: '#FBE7A0', beak: '#EF8E3A', feet: '#E07A2F', green: '#59D98C', dust: '#9C968E'
  };
  window.CHC = C;

  // ---------- 阿灰的头 ----------
  // (x, y) 是脸的中心，R 是脸的半径。o.eyes / o.mouth 决定表情。
  function head(x, y, R, o = {}) {
    const key = o.key || 'ah', sw = o.sw ?? clamp(R / 90, .45, 1.2);
    const W0 = (c, ex = {}) => ({ wash: c, ink: PAL.ink, sw, ...ex });
    push(); translate(x, y); rotate(o.tilt || 0);
    // 耳朵、脸
    boilSeed(key + ' ears');
    paint(ellPts(-R * .97, R * .1, R * .17, R * .22, 12), W0(C.skin));
    paint(ellPts(R * .97, R * .1, R * .17, R * .22, 12), W0(C.skin));
    boilSeed(key + ' face');
    paint(ellPts(0, 0, R, R * 1.04, 30), W0(C.skin));
    // 头发：顶上一片乱翘的黑发，前面锯齿刘海
    boilSeed(key + ' hair');
    const hp = [];
    for (let i = 0; i <= 14; i++) {
      const a = Math.PI + .12 + i / 14 * (Math.PI - .24), spike = (i % 3 === 1) ? 1.24 + hash(i + 3) * .08 : 1.07;
      hp.push([Math.cos(a) * R * spike, Math.sin(a) * R * spike * 1.02]);
    }
    hp.push([R * 1.0, -R * .12], [R * .78, -R * .42], [R * .6, -R * .3], [R * .38, -R * .5], [R * .2, -R * .33], [0, -R * .52], [-R * .22, -R * .34], [-R * .42, -R * .52], [-R * .62, -R * .32], [-R * .8, -R * .44], [-R * 1.0, -R * .12]);
    paint(hp, W0(C.hair, { curv: .15 }));
    // 一撮呆毛
    boilSeed(key + ' ahoge');
    inkLine([[R * .05, -R * 1.06], [R * .22, -R * 1.42], [R * .42, -R * 1.3]], sw * 1.4, C.hair, 'ink', .6);

    const ex = R * .4, ey = R * .08, eyes = o.eyes || 'open';
    // 黑眼圈
    if (o.bags !== false) { boilSeed(key + ' bags'); for (const s of [-1, 1]) inkLine([[s * ex - R * .17, ey + R * .27], [s * ex, ey + R * .33], [s * ex + R * .17, ey + R * .27]], sw * .9, C.bag, 'inkfine', .5); }
    // 眼睛
    boilSeed(key + ' eyes');
    for (const s of [-1, 1]) {
      const cx = s * ex + (o.look || 0) * R * .06, cy = ey;
      if (eyes === 'closed') inkLine([[cx - R * .13, cy], [cx, cy + R * .07], [cx + R * .13, cy]], sw * 1.2, PAL.ink, 'ink', .5);
      else if (eyes === 'happy') inkLine([[cx - R * .13, cy + R * .05], [cx, cy - R * .07], [cx + R * .13, cy + R * .05]], sw * 1.2, PAL.ink, 'ink', .5);
      else if (eyes === 'squeeze') { inkLine([[cx - R * .13, cy - R * .07], [cx + R * .1 * s, cy], [cx - R * .13, cy + R * .07]].map(p => [s > 0 ? p[0] : 2 * cx - p[0], p[1]]), sw * 1.2, PAL.ink, 'ink', .2); }
      else if (eyes === 'wide') {
        paint(ellPts(cx, cy, R * .16, R * .18, 16), { wash: '#FFFDF6', ink: PAL.ink, sw: sw * .8 });
        paint(ellPts(cx, cy + R * .02, R * .085, R * .1, 12), { wash: PAL.ink, ink: null });
        paint(ellPts(cx + R * .035, cy - R * .03, R * .03, R * .03, 8), { wash: '#FFFFFF', ink: null });
      } else if (eyes === 'star') {
        paint(starPts(cx, cy, R * .17, .45, 5), { wash: '#FFD84A', ink: PAL.ink, sw: sw * .7 });
      } else if (eyes === 'blank') {
        paint(ellPts(cx, cy, R * .14, R * .14, 14), { wash: '#FFFDF6', ink: PAL.ink, sw: sw * .7 });
        paint(ellPts(cx, cy, R * .025, R * .025, 6), { wash: PAL.ink, ink: null });
      } else paint(ellPts(cx, cy + R * .02, R * .07, R * .09, 10), { wash: PAL.ink, ink: null });
    }
    // 眼镜
    if (o.glasses !== false) glasses(0, ey, R, { key: key + ' gl', sw, glow: o.lensGlow });
    // 腮红
    if (o.blush) { boilSeed(key + ' blush'); for (const s of [-1, 1]) paint(ellPts(s * R * .62, R * .4, R * .14, R * .08, 10), { wash: C.blush, washOp: 150 * o.blush, ink: null }); }
    // 嘴
    boilSeed(key + ' mouth');
    const my = R * .55, m = o.mouth || 'flat';
    if (m === 'smile') inkLine([[-R * .17, my - R * .04], [0, my + R * .06], [R * .17, my - R * .04]], sw * 1.1, PAL.ink, 'ink', .5);
    else if (m === 'grin') paint([[-R * .26, my - R * .06], [R * .26, my - R * .06], [R * .14, my + R * .16], [-R * .14, my + R * .16]], { wash: '#7A2E35', ink: PAL.ink, sw: sw * .9, curv: .4 });
    else if (m === 'o' || m === 'sing') {
      const op = m === 'o' ? 1 : clamp(o.open ?? .6);
      paint(ellPts(0, my + R * .02, R * (.09 + .07 * op), R * (.05 + .12 * op), 14), { wash: '#7A2E35', ink: PAL.ink, sw: sw * .9 });
    } else if (m === 'wavy') inkLine([[-R * .18, my], [-R * .09, my - R * .04], [0, my], [R * .09, my - R * .04], [R * .18, my]], sw, PAL.ink, 'inkfine', .5);
    else if (m === 'drool') { inkLine([[-R * .12, my], [R * .12, my - R * .02]], sw, PAL.ink, 'inkfine', .5); paint(ellPts(R * .1, my + R * .1, R * .04, R * .07, 8), { wash: '#BFE3F2', ink: null }); }
    else inkLine([[-R * .13, my], [R * .13, my]], sw, PAL.ink, 'inkfine', .5);
    // 汗
    if (o.sweat) { boilSeed(key + ' sweat'); const sy = -R * .3 + (o.sweatDrop || 0) * R * .5; paint([[R * 1.02, sy - R * .22], [R * 1.13, sy + R * .03], [R * 1.02, sy + R * .1], [R * .92, sy + R * .03]], { wash: '#9FD3EE', ink: PAL.ink, sw: sw * .6, curv: .5 }); }
    pop();
  }
  function glasses(x, y, R, o = {}) {
    const sw = o.sw ?? clamp(R / 90, .45, 1.2), key = o.key || 'gl';
    boilSeed(key);
    push(); translate(x, y); rotate(o.rot || 0);
    for (const s of [-1, 1]) {
      if (o.glow) paint(rrPts(s * R * .4 - R * .27, -R * .21, R * .54, R * .42, R * .1), { wash: C.lens, washOp: 120 * o.glow, ink: null });
      paint(rrPts(s * R * .4 - R * .27, -R * .21, R * .54, R * .42, R * .1), { ink: C.glass, sw: sw * 1.5 });
    }
    inkLine([[-R * .13, -R * .03], [0, -R * .08], [R * .13, -R * .03]], sw * 1.3, C.glass, 'ink', .5);
    if (o.glow) for (const s of [-1, 1]) glow(s * R * .4, 0, R * .45, '#8FE3F2', .5 * o.glow);
    pop();
  }

  // ---------- 卫衣上半身（胸像）----------
  // (x, y) 是画面里身体的底边中心；R 是头的半径。头中心在 y - 2.05R。
  function bust(x, y, R, o = {}) {
    const key = o.key || 'ahb', sw = clamp(R / 90, .45, 1.2), t = o.t ?? T;
    const bob = o.bob ?? 0;
    push(); translate(x, y + bob);
    boilSeed(key + ' body');
    paint([[-R * 1.75, R * .2], [-R * 1.6, -R * .62], [-R * 1.1, -R * 1.02], [-R * .45, -R * 1.18], [R * .45, -R * 1.18], [R * 1.1, -R * 1.02], [R * 1.6, -R * .62], [R * 1.75, R * .2]], { wash: C.hood, ink: PAL.ink, sw, curv: .35 });
    // 帽兜搭在脖子后面
    boilSeed(key + ' hoodie');
    paint([[-R * .78, -R * 1.12], [-R * .5, -R * .8], [0, -R * .68], [R * .5, -R * .8], [R * .78, -R * 1.12], [R * .3, -R * 1.3], [-R * .3, -R * 1.3]], { wash: C.hoodDk, ink: PAL.ink, sw, curv: .4 });
    // 脖子
    paint([[-R * .28, -R * 1.3], [R * .28, -R * 1.3], [R * .26, -R * .9], [0, -R * .82], [-R * .26, -R * .9]], { wash: C.skinDk, ink: PAL.ink, sw: sw * .8, curv: .3 });
    // 抽绳
    boilSeed(key + ' strings');
    for (const s of [-1, 1]) { inkLine([[s * R * .22, -R * .78], [s * R * .26, -R * .3], [s * R * .24, -R * .05]], sw * .7, '#ECE6DA', 'inkfine', .5); paint(ellPts(s * R * .24, -R * .02, R * .04, R * .06, 8), { wash: '#ECE6DA', ink: PAL.ink, sw: sw * .5 }); }
    if (o.arms) o.arms(R);
    pop();
    head(x + (o.hx || 0), y + bob - R * 2.05, R, { ...o, key: key + ' head' });
  }

  // ---------- 全身 ----------
  // (x, y) 是脚底中心。o.sq > 0 压扁、< 0 拉长；o.aL / o.aR 是手臂角度（0 朝下，π 朝上，正值朝外摆）。
  function body(x, y, R, o = {}) {
    const key = o.key || 'ahf', sw = clamp(R / 90, .45, 1.2), sq = o.sq || 0;
    push(); translate(x, y + (o.dy || 0) * R); rotate(o.rot || 0); scale(1 + sq * .8, 1 - sq);
    // 腿（格子睡裤）+ 人字拖
    const legs = o.legs ?? 0;
    for (const s of [-1, 1]) {
      boilSeed(key + ' leg' + s);
      const kx = s * R * (.3 + legs * .25);
      paint([[s * R * .05, -R * 1.5], [s * R * .62, -R * 1.5], [kx + s * R * .32, -R * .12], [kx - s * R * .2, -R * .12]], { wash: C.pants, ink: PAL.ink, sw, curv: .2 });
      inkLine([[s * R * .3, -R * 1.4], [kx + s * R * .05, -R * .2]], sw * .5, C.plaid, 'inkfine', .4);
      inkLine([[s * R * .12, -R * .9], [s * R * .5 + kx * .3, -R * .9]], sw * .5, C.plaid, 'inkfine', .4);
      boilSeed(key + ' foot' + s);
      paint(ellPts(kx + s * R * .06, -R * .04, R * .34, R * .1, 12), { wash: C.flop, ink: PAL.ink, sw: sw * .7 });
      paint(ellPts(kx + s * R * .06, -R * .14, R * .17, R * .1, 10), { wash: C.skin, ink: PAL.ink, sw: sw * .6 });
    }
    // 手臂
    const arm = (s, a) => {
      boilSeed(key + ' arm' + s);
      const sx = s * R * .78, sy = -R * 3.0, L = R * 1.45, ax = sx + s * Math.sin(a) * L, ay = sy + Math.cos(a) * L;
      const mx = (sx + ax) / 2 + s * R * .12, my = (sy + ay) / 2;
      paint(ribbon([[sx, sy], [mx, my], [ax, ay]], R * .46, R * .36), { wash: C.hood, ink: PAL.ink, sw });
      paint(ellPts(ax + s * Math.sin(a) * R * .16, ay + Math.cos(a) * R * .16, R * .19, R * .2, 10), { wash: C.skin, ink: PAL.ink, sw: sw * .8 });
    };
    arm(-1, o.aL ?? .25); arm(1, o.aR ?? .25);
    // 躯干
    boilSeed(key + ' torso');
    paint([[-R * .85, -R * 3.2], [R * .85, -R * 3.2], [R * 1.0, -R * 2.5], [R * .82, -R * 1.42], [-R * .82, -R * 1.42], [-R * 1.0, -R * 2.5]], { wash: C.hood, ink: PAL.ink, sw, curv: .35 });
    paint([[-R * .55, -R * 2.0], [R * .55, -R * 2.0], [R * .5, -R * 1.62], [-R * .5, -R * 1.62]], { wash: C.hoodDk, ink: PAL.ink, sw: sw * .6, curv: .3 });
    boilSeed(key + ' hood');
    paint([[-R * .6, -R * 3.25], [0, -R * 2.92], [R * .6, -R * 3.25], [R * .25, -R * 3.42], [-R * .25, -R * 3.42]], { wash: C.hoodDk, ink: PAL.ink, sw, curv: .4 });
    pop();
    // 头跟着身体的压扁拉长走
    const hy = y + (o.dy || 0) * R - R * 4.2 * (1 - sq);
    head(x + Math.sin(o.rot || 0) * R * 4.2, hy, R, { ...o, key: key + ' head' });
  }

  // ---------- 睡觉：枕头 + 被子 ----------
  function sleep(x, y, R, o = {}) {
    const key = o.key || 'ahs', sw = clamp(R / 90, .45, 1.2), t = o.t ?? T;
    boilSeed(key + ' pillow');
    paint(rrPts(x - R * 1.9, y - R * 1.2, R * 3.6, R * 1.9, R * .7), { wash: '#E9E4F0', ink: PAL.ink, sw });
    const br = Math.sin(t * TAU / 3.2) * .02;
    head(x, y - R * .25, R, { key: key + ' head', eyes: 'closed', mouth: o.mouth || 'drool', tilt: -.32, glasses: false, ...o.face });
    // 被子从下巴往下盖
    boilSeed(key + ' quilt');
    const q = [[x - R * 2.6, y + R * .55], [x - R * .9, y + R * .42 - br * R], [x + R * .8, y + R * .5], [x + R * 3.5, y + R * .2 - br * R * 2], [x + R * 7.4, y + R * .6], [x + R * 7.8, y + R * 2.6], [x - R * 2.8, y + R * 2.6]];
    paint(q, { wash: o.quilt || '#5A6FA8', ink: PAL.ink, sw, curv: .4 });
    inkLine([[x + R * .5, y + R * .9], [x + R * 2.4, y + R * 1.3], [x + R * 4.5, y + R * 1.0]], sw * .6, '#7C90C6', 'inkfine', .5);
    inkLine([[x + R * 2.8, y + R * .7], [x + R * 4.8, y + R * 1.7]], sw * .6, '#7C90C6', 'inkfine', .5);
  }

  window.AH = { head, glasses, bust, body, sleep, C };

  // ---------- 小鸡（一台 VPS）----------
  // (x, y) 是身体中心，r 半径。o.sign 胸前城市牌；o.dust 0..1 落灰；o.shout 张嘴；o.light 头顶绿灯亮度；
  // o.eyes: 'dot' | 'happy' | 'closed' | 'x' | 'wide'；o.flap 翅膀张开 0..1；o.sq 压扁拉长；o.rot。
  function chick(x, y, r, o = {}) {
    const key = o.key || 'ck', sw = o.sw ?? clamp(r / 60, .35, 1), sq = o.sq || 0, dust = clamp(o.dust || 0);
    const body = mixCol(C.chick, C.dust, dust * .75), bodyDk = mixCol(C.chickDk, C.dust, dust * .75);
    push(); translate(x, y); rotate(o.rot || 0); translate(0, r); scale(1 + sq * .7, 1 - sq); translate(0, -r);
    // 脚
    boilSeed(key + ' feet');
    for (const s of [-1, 1]) inkLine([[s * r * .3, r * .9], [s * r * .32, r * 1.12], [s * r * .18, r * 1.2]], sw * .9, C.feet, 'ink', .3), inkLine([[s * r * .32, r * 1.12], [s * r * .46, r * 1.2]], sw * .9, C.feet, 'ink', .3);
    // 天线 + 绿灯
    const lit = o.light ?? 1;
    boilSeed(key + ' ant');
    inkLine([[0, -r * .95], [r * .06, -r * 1.25], [0, -r * 1.42]], sw * .8, PAL.ink, 'inkfine', .6);
    paint(ellPts(0, -r * 1.5, r * .13, r * .13, 10), { wash: lit > .2 ? mixCol('#2F6B47', C.green, lit) : '#5C5A58', ink: PAL.ink, sw: sw * .6 });
    // 身体
    boilSeed(key + ' body');
    paint(ellPts(0, 0, r, r * .98, 26), { wash: body, ink: PAL.ink, sw });
    paint(ellPts(0, r * .35, r * .6, r * .45, 18), { wash: mixCol(C.chickLt, C.dust, dust * .7), ink: null });
    // 翅膀
    const fl = o.flap || 0;
    boilSeed(key + ' wings');
    for (const s of [-1, 1]) {
      const a = s * (.35 + fl * 1.1), wx = s * r * .92, wy = r * .1;
      push(); translate(wx, wy); rotate(a);
      paint(ellPts(0, r * .18, r * .2, r * .36, 12), { wash: bodyDk, ink: PAL.ink, sw: sw * .8 });
      pop();
    }
    // 眼睛
    boilSeed(key + ' eyes');
    const ey = -r * .22, e = o.eyes || 'dot';
    for (const s of [-1, 1]) {
      const cx = s * r * .33 + (o.look || 0) * r * .08;
      if (e === 'happy') inkLine([[cx - r * .1, ey + r * .04], [cx, ey - r * .06], [cx + r * .1, ey + r * .04]], sw, PAL.ink, 'ink', .5);
      else if (e === 'closed') inkLine([[cx - r * .1, ey], [cx, ey + r * .06], [cx + r * .1, ey]], sw, PAL.ink, 'ink', .5);
      else if (e === 'x') { inkLine([[cx - r * .08, ey - r * .08], [cx + r * .08, ey + r * .08]], sw, PAL.ink, 'ink', 0); inkLine([[cx + r * .08, ey - r * .08], [cx - r * .08, ey + r * .08]], sw, PAL.ink, 'ink', 0); }
      else if (e === 'wide') { paint(ellPts(cx, ey, r * .13, r * .14, 12), { wash: '#FFFDF6', ink: PAL.ink, sw: sw * .6 }); paint(ellPts(cx, ey + r * .02, r * .06, r * .07, 8), { wash: PAL.ink, ink: null }); }
      else paint(ellPts(cx, ey, r * .075, r * .09, 10), { wash: PAL.ink, ink: null });
    }
    if (dust < .6) { boilSeed(key + ' blush'); for (const s of [-1, 1]) paint(ellPts(s * r * .55, ey + r * .2, r * .11, r * .07, 8), { wash: '#F2A07E', washOp: 160, ink: null }); }
    // 嘴
    boilSeed(key + ' beak');
    const by = r * .02, sh = clamp(o.shout || 0);
    paint([[-r * .16, by], [r * .16, by], [0, by + r * .14 - sh * r * .02]], { wash: C.beak, ink: PAL.ink, sw: sw * .7 });
    if (sh > 0) paint([[-r * .14, by + r * .05], [r * .14, by + r * .05], [0, by + r * .14 + sh * r * .22]], { wash: '#D9653A', ink: PAL.ink, sw: sw * .7 });
    // 灰
    if (dust > 0) {
      boilSeed(key + ' dust');
      for (let i = 0; i < 18 * dust; i++) { const a = Math.PI + hash(i * 7 + 1) * Math.PI, rr = r * (.4 + hash(i * 3) * .55); paint(ellPts(Math.cos(a) * rr, Math.sin(a) * rr * .9, r * (.05 + hash(i) * .06), r * .04, 6), { wash: '#B9B2A8', washOp: 200, ink: null }); }
      paint([[-r * .7, -r * .7], [-r * .2, -r * .98], [r * .3, -r * .96], [r * .72, -r * .68], [r * .4, -r * .8], [-r * .3, -r * .82]], { wash: '#C9C2B6', washOp: 200 * dust, ink: null, curv: .5 });
    }
    // 城市牌
    if (o.sign) {
      boilSeed(key + ' sign');
      const sw2 = Math.max(r * .9, o.sign.length * r * .34 + r * .3), sy = r * .52;
      inkLine([[-r * .3, -r * .02], [-sw2 * .3, sy - r * .14]], sw * .5, PAL.ink, 'inkfine', .3); inkLine([[r * .3, -r * .02], [sw2 * .3, sy - r * .14]], sw * .5, PAL.ink, 'inkfine', .3);
      paint(rrPts(-sw2 / 2, sy - r * .16, sw2, r * .4, r * .06), { wash: '#FFFDF6', ink: PAL.ink, sw: sw * .6 });
    }
    pop();
    // letter() 只认摄像机，不认 push/translate，所以字在 pop 之后按世界坐标放
    if (o.sign) ui(o.sign, x, y + r * .56, r * .27, '#2B2233');
    if (lit > .2) glow(x, y - r * 1.5 * (1 - sq), r * .55, '#7CF2A8', lit * (o.glowA ?? .9));
  }
  window.CK = { chick, C };
})();
