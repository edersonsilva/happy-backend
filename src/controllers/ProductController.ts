import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import productView from '../views/product_view';
import * as Yup from 'yup';

import multer from 'multer';
import Product from "../models/Product";

export default {
  async index(request: Request, response: Response) {

    const productsRepository = getRepository(Product);

    const products = await productsRepository.find({
      relations: ['images_products']
    });

    return response.json(productView.renderMany(products));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOneOrFail(id, {
      relations: ['images_products']
    });

    return response.json(productView.render(product));
  },

  async create(request: Request, response: Response) {

    const {
      name,
      description,
      price,
      quantity,
      created_at,
      updated_at,
    } = request.body;
  
    const productsRepository = getRepository(Product);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename }
    })
  
    const data = {
      name,
      description,
      price,
      quantity,
      images,
      created_at,
      updated_at,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required(),
      quantity: Yup.number().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const product = productsRepository.create(data);
  
    await productsRepository.save(product);
  
    return response.status(201).json(product)
  }
}