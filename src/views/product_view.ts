import Product from "../models/Product";
import ImagesProductstView from '../views/images_products_view';

export default {
  render(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      images: ImagesProductstView.renderMany(product.images_product),
      created_at: product.created_at,
      updated_at: product.updated_at,
    }
  },

  renderMany(products: Product[]) {
    return products.map(product => this.render(product));
  }
}