const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

const setTime = function () {
  const date = new Date();

  const hourDeg = (date.getHours() / 12) * 360;
  const minutesDeg = (date.getMinutes() / 60) * 360;
  const secondsDeg = (date.getSeconds() / 60) * 360;

  // remove transition to avoid the hand glitching between 360 and 0
  if (secondsDeg === 0) {
    secondHand.classList.add('no-transition');
  }

  hourHand.style.transform = `rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `rotate(${minutesDeg}deg)`;
  secondHand.style.transform = `rotate(${secondsDeg}deg)`;

  if (secondsDeg !== 0 && secondHand.classList.contains('no-transition')) {
    secondHand.classList.remove('no-transition');
  }
}

setInterval(setTime, 1000);