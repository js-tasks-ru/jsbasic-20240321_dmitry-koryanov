export default class StepSlider {
  constructor({steps, value = 0}) {

    let slider = document.createElement('div');

    this.steps = steps;
    this.elem = slider;

    slider.classList.add('slider');

    slider.innerHTML = `
          <!--Ползунок слайдера с активным значением-->
          <div class="slider__thumb" style="left: 50%;">
            <span class="slider__value">${value}</span>
          </div>

          <!--Заполненная часть слайдера-->
          <div class="slider__progress" style="width: 50%;"></div>

          <!--Шаги слайдера-->
          <div class="slider__steps">
          </div>
    `;

    let sliderSteps = slider.querySelector('.slider__steps');

    for (let i = 0; i < steps; i++) {
      let step = document.createElement('span');

      if (i === value) {
        step.classList.add('slider__step-active');
      }

      sliderSteps.append(step);
    }

    slider.append(sliderSteps);
    slider.addEventListener('click', this.#moveSlider);

    let sliderThumb = slider.querySelector('.slider__thumb');

    sliderThumb.addEventListener('dragstart', () => false);
    sliderThumb.addEventListener('pointerdown', this.#onPointerDown);
    sliderThumb.addEventListener('pointerup', this.#onPointerUp);

    document.addEventListener('pointermove', this.#onPointerMove);
  }

  #onPointerDown = (event) => {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');
  };

  #onPointerUp = (event) => {
    this.elem.classList.remove('slider_dragging');
    this.#generateCustomeEvent();
  };

  #generateCustomeEvent = () => {
    let sliderChanging = this.elem;

    let sliderValue = sliderChanging.querySelector('.slider__value');
    let value = sliderValue.textContent;

    let customEvent = new CustomEvent('slider-change', {
      detail: Number(value),
      bubbles: true
    });

    sliderChanging.dispatchEvent(customEvent);
  }

  #changeThumbAndProgressStyles = (valuePercents) => {
    let slider = this.elem;

    let sliderThumb = slider.querySelector('.slider__thumb');
    let sliderProgress = slider.querySelector('.slider__progress');

    sliderThumb.style.left = `${valuePercents}%`;
    sliderProgress.style.width = `${valuePercents}%`;
  }

  #setAndGetSliderValue = (leftRelative) => {
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    this.elem.querySelector('.slider__value').textContent = value;
    return value;
  }

  #onPointerMove = (event) => {
    let sliderChanging = this.elem;

    if(!sliderChanging.classList.contains('slider_dragging')){
      return true;
    }

    event.preventDefault();

    let left = event.clientX - sliderChanging.getBoundingClientRect().left;
    let leftRelative = left / sliderChanging.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let valuePercents = leftRelative * 100;

    this.#changeThumbAndProgressStyles(valuePercents);
    let value = this.#setAndGetSliderValue(leftRelative);
    this.#setActiveSpan(value + 1);
  };

  #moveSlider = (event) => {

    let sliderChanged = this.elem;

    let left = event.clientX - sliderChanged.getBoundingClientRect().left;
    let leftRelative = left / sliderChanged.offsetWidth;

    let segments = this.steps - 1;
    let value = this.#setAndGetSliderValue(leftRelative);
    let valuePercents = value / segments * 100;

    this.#changeThumbAndProgressStyles(valuePercents);

    this.#setActiveSpan(value + 1);
    this.#generateCustomeEvent();
  }

  #setActiveSpan = (activeSpan) => {
    let sliderSteps = document.querySelectorAll('.slider__steps');

    let i = 0;
    sliderSteps.forEach(elem => {
      elem.classList.remove('slider__step-active');

      if(i++ === activeSpan){
        elem.classList.add('slider__step-active');
      }
    });
  }

}
