let slides = document.querySelectorAll('.slides__item');
let slideInterval = setInterval(nextSlide, 2000);
let currentSlide = 0;
let isPlaying = true;
let pauseIcon = document.querySelector('#pause');
let pauseButton = document.querySelector('.controls__pause');
let nextButton = document.querySelector('#next');
let previousButton = document.querySelector('#previous');
let controls = document.querySelector('.controls');
let indicatorsItems = document.querySelectorAll('.indicators__item');
let indicators = document.querySelector('.indicators');
let carousel = document.querySelector('.carousel');

const SPACE = 32;
const ARROW_RIGHT = 39;
const ARROW_LEFT = 37;

controls.style.display = 'flex';
indicators.style.display = 'flex';

function goToSlide(n) {
  slides[currentSlide].classList.toggle('active');
  indicatorsItems[currentSlide].classList.toggle('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.toggle('active');
  indicatorsItems[currentSlide].classList.toggle('active');
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function previousSlide() {
  goToSlide(currentSlide - 1);
}

function pauseSlideShow() {
  pauseIcon.className = 'fas fa-play';
  pauseButton.style.opacity = 1;
  isPlaying = false;
  clearInterval(slideInterval);
}

function playSlideShow() {
  pauseIcon.className = 'fas fa-pause';
  pauseButton.style.removeProperty('opacity');
  isPlaying = true;
  slideInterval = setInterval(nextSlide, 2000);
}

function indicatorsSlide(event) {
  let target = event.target;

  if (target.classList.contains('indicators__item')) {
      pauseSlideShow();
      goToSlide(+target.getAttribute('data-slide-to'));
  }
}

function pressKey(event) {
  if (isPlaying === false && event.keyCode === SPACE) playSlideShow();
  else pauseSlideShow();

  if (event.keyCode === ARROW_RIGHT) nextSlide();
  if (event.keyCode === ARROW_LEFT) previousSlide();
}

indicators.addEventListener('click', indicatorsSlide);

pauseButton.addEventListener('click', function() {
  if (isPlaying) pauseSlideShow();
  else playSlideShow();
});

nextButton.addEventListener('click', function() {
  pauseSlideShow();
  nextSlide();
});

previousButton.addEventListener('click', function() {
  pauseSlideShow();
  previousSlide();
});

document.addEventListener('keydown', pressKey);

let swipeStartX = null;
let swipeEndX = null;

function swipeStart(event) {
  swipeStartX = event.changedTouches[0].pageX;
}

function swipeEnd(event) {
  swipeEndX = event.changedTouches[0].pageX;
  swipeStartX - swipeEndX > 100 && previousSlide();
  swipeStartX - swipeEndX < -100 && nextSlide();
}

carousel.addEventListener('touchstart', swipeStart);
carousel.addEventListener('touchend', swipeEnd);



