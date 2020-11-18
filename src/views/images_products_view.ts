import ImageProducts from '../models/ImageProduct';

export default {
  render (imageProduct: ImageProducts) {
    return {
      id: imageProduct.id,
      url: `http://localhost:3333/uploads/${imageProduct.path}`,
    }
  },

  renderMany(imageProducts: ImageProducts[]) {
    return imageProducts && imageProducts && imageProducts.map(imageProduct => this.render(imageProduct));
  }
}