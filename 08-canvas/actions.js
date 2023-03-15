/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('draw');
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

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

/**
 * @param {MouseEvent|TouchEvent} event 
 * @returns 
 */
const draw = (event) => {
  if (!isDrawing) return;
  // if (event.buttons !== 1) return;

  //console.log(event);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();

  [lastX, lastY] = [event.offsetX, event.offsetY];

  hue = hue >= 360 ? 0 : hue + 1;
  ctx.lineWidth <= 30 && ctx.lineWidth++;

  // HSL https://mothereffinghsl.com/
}

const start = (event) => {
  isDrawing = true;
  [lastX, lastY] = [event.offsetX, event.offsetY];
  ctx.lineWidth = 1;
}

const stop = (event) => {
  isDrawing = false;
}

// Desktop
canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stop);
canvas.addEventListener('mouseout', stop);

// Mobile
// TODO: Test on mobile
canvas.addEventListener('touchstart', start);
canvas.addEventListener('touchmove', draw); //
canvas.addEventListener('touchend', stop);
canvas.addEventListener('touchcancel', stop);