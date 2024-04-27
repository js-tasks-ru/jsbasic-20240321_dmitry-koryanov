import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
        <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
      </div>
    </div>`);

    this.divInner = this.elem.querySelector('.products-grid__inner');

    this.products.forEach(product => {
      let productCard = new ProductCard(product);
      this.divInner.append(productCard.elem);
    });
  }

  updateFilter(filters){
    this.filters = Object.assign(this.filters, filters);

    this.divInner.innerHTML = '';

    for (let i = 0; i < this.products.length; i++){

      if (this.filters.noNuts && this.products[i].nuts === true) {
        continue;
      }

      if (this.filters.vegeterianOnly && this.products[i].vegeterian !== true) {
        continue;
      }

      if (this.products[i].spiciness > this.filters.maxSpiciness) {
        continue;
      }

      if (this.filters.category && this.products[i].category !== this.filters.category) {
        continue;
      }

      let productCard = new ProductCard(this.products[i]);
      this.divInner.append(productCard.elem);
    }
  }
}
