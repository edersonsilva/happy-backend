import FoodTruck from '../models/FoodTruck';
import ImagesView from '../views/images_view';

export default {
  render(foodTruck: FoodTruck) {
    return {
      id: foodTruck.id,
      name: foodTruck.name,
      latitude: foodTruck.latitude,
      longitude: foodTruck.longitude,
      about: foodTruck.about,
      instructions: foodTruck.instructions,
      opening_hours: foodTruck.opening_hours,
      open_on_weekends: foodTruck.open_on_weekends,
      images: ImagesView.renderMany(foodTruck.images),
      created_at: foodTruck.created_at,
      updated_at: foodTruck.updated_at,
    }
  },

  renderMany(foodTrucks: FoodTruck[]) {
    return foodTrucks.map(foodTruck => this.render(foodTruck));
  }
}