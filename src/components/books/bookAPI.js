import { Router } from 'express';
import { getFeaturedBooks, getSingleBookDetail, searchBooks } from './bookController';
import searchValidationSchema from './bookValidator';

const router = Router();

router.get('/featured', getFeaturedBooks);
router.get('/search', searchValidationSchema.searchValidation, searchBooks);
router.get('/:slug', getSingleBookDetail);

export default router;
