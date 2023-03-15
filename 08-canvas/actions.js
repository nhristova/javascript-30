/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('draw');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
ctx.globalCompositeOperation = 'lighten';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

const drawLineSegment = (x, y) => {
  console.log(x,y);
  
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  [lastX, lastY] = [x, y];
}

/**
 * @param {PointerEvent} event 
 * @returns 
 */
const draw = (event) => {
  if (!isDrawing) return;
  // if (event.buttons !== 1) return;

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  drawLineSegment(event.offsetX, event.offsetY);

  // HSL https://mothereffinghsl.com/
  hue = hue >= 360 ? 0 : hue + 1;
  ctx.lineWidth <= 30 && ctx.lineWidth++;

}

const start = (event) => {
  isDrawing = true;
  // For mobile no need to get coordinates from changedTouches
  // event.offsetX is undefined, so ctx.moveTo returns immediately
  [lastX, lastY] = [event.offsetX, event.offsetY];
  ctx.lineWidth = 1;
}

const stop = (event) => {
  isDrawing = false;
  console.log('stop');

}

const test = (event) => {
  console.log(event);

}

// Use pointer events instead of mouse and touch events
canvas.addEventListener('pointerdown', start);
canvas.addEventListener('pointermove', draw); //
canvas.addEventListener('pointerup', stop);
canvas.addEventListener('pointerout', stop);