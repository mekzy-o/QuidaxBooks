import { Router } from 'express';
import { addRating, getAverageRating } from './rateController';
import Session from '../../libraries/sessionHelper';
import rateValidationSchema from './rateValidator';

const router = Router();
const { rateValidation } = rateValidationSchema;

router.post('/:slug', Session.sessionCheck, rateValidation, addRating);
router.get('/:slug', Session.sessionCheck, getAverageRating);

export default router;
