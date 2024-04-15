import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    let divCarousel = createElement(`
      <div class="carousel">
            <!--Кнопки переключения-->
            <div class="carousel__arrow carousel__arrow_right">
                <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </div>
            <div class="carousel__arrow carousel__arrow_left">
                <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
            </div>

            <div class="carousel__inner">
            </div>
       </div>
    `);

    let slidesCount = slides.length;

    let carouselInner = divCarousel.querySelector('.carousel__inner');

    slides.forEach(slide => {
      let carouselSlide = createElement(`
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${Number(slide.price).toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);

      const button = carouselSlide.querySelector('.carousel__button');

      button.addEventListener('click', () => {
        divCarousel.dispatchEvent(new CustomEvent("product-add", {
          detail: slide.id,
          bubbles: true
        }));
      });

      carouselInner.appendChild(carouselSlide);
    });

    let buttonArrowLeft = divCarousel.querySelector('.carousel__arrow_right');
    let buttonArrowRight = divCarousel.querySelector('.carousel__arrow_left');

    let currentPosition = 1;

    buttonArrowRight.style.display = 'none';

    buttonArrowLeft.addEventListener('click', () =>
      moveCarousel(-(currentPosition++ * getOffsetWidth())));

    buttonArrowRight.addEventListener('click', () =>
      moveCarousel(-(--currentPosition * getOffsetWidth())));


    function moveCarousel(moveWidth) {
      carouselInner.style.transform = `translateX(${moveWidth}px)`;

      if (currentPosition === slidesCount) {
        buttonArrowLeft.style.display = 'none';
        currentPosition--;
      } else if (currentPosition === 0) {
        buttonArrowRight.style.display = 'none';
        currentPosition++;
      } else {
        buttonArrowRight.style.display = '';
        buttonArrowLeft.style.display = '';
      }
    }

    function getOffsetWidth(){
      return carouselInner.offsetWidth;
    }

    this.elem = divCarousel;
  }
}
