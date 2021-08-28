import { Router } from 'express';
import { userRoutes } from './users';
import { bookRoutes, bookServices } from './books';
import { cartRoutes } from './cart';
import { rateRoutes } from './rate';

// eslint-disable-next-line import/prefer-default-export
const routes = Router();

routes.use('/user', userRoutes);
routes.use('/books', bookRoutes);
routes.use('/cart', cartRoutes);
routes.use('/rate', rateRoutes);

export { bookServices };
export default routes;
