let movedLogo = null,
  shiftX = 0,
  shiftY = 0;

document.addEventListener('mousedown', event => {
  if (event.target.classList.contains('logo')) {
    movedLogo = event.target;
    const bounds = event.target.getBoundingClientRect();
    shiftX = event.pageX - bounds.left - window.pageXOffset;
    shiftY = event.pageY - bounds.top - window.pageYOffset;
  }
});

document.addEventListener('mousemove', event => {
  if (!movedLogo) {
    return;
  }

  event.preventDefault();
  movedLogo.style.left = event.pageX - shiftX + 'px';
  movedLogo.style.top = event.pageY - shiftY + 'px';
  movedLogo.classList.add('moving');
});

document.addEventListener('mouseup', event => {
  if (!movedLogo) {
    return;
  }

  movedLogo.style.visibility = 'hidden';
  const check = document.elementFromPoint(event.clientX, event.clientY)
    .closest('#trash_bin');
  movedLogo.style.visibility = 'visible';
  if (check) {
    movedLogo.remove();
  }
  movedLogo.classList.remove('moving');
  movedLogo = null;
});
