import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import FoodTruckController from './controllers/FoodTruckController';
import ProductController from './controllers/ProductController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/foodtrucks', FoodTruckController.index);
routes.get('/foodtrucks/:id', FoodTruckController.show);
routes.post('/foodtrucks', upload.array('images'), FoodTruckController.create);

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', upload.array('images'), ProductController.create);

export default routes;