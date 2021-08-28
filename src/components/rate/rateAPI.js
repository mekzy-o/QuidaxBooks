import { Router } from 'express';
import { addRating, getAverageRating } from './rateController';

const router = Router();

router.post('/:slug', addRating);
router.get('/:slug', getAverageRating);

export default router;
