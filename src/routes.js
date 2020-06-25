import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientsController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import MydeliveriesController from './app/controllers/MydeliveriesController';
import StartdeliveryController from './app/controllers/StartdeliveryController';
import FinishdeliveryController from './app/controllers/FinishdeliveryController';
import CanceldeliveryController from './app/controllers/CanceldeliveryController';
import FileController from './app/controllers/FileController';
import DeliveryProblemController from './app/controllers/DeliveyProblemsController';
import SessionController from './app/controllers/SessionController';

import AuthMiddleware from './app/middlewares/auth';

const uploads = multer(multerConfig);

const routes = new Router();

routes.get(
  '/deliveryman/:deliveryman_id/mydeliveries',
  MydeliveriesController.index
);
routes.get('/deliveryman/:deliveryman_id/me', MydeliveriesController.show);

routes.post('/sessions', SessionController.store);

routes.put('/delivery/:id/startdelivery', StartdeliveryController.update);
routes.put('/delivery/:id/finish-delivery', FinishdeliveryController.update);

routes.get('/problem/delivery', DeliveryProblemController.index);
routes.get('/delivery/:delivery_id/problems', DeliveryProblemController.show);
routes.post('/delivery/:delivery_id/problems', DeliveryProblemController.store);

routes.post('/files/', uploads.single('file'), FileController.store);
routes.use(AuthMiddleware);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliveryman', DeliverymanController.index);
routes.get('/deliveryman/:deliveryman_id', DeliverymanController.show);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:deliveryman_id', DeliverymanController.update);
routes.delete('/deliveryman/:deliveryman_id', DeliverymanController.delete);

routes.get('/delivery', DeliveryController.index);
routes.get('/delivery-edit', DeliveryController.show);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:delivery_id', DeliveryController.update);
routes.delete('/delivery/:delivery_id', DeliveryController.delete);

routes.put('/problem/:id/cancel-delivery', CanceldeliveryController.update);

export default routes;
