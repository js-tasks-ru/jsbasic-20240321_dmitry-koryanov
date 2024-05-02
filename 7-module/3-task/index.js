export default class StepSlider {
  constructor({steps, value = 0}) {

    this.steps = steps;
    let slider = document.createElement('div');

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

    for (let i = 0; i < steps; i++){
      let step = document.createElement('span');

      if(i === value){
        step.classList.add('slider__step-active');
      }

      sliderSteps.append(step);
    }

    slider.append(sliderSteps);
    slider.addEventListener('click', this.moveSlider);

    this.elem = slider;
  }

  moveSlider = (event) => {

    let sliderChanged = this.elem;

    let sliderThumb = sliderChanged.querySelector('.slider__thumb');
    let sliderProgress = sliderChanged.querySelector('.slider__progress');
    let sliderValue = sliderChanged.querySelector('.slider__value');

    let left = event.clientX - sliderChanged.getBoundingClientRect().left;
    let leftRelative = left / sliderChanged.offsetWidth;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;

    sliderThumb.style.left = `${valuePercents}%`;
    sliderProgress.style.width = `${valuePercents}%`;
    sliderValue.textContent = value;

    this.#setActiveSpan(value + 1);

    let customEvent = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    });

    sliderChanged.dispatchEvent(customEvent);

    return true;
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
