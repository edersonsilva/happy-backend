import Category from '../models/Category';

export default {
  render(category: Category) {
    return {
      id: category.id,
      name: category.name,
      products: category.products,
      created_at: category.created_at,
      updated_at: category.updated_at,
    }
  },

  renderMany(categories: Category[]) {
    return categories.map(category => this.render(category));
  }
}