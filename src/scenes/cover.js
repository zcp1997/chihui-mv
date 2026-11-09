// cover.js：封面底图（没有歌词条、没有标题，标题由 make_cover.py 用华文中宋压上去）。
// node render.mjs --loop=cover169 --stills=0.5 --out=out/cover   （4:3 用 cover43，内容收在中间 1440 宽里）
(() => {
  function coverScene(t, o) {
    CHO.amberBG(t, 'cov', { col: '#D98F68', col2: '#EBB085' });
    glow(o.rackX, 380, 700, '#FFE1B8', .35);
    // 机柜：满满一柜落灰的小鸡，最后一格新来的那只还亮着、睁着眼
    PR2.rack(o.rackX, 380, o.cols, 2, 230, 230, (i, cx, cy) => {
      const isNew = i === o.cols * 2 - 1;
      CK.chick(cx, cy + 16, 62, { key: 'cov ck' + i, dust: isNew ? 0 : .35 + hash(i * 3) * .45, eyes: isNew ? 'wide' : (hash(i) > .45 ? 'closed' : 'dot'), light: isNew ? 1 : .5, glowA: isNew ? 1 : .35, flap: isNew ? .5 : .1 });
    }, { key: 'cov rack' });
    PR.dust(t, 60, 'cov dust', { x0: o.rackX - 600, x1: o.rackX + 600, y0: 80, y1: 760, fall: 0, col: '#E9E2D2', op: 190, r: 5 });
    // 阿灰：手机光照着脸，一脸陶醉
    AH.bust(o.ahX, 1210, 190, { key: 'cov ah', t, eyes: 'happy', mouth: 'smile', blush: .8, lensGlow: .8, tilt: -.06 });
    boilSeed('cov ph'); paint(rrPts(o.ahX + 170, 820, 120, 210, 20), { wash: '#24252E', ink: PAL.ink, sw: 1 });
    paint(rrPts(o.ahX + 179, 831, 102, 188, 14), { wash: '#CFE0FF', ink: null });
    glow(o.ahX + 230, 925, 280, '#BFD4FF', .9);
    paint(ellPts(o.ahX + 235, 1050, 46, 40, 10), { wash: AH.C.skin, ink: PAL.ink, sw: .9 });
  }
  LOOPS.cover169 = t => coverScene(t, { rackX: 1290, cols: 4, ahX: 470 });
  LOOPS.cover169.len = 1;
  LOOPS.cover43 = t => coverScene(t, { rackX: 1250, cols: 3, ahX: 560 });
  LOOPS.cover43.len = 1;
})();
