import createElement from '../../assets/lib/create-element.js';

export default class Modal {

  #modal;

  constructor() {
    this.#modal = this.#createElem();
  }

  open() {
    document.body.append(this.#modal);
    document.body.classList.add('is-modal-open');
    this.#modal.querySelector('.modal__close').addEventListener('click', this.close);
    document.addEventListener('keydown', this.#keyDownEventListener);
  }

  setTitle(title) {
    this.#modal.querySelector('.modal__title').textContent = title;
  }

  setBody(elem) {
    this.#modal.querySelector('.modal__body').innerHTML = elem.outerHTML;
  }

  close = () => {
    document.body.classList.remove('is-modal-open');
    this.#modal.remove();
    document.removeEventListener('keydown', this.#keyDownEventListener);
  };

  #keyDownEventListener = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }
  };

  #createElem() {
    let elem = createElement( `
      <!--Корневой элемент Modal-->
      <div class="modal">
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title">
            </h3>
          </div>

          <div class="modal__body">
          </div>
        </div>
      </div>
    `);

    return elem;
  }
}
