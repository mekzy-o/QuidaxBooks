import { Router } from 'express';
import { addorRemoveLike } from './likeController';
import Session from '../../libraries/sessionHelper';

const router = Router();

router.post('/:slug', Session.sessionCheck, addorRemoveLike);

export default router;
