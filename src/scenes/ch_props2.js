// ch_props2.js：副歌以后用到的道具。window.PR2。
(() => {
  const MONO = '"Consolas", "Courier New", monospace';

  // 机柜：cols × rows 个格子，fill(i, cx, cy, cw, ch) 往每格里放东西（通常是小鸡）
  function rack(x, y, cols, rows, cw, ch, fill, o = {}) {
    const key = o.key || 'rack', w = cols * cw + 60, h = rows * ch + 70, x0 = x - w / 2, y0 = y - h / 2;
    boilSeed(key + ' body');
    paint(rrPts(x0, y0, w, h, 14), { wash: o.col || '#2E3140', ink: PAL.ink, sw: 1.2 });
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = r * cols + c, cx = x0 + 30 + c * cw + cw / 2, cy = y0 + 35 + r * ch + ch / 2;
      boilSeed(key + ' slot' + i);
      paint(rectPts(cx - cw / 2 + 6, cy - ch / 2 + 6, cw - 12, ch - 12, 1), { wash: o.slot || '#1B1D27', ink: '#4A4E60', sw: .6 });
      if (fill) fill(i, cx, cy, cw, ch);
      boilSeed(key + ' led' + i);
      paint(ellPts(cx + cw / 2 - 20, cy + ch / 2 - 18, 4, 4, 6), { wash: o.led ? o.led(i) : '#59D98C', ink: null });
    }
    return { x0, y0, w, h };
  }
  // 终端窗口（代码生成，字是清晰的等宽字）。lines = [[文字, 颜色], ...]；o.cursor 光标闪；o.typed 0..1 最后一行打到哪
  function term(x, y, w, h, lines, o = {}) {
    const key = o.key || 'term', s = o.scale ?? 1;
    if (s <= .01) return;
    const ww = w * s, hh = h * s, x0 = x - ww / 2, y0 = y - hh / 2;
    if (o.glow) glow(x, y, ww * .7, '#59D98C', o.glow);
    boilSeed(key + ' win');
    paint(rrPts(x0, y0, ww, hh, 14 * s), { wash: '#0E1513', ink: PAL.ink, sw: 1.1 });
    paint(rrPts(x0, y0, ww, 44 * s, 12 * s), { wash: '#2A2F2E', ink: null });
    ['#FF5F56', '#FFBD2E', '#27C93F'].forEach((c, i) => paint(ellPts(x0 + (28 + i * 30) * s, y0 + 22 * s, 9 * s, 9 * s, 8), { wash: c, ink: null }));
    if (o.title) ui(o.title, x, y0 + 22 * s, 22 * s, '#9AA59F', { bold: false });
    const fs = (o.fs || 34) * s, lh = fs * 1.45;
    lines.forEach(([txt, col], i) => {
      let tx = txt; if (i === lines.length - 1 && o.typed != null) tx = txt.slice(0, Math.round(txt.length * clamp(o.typed)));
      ui(tx, x0 + 30 * s, y0 + 44 * s + 30 * s + i * lh, fs, col || '#C9F2D8', { align: 'left', font: `700 ${fs}px ${MONO}` });
      if (i === lines.length - 1 && o.cursor && frac(T * 2) < .55) {
        boilSeed(key + ' cur');
        const cw = fs * .55 * [...tx].reduce((n, ch) => n + (ch.charCodeAt(0) > 255 ? 2 : 1), 0);
        paint(rectPts(x0 + 30 * s + cw + 4, y0 + 44 * s + 30 * s + i * lh - fs * .5, fs * .55, fs), { wash: '#59D98C', ink: null });
      }
    });
    return { x0, y0, w: ww, h: hh };
  }
  // 系统弹窗（代码生成）
  function popup(x, y, w, h, title, body, o = {}) {
    const key = o.key || 'pop', s = o.scale ?? 1;
    if (s <= .01) return;
    const ww = w * s, hh = h * s, x0 = x - ww / 2, y0 = y - hh / 2;
    boilSeed(key + ' sh'); paint(rrPts(x0 + 10, y0 + 14, ww, hh, 18 * s), { wash: '#000000', washOp: 60, ink: null });
    boilSeed(key + ' win'); paint(rrPts(x0, y0, ww, hh, 18 * s), { wash: o.col || '#FFFFFF', ink: PAL.ink, sw: 1 });
    boilSeed(key + ' bar'); paint(rrPts(x0, y0, ww, 56 * s, 16 * s), { wash: o.bar || '#E9E4F0', ink: null });
    ui(title, x0 + 28 * s, y0 + 28 * s, 28 * s, o.titleCol || '#2B2233', { align: 'left' });
    (Array.isArray(body) ? body : [body]).forEach((b, i) => ui(b, x, y0 + 56 * s + (hh - 56 * s) * (i + 1) / ((Array.isArray(body) ? body.length : 1) + 1), (o.fs || 40) * s, o.bodyCol || '#2B2233'));
    if (o.buttons) o.buttons.forEach(([txt, col, tc], i) => {
      const bw = 170 * s, bx = x + (i - (o.buttons.length - 1) / 2) * (bw + 30 * s), by = y0 + hh - 52 * s;
      boilSeed(key + ' btn' + i); paint(rrPts(bx - bw / 2, by - 30 * s, bw, 60 * s, 30 * s), { wash: col, ink: PAL.ink, sw: .8 });
      ui(txt, bx, by, 30 * s, tc || '#FFFFFF');
    });
    return { x0, y0, w: ww, h: hh };
  }
  // 妈妈：卷发、围裙、手拿锅铲
  function mom(x, y, R, o = {}) {
    const key = o.key || 'mom', sw = clamp(R / 90, .45, 1.2);
    push(); translate(x, y);
    boilSeed(key + ' body'); paint([[-R * 1.6, R * .3], [-R * 1.4, -R * .7], [-R * .5, -R * 1.15], [R * .5, -R * 1.15], [R * 1.4, -R * .7], [R * 1.6, R * .3]], { wash: '#C7616B', ink: PAL.ink, sw, curv: .35 });
    boilSeed(key + ' apron'); paint([[-R * .7, -R * 1.0], [R * .7, -R * 1.0], [R * .85, R * .3], [-R * .85, R * .3]], { wash: '#F4E9D8', ink: PAL.ink, sw: sw * .8, curv: .2 });
    pop();
    const hx = x, hy = y - R * 2.0;
    boilSeed(key + ' hairback'); for (let i = 0; i < 9; i++) { const a = Math.PI + i / 8 * Math.PI; paint(ellPts(hx + Math.cos(a) * R * 1.0, hy + Math.sin(a) * R * .95, R * .34, R * .34, 12), { wash: '#4A3530', ink: PAL.ink, sw: sw * .7 }); }
    boilSeed(key + ' face'); paint(ellPts(hx, hy, R * .92, R, 28), { wash: AH.C.skin, ink: PAL.ink, sw });
    boilSeed(key + ' fringe'); for (let i = 0; i < 5; i++) paint(ellPts(hx - R * .6 + i * R * .3, hy - R * .72, R * .22, R * .2, 10), { wash: '#4A3530', ink: PAL.ink, sw: sw * .6 });
    boilSeed(key + ' eyes');
    for (const s of [-1, 1]) {
      if (o.eyes === 'narrow') inkLine([[hx + s * R * .35 - R * .12, hy + R * .05], [hx + s * R * .35 + R * .12, hy + R * .05]], sw * 1.2, PAL.ink, 'ink', 0);
      else paint(ellPts(hx + s * R * .35, hy + R * .05, R * .07, R * .09, 10), { wash: PAL.ink, ink: null });
      inkLine([[hx + s * R * .35 - R * .14, hy - R * .17], [hx + s * R * .35 + R * .14, hy - R * .2 + (o.brow || 0) * s * R * .08]], sw, PAL.ink, 'inkfine', .3);
      paint(ellPts(hx + s * R * .55, hy + R * .38, R * .13, R * .07, 8), { wash: '#EBA08F', washOp: 150, ink: null });
    }
    boilSeed(key + ' mouth');
    if (o.talk) paint(ellPts(hx, hy + R * .52, R * .12, R * (.05 + .1 * o.talk), 12), { wash: '#7A2E35', ink: PAL.ink, sw: sw * .8 });
    else inkLine([[hx - R * .15, hy + R * .52], [hx + R * .15, hy + R * .52]], sw, PAL.ink, 'inkfine', .4);
    if (o.spatula) {
      boilSeed(key + ' spat');
      const sx = x + R * 1.35, sy = y - R * 1.3 + Math.sin(T * 8) * R * .1 * (o.wave || 0);
      inkLine([[sx, sy + R * .6], [sx + R * .25, sy - R * .7]], sw * 2.2, '#7A5A44', 'ink', 0);
      paint(rrPts(sx + R * .1, sy - R * 1.25, R * .45, R * .6, R * .1), { wash: '#B9BEC8', ink: PAL.ink, sw: sw * .8 });
      paint(ellPts(sx, sy + R * .65, R * .2, R * .22, 10), { wash: AH.C.skin, ink: PAL.ink, sw: sw * .8 });
    }
  }
  // 对话气泡
  function bubble(x, y, w, h, txt, o = {}) {
    const key = o.key || 'bub', k = o.scale ?? 1; if (k <= .01) return;
    const ww = w * k, hh = h * k;
    boilSeed(key);
    const tail = o.tail || [x - ww * .3, y + hh * .75];
    paint([[x - ww / 2, y - hh / 2], [x + ww / 2, y - hh / 2], [x + ww / 2, y + hh / 2], [x - ww * .15, y + hh / 2], tail, [x - ww * .32, y + hh / 2], [x - ww / 2, y + hh / 2]], { wash: o.col || '#FFFFFF', ink: PAL.ink, sw: 1, curv: .12 });
    ui(txt, x, y, (o.fs || 46) * k, o.tc || '#2B2233');
  }
  // 探针面板：n 个节点小卡片，lit(i) 返回 0..1 亮度
  function probe(x, y, cols, rows, cw, ch, lit, o = {}) {
    const key = o.key || 'probe', w = cols * cw + 40, h = rows * ch + 90, x0 = x - w / 2, y0 = y - h / 2;
    boilSeed(key + ' bg'); paint(rrPts(x0, y0, w, h, 18), { wash: o.bg || '#F4F5F8', ink: PAL.ink, sw: 1 });
    ui(o.title || '探针 · 节点总览', x0 + 30, y0 + 36, 30, '#2B2233', { align: 'left' });
    let on = 0; for (let i = 0; i < cols * rows; i++) if (lit(i) > .5) on++;
    ui(`在线 ${on} / ${cols * rows}`, x0 + w - 30, y0 + 36, 30, '#2E9E5B', { align: 'right' });
    const names = o.names || [];
    for (let i = 0; i < cols * rows; i++) {
      const c = i % cols, r = Math.floor(i / cols), cx = x0 + 20 + c * cw + cw / 2, cy = y0 + 70 + r * ch + ch / 2, l = lit(i);
      boilSeed(key + ' n' + i);
      paint(rrPts(cx - cw / 2 + 6, cy - ch / 2 + 6, cw - 12, ch - 12, 10), { wash: '#FFFFFF', ink: '#C9CDD8', sw: .5 });
      paint(ellPts(cx - cw / 2 + 28, cy, 10, 10, 8), { wash: l > .5 ? '#2EC46A' : '#C9CDD8', ink: null });
      if (l > .5) glow(cx - cw / 2 + 28, cy, 26, '#59D98C', .5 * l);
      ui(names[i] || ('chick-' + String(i + 1).padStart(2, '0')), cx - cw / 2 + 50, cy, Math.min(26, ch * .3), '#2B2233', { align: 'left', bold: false });
    }
    return { x0, y0, w, h };
  }
  // 红色角标
  function badge(x, y, r, txt, o = {}) {
    const k = o.scale ?? 1; if (k <= .01) return;
    boilSeed((o.key || 'bdg'));
    paint(rrPts(x - r * k * (txt.length > 2 ? 1.4 : 1), y - r * k, r * 2 * k * (txt.length > 2 ? 1.4 : 1), r * 2 * k, r * k), { wash: '#F2453D', ink: PAL.ink, sw: .9 });
    ui(txt, x, y + r * .04 * k, r * 1.05 * k, '#FFFFFF');
  }
  // 城市楼群：每扇窗 lit(i) 0..1；win(i, cx, cy, ww, wh) 可以在窗里画东西
  function city(key, o = {}) {
    const n = o.n || 9, base = o.base ?? 1080, cols = o.cols || 4;
    const out = [];
    for (let b = 0; b < n; b++) {
      const bw = (o.bw || 200) * (.8 + hash(b * 3) * .5), bx = (o.x0 ?? -40) + b * (o.step || 230) + hash(b) * 30, bh = (o.bh || 520) * (.6 + hash(b * 7) * .6), by = base - bh;
      boilSeed(key + ' b' + b);
      paint(rectPts(bx, by, bw, bh + 40), { wash: mixCol(o.col || '#1E2147', '#000000', hash(b * 5) * .3), ink: PAL.ink, sw: .7 });
      const rows = Math.floor((bh - 40) / 70), cs = (bw - 30) / cols;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const i = b * 100 + r * cols + c, cx = bx + 15 + c * cs + cs / 2, cy = by + 30 + r * 70 + 22, l = o.lit ? o.lit(i, b, r, c) : (hash(i) > .7 ? 1 : 0);
        boilSeed(key + ' w' + i);
        paint(rectPts(cx - cs * .32, cy - 18, cs * .64, 36), { wash: l > .5 ? (o.winCol || '#FFD98A') : '#2A2E58', ink: null });
        if (l > .5 && o.win) o.win(i, cx, cy, cs * .64, 36);
        if (l > .5 && o.glow) glow(cx, cy, 40, o.winCol || '#FFD98A', o.glow * l);
        out.push([cx, cy, l]);
      }
    }
    return out;
  }
  // 黑锅
  function wok(x, y, s, o = {}) {
    boilSeed((o.key || 'wok'));
    push(); translate(x, y); rotate(o.rot || 0);
    paint(ellPts(0, 0, s * 1.5, s * 1.05, 28), { wash: '#1E1C22', ink: PAL.ink, sw: 1.2 });
    paint(ellPts(-s * .3, -s * .3, s * .6, s * .3, 16), { wash: '#4A4852', washOp: 140, ink: null });
    inkLine([[s * 1.4, -s * .1], [s * 2.3, -s * .35]], 2.6, '#5B4232', 'ink', 0);
    pop();
  }
  // 便利贴
  function sticky(x, y, s, txt, o = {}) {
    const k = o.scale ?? 1; if (k <= .01) return;
    boilSeed((o.key || 'stk'));
    push(); translate(x, y); rotate(o.rot || 0); scale(k);
    paint(rectPts(-s, -s * .8, s * 2, s * 1.6, 3), { wash: o.col || '#FFE66B', ink: PAL.ink, sw: .8 });
    pop();
    letter(txt, x, y, s * .38 * k, '#2B2233', { font: `700 ${s * .38 * k}px ${CN}`, rot: o.rot || 0, ink: false });
  }
  // 卡通信用卡（会跪）
  function creditCard(x, y, s, o = {}) {
    boilSeed((o.key || 'cc') + ' body');
    push(); translate(x, y); rotate(o.rot || 0);
    paint(rrPts(-s * 1.6, -s, s * 3.2, s * 2, s * .25), { wash: '#3D5AFE', ink: PAL.ink, sw: 1 });
    paint(rectPts(-s * 1.6, -s * .55, s * 3.2, s * .35), { wash: '#1E2A6E', ink: null });
    paint(rrPts(-s * 1.2, s * .05, s * .55, s * .42, s * .08), { wash: '#E3B13A', ink: PAL.ink, sw: .6 });
    // 哭脸
    for (const sx of [.35, .95]) { inkLine([[s * sx - s * .12, s * .2], [s * sx + s * .12, s * .26]], .9, '#FFFFFF', 'ink', 0); paint([[s * sx, s * .35], [s * sx - s * .06, s * .6], [s * sx + s * .06, s * .6]], { wash: '#9FD3EE', ink: null }); }
    inkLine([[s * .45, s * .72], [s * .65, s * .64], [s * .85, s * .72]], .9, '#FFFFFF', 'ink', .5);
    pop();
    // 手臂抱住
    if (o.arms) { boilSeed((o.key || 'cc') + ' arms'); for (const sx of [-1, 1]) inkLine([[x + sx * s * 1.5, y], [x + sx * s * 1.9, y - s * .6], [x + sx * s * 1.4, y - s * 1.1]], 1.6, PAL.ink, 'ink', .5); }
  }
  // 小纸王冠
  function crown(x, y, s, o = {}) {
    boilSeed((o.key || 'crown'));
    paint([[x - s, y], [x - s, y - s * .9], [x - s * .5, y - s * .4], [x, y - s * 1.1], [x + s * .5, y - s * .4], [x + s, y - s * .9], [x + s, y]], { wash: o.col || '#F2CF6E', ink: PAL.ink, sw: .9 });
    for (const dx of [-.5, 0, .5]) paint(ellPts(x + dx * s, y - s * .2, s * .1, s * .1, 8), { wash: '#E0412F', ink: null });
  }
  // 墨镜（盖在阿灰眼镜上）
  function shades(x, y, R) {
    boilSeed('shades');
    for (const s of [-1, 1]) paint(rrPts(x + s * R * .4 - R * .3, y - R * .2, R * .6, R * .42, R * .14), { wash: '#141218', ink: PAL.ink, sw: 1 });
    inkLine([[x - R * .12, y - R * .05], [x + R * .12, y - R * .05]], 1.6, '#141218', 'ink', 0);
    for (const s of [-1, 1]) inkLine([[x + s * R * .4 - R * .15, y - R * .1], [x + s * R * .4 - R * .02, y - R * .14]], .8, '#FFFFFF', 'inkfine', 0);
  }
  // 心形上第 i / n 个点
  const heartPt = (cx, cy, s, k) => { const a = k * TAU; return [cx + s * 16 * Math.pow(Math.sin(a), 3), cy - s * (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))]; };
  // 简笔路人（指着人）
  function passer(x, y, s, col, o = {}) {
    boilSeed((o.key || 'ps') + ' body');
    paint([[x - s * .7, y], [x - s * .6, y - s * 2.2], [x + s * .6, y - s * 2.2], [x + s * .7, y]], { wash: col, ink: PAL.ink, sw: .9, curv: .3 });
    paint(ellPts(x, y - s * 2.75, s * .55, s * .58, 16), { wash: AH.C.skin, ink: PAL.ink, sw: .9 });
    paint([[x - s * .55, y - s * 3.0], [x, y - s * 3.4], [x + s * .55, y - s * 3.0], [x, y - s * 3.1]], { wash: o.hair || '#3A3040', ink: PAL.ink, sw: .7, curv: .4 });
    for (const sx of [-1, 1]) paint(ellPts(x + sx * s * .2, y - s * 2.75, s * .06, s * .08, 6), { wash: PAL.ink, ink: null });
    paint(ellPts(x, y - s * 2.5, s * .12, s * .1, 8), { wash: '#7A2E35', ink: null });
    const d = o.dir || 1; inkLine([[x + d * s * .5, y - s * 1.9], [x + d * s * 1.5, y - s * 2.1]], 1.8, col, 'ink', 0);
    paint(ellPts(x + d * s * 1.6, y - s * 2.1, s * .14, s * .14, 8), { wash: AH.C.skin, ink: PAL.ink, sw: .6 });
  }
  // 键帽
  function key(x, y, s, txt, o = {}) {
    const down = o.down ? s * .12 : 0;
    boilSeed((o.key || 'kc') + ' base'); paint(rrPts(x - s, y - s * .8 + s * .2, s * 2, s * 1.6, s * .25), { wash: '#3A3D4A', ink: PAL.ink, sw: 1 });
    boilSeed((o.key || 'kc') + ' top'); paint(rrPts(x - s * .85, y - s * .8 + down, s * 1.7, s * 1.3, s * .2), { wash: o.col || '#E8E6EF', ink: PAL.ink, sw: 1 });
    ui(txt, x, y - s * .15 + down, s * .45, '#2B2233', { font: `700 ${s * .45}px ${MONO}` });
  }
  window.PR2 = { rack, term, popup, mom, bubble, probe, badge, city, wok, sticky, creditCard, crown, shades, heartPt, passer, key, MONO };
})();
