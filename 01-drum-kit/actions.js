const playSound = (keyCode) => {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);

  // do nothing for keys not listed on page
  if (!audio) {
    return;
  }

  audio.currentTime = 0;
  audio.play();

  document.querySelector(`.key[data-key="${keyCode}"]`)
    .classList.add('playing');
};

const handleClick = function (_) {
  playSound(this.dataset.key);
};

const handleKey = function(event) {
  playSound(event.keyCode);
}

const removePlaying = (event) => {
  // skip all other transitions except transform
  if (event.propertyName !== 'transform') {
    return;
  }

  event.target.classList.remove('playing');
}

const keys = document.querySelectorAll('.key')
  .forEach(keyEl => keyEl.addEventListener('click', handleClick));
document.addEventListener('keydown', handleKey);
document.addEventListener('transitionend', removePlaying);