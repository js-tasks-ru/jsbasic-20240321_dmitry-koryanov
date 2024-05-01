import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';
import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product == null) {
      return;
    }

    let productExists = false;
    let cartItem;

    this.cartItems.forEach(item => {
      if (item.product.id === product.id) {
        productExists = true;
        item.count++;
        cartItem = item;
      }
    });

    if (!productExists) {
      cartItem = {product: product, count: 1};
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    this.cartItems.filter(cartItem => cartItem.product.id === productId).forEach(cartItem => {
      cartItem.count += amount;
      if (cartItem.count === 0) {
        this.#removeCartItem(cartItem);
      }
      this.onProductUpdate(cartItem);
    });
  }

  #removeCartItem(cartItem) {
    let indexOf = this.cartItems.indexOf(cartItem);
    this.cartItems.splice(indexOf, 1);
  }

  isEmpty() {
    return !(this.cartItems.length > 0);
  }

  getTotalCount() {
    return this.cartItems.reduce((total, cartItem) => total + cartItem.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, cartItem) => total + cartItem.product.price * cartItem.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");

    let divRootElement = document.createElement('div');

    this.cartItems.forEach(cartItem => {
      let productCard = this.renderProduct(cartItem.product, cartItem.count);
      productCard.querySelector('.cart-counter__button_minus')
        .addEventListener('click', () => this.updateProductCount(cartItem.product.id, -1));
      productCard.querySelector('.cart-counter__button_plus')
        .addEventListener('click', () => this.updateProductCount(cartItem.product.id, 1));
      divRootElement.append(productCard);
    });

    let formElement = this.renderOrderForm();
    formElement.addEventListener('submit', (event) => this.onSubmit(event));

    divRootElement.append(formElement);

    this.modal.setBody(divRootElement);
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) {
      return;
    }

    if (this.cartItems.length === 0) {
      this.modal.close();
      return;
    }

    // this.modal.elem.addEventListener('modal-close', () => {
    //   this.modal.elem.remove();
    // });
    let modalBody = document.querySelector('.modal__body');

    // Элемент, который хранит количество товаров с таким productId в корзине
    let productCount = modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);

    // Элемент с общей стоимостью всех единиц этого товара
    let productPrice = modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);

    // Элемент с суммарной стоимостью всех товаров
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

    productCount.textContent = cartItem.count;
    productPrice.textContent = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
    infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
  }

  onSubmit(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('.cart-buttons__button');
    // submitButton.disabled = true;
    submitButton.classList.add('is-loading');

    const formData = new FormData(event.target);

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          this.modal.setTitle('Success!');
          let elem = createElement(`
            <div class="modal__body-inner">
                  <p>
                    Order successful! Your order is being cooked :) <br>
                    We’ll notify you about delivery time shortly.<br>
                    <img src="/assets/images/delivery.gif">
                  </p>
            </div>
          `);
          this.modal.setBody(elem);
          this.cartItems = [];
          this.cartIcon.update(this);
        } else {
          throw new Error('Error');
        }
      });
    /*      .catch(error => {
            this.modal.setTitle('Error');
            this.modal.setBody(`
              <div class="modal__body-inner">
                <p>There was an error processing your order. Please try again later.</p>
              </div>
            `);
          });*/
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

