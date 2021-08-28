import { Router } from 'express';
import { addRating, getAverageRating } from './rateController';
import Session from '../../libraries/sessionHelper';

const router = Router();

router.post('/:slug', Session.sessionCheck, addRating);
router.get('/:slug', Session.sessionCheck, getAverageRating);

export default router;
