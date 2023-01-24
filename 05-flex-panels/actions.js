
const toggleOpen = function () {
  this.classList.toggle('open');
}

const toggleActive = function (event) {
  // skip all other transitions except flex-grow
  if (event.propertyName !== 'flex-grow') {
    this.classList.toggle('active');
  }
}

const panels = document.querySelectorAll('.panel');

  panels.forEach(panel => {
    panel.addEventListener('click', toggleOpen);
    panel.addEventListener('transitionend', toggleActive);
  });
