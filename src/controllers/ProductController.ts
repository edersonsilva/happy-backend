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
      relations: ['images_products', 'foodtruck_id','category_id']
    });

    return response.json(productView.renderMany(products));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOneOrFail(id, {
      relations: ['images_products', 'foodtruck_id', 'category_id']
    });

    return response.json(productView.render(product));
  },

  async create(request: Request, response: Response) {

    const {
      name,
      description,
      price,
      quantity,
      foodtruck_id,
      category_id,
      created_at,
      updated_at,
    } = request.body;
  
    const productsRepository = getRepository(Product);

    const requestImages = request.files as Express.Multer.File[];

    const images_products = requestImages.map(imageProduct => {
      return { path: imageProduct.filename }
    })
  
    const data = {
      name,
      description,
      price,
      quantity,
      foodtruck_id,
      category_id,
      images_products,
      created_at,
      updated_at,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required(),
      quantity: Yup.number().required(),
      imageProducts: Yup.array(
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