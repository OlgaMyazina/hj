'use strict'

const sliderContainer = document.querySelector('.slider');
const sliders = sliderContainer.querySelector('.slides');
let currentSlide = sliders.firstElementChild;
currentSlide.classList.add('slide-current');
const controls = sliderContainer.querySelector('.slider-nav');

const next = controls.querySelector('[data-action = next]');
const prev = controls.querySelector('[data-action = prev]');
const first = controls.querySelector('[data-action = first]');
const last = controls.querySelector('[data-action = last]');

controls.addEventListener('click', event=>{
  const button = event.target;
  if(button.classList.contains('disabled')) return;
  currentSlide.classList.remove('slide-current');
  switch (button) {
    case next:
      currentSlide = currentSlide.nextElementSibling;
      break;
    case prev:
      currentSlide = currentSlide.previousElementSibling;
      break;
    case last:
      currentSlide = sliders.lastElementChild;
      break;
    case first:
      currentSlide = sliders.firstElementChild;
      break;
  }
  currentSlide.classList.add('slide-current');
  updateControls();
})

updateControls();

function updateControls(){
  Array.from(controls.children).forEach(button=>{
    button.classList.remove('disabled');
  });
  if (!currentSlide.nextElementSibling){
    next.classList.add('disabled');
    last.classList.add('disabled');
  }
  if(!currentSlide.previousElementSibling){
    first.classList.add('disabled');
    prev.classList.add('disabled');
  }
}
