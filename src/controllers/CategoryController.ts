
import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Category from '../models/Category';
import categoryView from '../views/category_view';

export default {
  async index(request: Request, response: Response) {

    const categoriesRepository = getRepository(Category);
    const categories = await categoriesRepository.find({
      relations: ['products']
    });

    return response.json(categoryView.renderMany(categories));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const categoriesRepository = getRepository(Category);

    const category = await categoriesRepository.findOneOrFail(id);

    return response.json(categoryView.render(category));
  },

  async create(request: Request, response: Response) {

    const {
      name,
      created_at,
      updated_at
    } = request.body;
  
    const categoriesRepository = getRepository(Category);

    const data = {
      name,
      created_at,
      updated_at,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const category = categoriesRepository.create(data);
  
    await categoriesRepository.save(category);
  
    return response.status(201).json(category)
  }
}