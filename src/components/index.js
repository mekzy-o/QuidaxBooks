import { Router } from 'express';
import { userRoutes } from './users';
import { bookRoutes } from './books';

// eslint-disable-next-line import/prefer-default-export
const routes = Router();

routes.use('/user', userRoutes);
routes.use('/books', bookRoutes);

export default routes;
