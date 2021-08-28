import { Router } from 'express';
import { getFeaturedBooks, getSingleBookDetail, searchBooks } from './bookController';

const router = Router();

router.get('/featured', getFeaturedBooks);
router.get('/search', searchBooks);
router.get('/:slug', getSingleBookDetail);

export default router;
