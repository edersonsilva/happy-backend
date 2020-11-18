
import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import User from '../models/User';
import userView from '../views/user_view';

export default {
  async index(request: Request, response: Response) {

    const usersRepository = getRepository(User);
    const users = await usersRepository.find();

    return response.json(userView.renderMany(users));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail(id);

    return response.json(userView.render(user));
  },

  async create(request: Request, response: Response) {

    const {
      avatar,
      name,
      email,
      password,
      created_at,
      updated_at,
    } = request.body;
  
    const usersRepository = getRepository(User);

    const data = {
      avatar,
      name,
      email,
      password,
      created_at,
      updated_at,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = usersRepository.create(data);
  
    await usersRepository.save(user);
  
    return response.status(201).json(user)
  }
}