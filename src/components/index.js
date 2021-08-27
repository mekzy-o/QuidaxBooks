import { Router } from 'express';
import { userRoutes } from './users';

// eslint-disable-next-line import/prefer-default-export
const routes = Router();

routes.use('/user', userRoutes);

export default routes;
