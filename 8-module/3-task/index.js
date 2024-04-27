export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    // ваш код
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
    // ваш код
    return !(this.cartItems.length > 0);
  }

  getTotalCount() {
    // ваш код
    return this.cartItems.reduce((total, cartItem) => total + cartItem.count, 0);
  }

  getTotalPrice() {
    // ваш код
    return this.cartItems.reduce((total, cartItem) => total + cartItem.product.price * cartItem.count, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

