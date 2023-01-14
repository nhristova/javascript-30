const sizes = {
  blur: 'px',
  size: 'vmin',
  radius: '%',
  colour: ''
}

const handleUpdate = function (ev) {
  // can use ev.target instead of this, if arrow fn
  document.documentElement.style.setProperty(`--${this.name}`, this.value + sizes[this.name]);
}

document.querySelectorAll('.controls input')
  .forEach(input => input.addEventListener('input', handleUpdate));