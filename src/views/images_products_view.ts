import ImageProducts from '../models/ImagesProducts';

export default {
  render (image: ImageProducts) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    }
  },

  renderMany(images: ImageProducts[]) {
    return images.map(image => this.render(image));
  }
}