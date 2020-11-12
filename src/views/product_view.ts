import Product from "../models/Product";
import ImagesProductsView from '../views/images_products_view';

export default {
  render(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      created_at: product.created_at,
      updated_at: product.updated_at,
      images_products: ImagesProductsView.renderMany(product.images_products),
      category_id: product.category_id,
      foodtruck_id: product.foodtruck_id
    }
  },

  renderMany(products: Product[]) {
    return products.map(product => this.render(product));
  }
}