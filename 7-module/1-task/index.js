import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {

    let ribbonMenu = createElement(`
      <!--Корневой элемент RibbonMenu-->
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <!--Ссылки на категории-->
        <nav class="ribbon__inner">
        </nav>

        <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    let ribbonInner = ribbonMenu.querySelector('.ribbon__inner');

    categories.forEach(category => {
      let ribbonLink = createElement(`
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `);
      ribbonInner.append(ribbonLink);
    });

    ribbonMenu.querySelector('.ribbon__arrow_left').addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonMenu.querySelector('.ribbon__arrow_right').addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      ribbonMenu.querySelector('.ribbon__arrow_left').classList.toggle('ribbon__arrow_visible',
        ribbonInner.scrollLeft > 0);
      ribbonMenu.querySelector('.ribbon__arrow_right').classList.toggle('ribbon__arrow_visible',
        ribbonInner.scrollLeft < ribbonInner.scrollWidth - ribbonInner.clientWidth);
    });

    ribbonInner.addEventListener('click', this.#chooseCategory);
    this.elem = ribbonMenu;
  }

  #chooseCategory = (event) => {

    if(!event.target.classList.contains('ribbon__item')){
      return
    }

    event.preventDefault();

    let ribbonLink = event.target;

    let ribbonLinks = ribbonLink.parentElement.children;

    for (let link of ribbonLinks) {
      link.classList.remove('ribbon__item_active');
    }

    ribbonLink.classList.add('ribbon__item_active');

    this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
      detail: ribbonLink.dataset.id,
      bubbles: true
    }));

    return true;
  }

}
