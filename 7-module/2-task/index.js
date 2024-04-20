export default class Modal {
  constructor() {
    this.open();
  }

  open() {
    let modalWindow = this.#createElem();

    document.body.append(modalWindow);
    document.body.classList.add('is-modal-open');
    modalWindow.querySelector('.modal__close').addEventListener('click', this.close);
    document.addEventListener('keydown', this.#keyDownEventListener);
  }

  setTitle(title) {
    document.body.querySelector('.modal__title').textContent = title;
  }

  setBody(elem) {
    document.body.querySelector('.modal__body').innerHTML = elem.outerHTML;
  }

  close = () => {
    document.body.classList.remove('is-modal-open');
    document.body.querySelector('.modal').remove();
    document.removeEventListener('keydown', this.#keyDownEventListener);
  };

  #keyDownEventListener = (event) => {
    if (event.code === 'Escape') {
      this.close;
    }
  };

  #createElem() {
    let elem = document.createElement('div');
    elem.classList.add('modal');
    elem.insertAdjacentHTML("afterbegin", `
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
        `);

    return elem;
  }
}
