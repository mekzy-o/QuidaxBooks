import { Router } from 'express';
import { getUserCartItem, addToCartItem } from './cartController';

const router = Router();

router.get('/', getUserCartItem);
router.post('/:id', addToCartItem);

export default router;
