const handleHover = (ev) => {
  ev.currentTarget.classList.add('hover');
};

const handleOut = (ev) => {
  ev.currentTarget.classList.remove('hover');
}

document.querySelectorAll('a.project')
  .forEach(project => {
    project.addEventListener('mouseover', handleHover);
    project.addEventListener('mouseout', handleOut);
  });