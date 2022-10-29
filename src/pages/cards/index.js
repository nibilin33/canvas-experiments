
window.onload = function() {
    const swiper = new Swiper(".cards", {
        effect: "cards",
        grabCursor: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
    });
    init();
}
let canvas = null;
let SPACING = 4,
    MARGIN = 100,
    ROWS = 800,
    COLS = 300,
    NUM_PARTICLES = ROWS * COLS,
    DRAG = 0.98,
    EASE = 0.25,
    THICKNESS = Math.pow(180, 2),
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
function animate() {
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
    requestAnimationFrame(animate);
}
function init() {
    canvas = document.getElementById("particles");
    ROWS = (document.body.clientHeight-MARGIN * 2)/SPACING;
    COLS = (document.body.clientWidth-MARGIN * 2)/SPACING;
    NUM_PARTICLES = ROWS * COLS;
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
    animate();
}
