import { Router } from 'express';
import { userRoutes } from './users';
import { bookRoutes, bookServices } from './books';
import { cartRoutes } from './cart';
import { rateRoutes } from './rate';
import { likeRoutes } from './like';

// eslint-disable-next-line import/prefer-default-export
const routes = Router();

routes.use('/user', userRoutes);
routes.use('/books', bookRoutes);
routes.use('/cart', cartRoutes);
routes.use('/rate', rateRoutes);
routes.use('/like', likeRoutes);

export { bookServices };
export default routes;
