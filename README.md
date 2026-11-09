# 吃灰 · 水彩手绘 MV

原创歌曲《吃灰》的歌词 MV 源代码。歌讲的是一个程序员半夜抢便宜 VPS（圈内叫「小鸡」），买了二十台全在吃灰。

画面全部用代码一帧一帧画出来：人物、小鸡、场景都是 [p5.js](https://p5js.org/) + [p5.brush](https://github.com/acamposuribe/p5.brush) 画的水彩和墨线，真实截图放进手绘的手机和显示器框里混排。无头 Chrome 逐帧渲染，ffmpeg 合成视频。

- 规格：1920×1080，24 帧，全长 3:38（5242 帧）
- 分镜：[docs/STORYBOARD.md](docs/STORYBOARD.md)

## 需要什么

- Node.js 18 以上
- Google Chrome（找不到时用 `--chrome=<路径>` 指定，或设环境变量 `CHROME_PATH`）
- ffmpeg（合成视频用）
- Python 3 + Pillow（只有做封面时要）

```bash
npm install
```

## 准备素材

歌曲和截图都**不在仓库里**，要自己放：

| 放哪 | 是什么 |
|---|---|
| `assets/song.wav` | 歌曲音频（`src/config.js` 里的 `PROJECT.audio`，换成 mp3 就改这里） |
| `assets/shots/` | 35 张截图，文件名和用途见 [assets/shots/README.md](assets/shots/README.md) |

截图缺了也能跑，缺的会用写着编号的灰色占位图代替。

## 预览

用浏览器直接打开 `studio.html`，拖下面的时间轴就能看任意时刻的画面。

命令行出联系表（几个时间点拼成一张图）：

```bash
node render.mjs --sheet=10,45,120,180 --cols=2 --w=640 --out=out/check/a.jpg
```

```bash
node render.mjs --strip=6.2:7.2 --out=out/check/strip.jpg
```

第二条是一段时间内的每一帧，用来检查动作。完整用法见 `render.mjs` 顶部的注释。

## 出片

先渲染所有帧到 `out/frames`。中途停下再运行会接着画，不会从头来：

```bash
node render.mjs --frames --workers=2
```

再和歌曲合成：

```bash
ffmpeg -framerate 24 -i out/frames/f%05d.jpg -i assets/song.wav -map 0:v -map 1:a -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -c:a aac -b:a 320k -shortest -movflags +faststart out/吃灰.mp4
```

只想画一段，加 `--range=开始秒:结束秒`。没有独立显卡的机器建议 `--workers=2`：在 Intel 核显上开 3 个进程会不稳。

## 封面

```bash
python make_cover.py
```

输出 `out/cover/` 下 16:9（1920×1080）和 4:3（1440×1080）两张。底图由 `src/scenes/cover.js` 单独画（不带歌词条），标题用华文中宋，其他系统要改 `make_cover.py` 里的 `FONT`。

## 代码结构

```
studio.html          入口，按顺序加载所有脚本（没有打包器，新加场景文件要在这里登记）
render.mjs           无头 Chrome 渲染：联系表、单帧、整片帧序列
src/config.js        时长、BPM、首拍偏移、音频路径
src/core.js          画布、节拍工具（pulse、seg、kf…）、paint / inkLine 等绘制原语、摄像机
src/timeline.js      shots([[开始秒, 函数], ...]) 注册镜头
src/assets.js        截图载入（shotImg / onShot）和中文字（ui / big）
src/karaoke.js       卡拉 OK 歌词条（LY 数组）
src/scenes/
  ch_cast.js         阿灰（AH）和小鸡（CK）
  ch_props.js        布景道具：卧室、手机、卡片、纸箱、天平……
  ch_props2.js       机柜、终端、弹窗、妈妈、探针面板、城市楼群……
  v1_verse.js …      按歌曲段落分的镜头：v1 主歌一 → v1_pre → c1 副歌一 → v2 → c2 → r_rap → b_bridge → v3 → f_final
  cover.js           封面底图
```

写镜头时要守的规矩：

- **每个镜头函数都必须是时间 `t` 的纯函数。** 帧是多进程乱序渲染的，不能有跨帧的状态，随机数用 `hash(i)`，不要用 `Math.random()`。
- **手绘抖动靠 `boilSeed(key)`。** 每个独立元素画之前用固定的 key 调一次，否则整个画面会一起闪。
- **`letter()` 系列的字只认摄像机，不认 `push/translate`。** 在变换里画字要自己换算坐标。

## 致谢与许可

动画引擎（`core.js`、`timeline.js`、`render.mjs` 等）基于 painted-animation 模板，原作者 John Heibel，MIT 许可，见 [LICENSE](LICENSE)。

歌曲、歌词和截图的版权归原作者，不随代码授权。
