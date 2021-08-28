import { Router } from 'express';
import { getUserCartItem, addToCartItem } from './cartController';
import Session from '../../libraries/sessionHelper';

const router = Router();

router.get('/', Session.sessionCheck, getUserCartItem);
router.post('/:slug', Session.sessionCheck, addToCartItem);

export default router;
