
import Stats from 'stats.js';
let canvas = null;
const SPACING = 3,
    MARGIN = 100,
    ROWS = 100,
    COLS = 300,
    NUM_PARTICLES = ROWS * COLS,
    DRAG = 0.98,
    EASE = 0.25,
    THICKNESS = Math.pow(80, 2),
    COLOR = 220;
const particle = {
    vx: 0,
    vy: 0,
    x: 0,
    y: 0,
    originX: 0,
    originY: 0
};
let particleList = [];
let stats = null;
/** 
// Iterate through every pixel
for (let i = 0; i < imageData.data.length; i += 4) {
    // Modify pixel data
    imageData.data[i + 0] = 190;  // R value
    imageData.data[i + 1] = 0;    // G value
    imageData.data[i + 2] = 210;  // B value
    imageData.data[i + 3] = 255;  // A value
  }
  // Draw image data to the canvas
  ctx.putImageData(imageData, 20, 20);
*/
/**
位运算 NOT 是三步的处理过程：
1. 把运算数转换成 32 位数字
2. 把二进制数转换成它的二进制反码（0->1, 1->0）
3. 把二进制数转换成浮点数

  按位非运算符“~”
  对任一数值 x 进行按位非操作的结果为 -(x + 1)
  按位双非运算符“~~”
   ~~x就为 -(-(x+1) + 1)
   对于浮点数，~~value可以代替parseInt(value)，而且前者效率更高些
 */
function animate() {
    stats.begin();
    // monitored code goes here
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    let imageData = ctx.createImageData(w, canvas.height);
    let t = +new Date() * 0.001;
    // mx,my 目标要移动的粒子的坐标
    let mx = w * 0.5 + (Math.cos(t * 2.1) * Math.cos(t * 0.9) * w * 0.45),
        my = h * 0.5 + (Math.sin(t * 3.2) * Math.tan(Math.sin(t * 0.8)) * h * 0.45);
    
    let dy, dx;
    for (let i = 0; i < NUM_PARTICLES; i++) {
        let p = particleList[i];
        // 两个粒子的距离平方
        let d = (dx = mx - p.x) * dx + (dy = my - p.y) * dy;
        let f = -THICKNESS / d;
        // 如果两个粒子距离小于目标距离
        if (d < THICKNESS) {
            // 通过x,y获取角度
            t = Math.atan2(dy, dx);
            p.vx += f * Math.cos(t);
            p.vy += f * Math.sin(t);
        }
        p.x += (p.vx *= DRAG) + (p.originX - p.x) * EASE;
        p.y += (p.vy *= DRAG) + (p.originY - p.y) * EASE;
        let n = (~~p.x + (~~p.y * w)) * 4;
        imageData.data[n] = COLOR;
        imageData.data[n + 1] = COLOR;
        imageData.data[n + 2] = COLOR;
        imageData.data[n + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    stats.end();
    requestAnimationFrame(animate);
}
function init() {
    canvas = document.getElementById("particles");
    canvas.width = COLS * SPACING + MARGIN * 2;
    canvas.height = ROWS * SPACING + MARGIN * 2;
    particleList = Array.from({
        length: NUM_PARTICLES
    }).map((it, i) => {
        let p = Object.create(particle);
        p.x = p.originX = MARGIN + SPACING * (i % COLS);
        p.y = p.originY = MARGIN + SPACING * Math.floor(i / COLS);
        return p;
    });
    if (typeof Stats === 'function') {
        stats = new Stats();
        document.body.appendChild(stats.dom);
    }
    animate();
}

window.onload = function () {
    init();
}