import Category from '../models/Category';
import ProductsView from './product_view';

export default {
  render(category: Category) {
    return {
      id: category.id,
      name: category.name,
      created_at: category.created_at,
      updated_at: category.updated_at,
      products: ProductsView.renderMany(category.products),
    }
  },

  renderMany(categories: Category[]) {
    return categories.map(category => this.render(category));
  }
}