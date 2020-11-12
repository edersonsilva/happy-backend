import ImageProducts from '../models/ImagesProducts';

export default {
  render (imageProducts: ImageProducts) {
    return {
      id: imageProducts.id,
      url: `http://localhost:3333/uploads/${imageProducts.path}`,
    }
  },

  renderMany(imageProducts: ImageProducts[]) {
    return imageProducts.map(imageProduct => this.render(imageProduct));
  }
}