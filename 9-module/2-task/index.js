import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    const carousel = new Carousel(slides);
    const carouselContainer = document.querySelector('[data-carousel-holder]');
    carouselContainer.append(carousel.elem);

    const ribbonMenu = new RibbonMenu(categories);
    const ribbonMenuContainer = document.querySelector('[data-ribbon-holder]');
    ribbonMenuContainer.append(ribbonMenu.elem);

    const stepSlider = new StepSlider({steps: 5, value: 3});
    const stepSliderContainer = document.querySelector('[data-slider-holder]');
    stepSliderContainer.append(stepSlider.elem);

    const cartIcon = new CartIcon();
    const cartIconContainer = document.querySelector('[data-cart-icon-holder]');
    cartIconContainer.append(cartIcon.elem);

    const cart = new Cart(cartIcon);

    let response = await fetch('products.json');
    let products = await response.json();

    const productsGrid = new ProductsGrid(products);

    const productsGridContainer = document.querySelector('[data-products-grid-holder]');
    productsGridContainer.innerHTML = '';
    productsGridContainer.append(productsGrid.elem);

    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value
    });

    document.body.addEventListener('product-add', (event) => {
      cart.addProduct(event.detail);
    });

    document.querySelector('.slider').addEventListener('slider-change', (event) => {
      productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    document.querySelector('.ribbon').addEventListener('ribbon-select', (event) => {
      productsGrid.updateFilter({
        category: event.detail
      });
    });

    document.getElementById('nuts-checkbox').addEventListener('change', () => {
      productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked
      });
    });

    document.getElementById('vegeterian-checkbox').addEventListener('change', () => {
      productsGrid.updateFilter({
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked
      });
    });
  }
}
