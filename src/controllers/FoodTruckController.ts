
import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import foodtruckView from '../views/foodtruck_view';
import * as Yup from 'yup';

import FoodTruck from '../models/FoodTruck';
import multer from 'multer';
import Product from '../models/Product';

export default {
  async index(request: Request, response: Response) {

    const foodtrucksRepository = getRepository(FoodTruck);
    const foodtrucks = await foodtrucksRepository.find({
      relations: ['images']
    });

    return response.json(foodtruckView.renderMany(foodtrucks));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const foodtrucksRepository = getRepository(FoodTruck);

    const foodtruck = await foodtrucksRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(foodtruckView.render(foodtruck));
  },

  async create(request: Request, response: Response) {

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      created_at,
      updated_at,
    } = request.body;
  
    const foodtrucksRepository = getRepository(FoodTruck);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const products = requestImages.map(image => {
      return { path: image.filename }
    })
  
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
      created_at,
      updated_at,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const foodtruck = foodtrucksRepository.create(data);
  
    await foodtrucksRepository.save(foodtruck);
  
    return response.status(201).json(foodtruck)
  }
}