function initCarousel() {

  let buttonRight = document.querySelector('.carousel__arrow_right');
  let buttonLeft = document.querySelector('.carousel__arrow_left');

  buttonLeft.style.display = 'none';

  let carousel = document.querySelector('.carousel__inner');
  let carouselOffsetWidth = carousel.offsetWidth;

  let currentPosition = 1;

  buttonRight.addEventListener('click', () =>
    moveCarousel(-(currentPosition++ * carouselOffsetWidth)));

  buttonLeft.addEventListener('click', () =>
    moveCarousel(-(--currentPosition * carouselOffsetWidth)));

  function moveCarousel(moveWidth) {
    carousel.style.transform = `translateX(${moveWidth}px)`;

    if (currentPosition === 4) {
      buttonRight.style.display = 'none';
      currentPosition--;
    } else if (currentPosition === 0) {
      buttonLeft.style.display = 'none';
      currentPosition++;
    } else {
      buttonLeft.style.display = '';
      buttonRight.style.display = '';
    }
  }

}
