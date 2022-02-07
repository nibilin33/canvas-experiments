
import Stats from 'stats.js';
let canvas = null;
const  SPACING = 3,
MARGIN = 100,
ROWS = 100,
COLS = 300,
NUM_PARTICLES = ROWS * COLS,
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
    const ctx = canvas.getContext( '2d' );
    let imageData = ctx.createImageData(canvas.width,canvas.height);
    // for ( let i = 0; i < NUM_PARTICLES; i++ ) {
    //     let p = particleList[i];
    //     console.log( ~~p.x, "createImageData");
    //     //let n = 
    //     // b[n = ( ~~p.x + ( ~~p.y * w ) ) * 4] = 
    //     // b[n+1] = b[n+2] = COLOR, b[n+3] = 255;
    // }
	stats.end();

	requestAnimationFrame( animate ); 
}
function init() {
    canvas = document.getElementById("particles");
    canvas.width = COLS * SPACING + MARGIN * 2;
    canvas.height = ROWS * SPACING + MARGIN * 2;
    particleList = Array.from({
        length: NUM_PARTICLES
    }).map((i,index)=>{
        let p = Object.create( particle );
        p.x = p.originX = MARGIN + SPACING * ( i % COLS );
        p.y = p.originY = MARGIN + SPACING * Math.floor( i / COLS );
        return p;
    });
    if ( typeof Stats === 'function' ) {
        stats = new Stats();
        document.body.appendChild( stats.dom );
    }
    requestAnimationFrame( animate );
}

window.onload = function() {
    console.log("init");
    init();
}