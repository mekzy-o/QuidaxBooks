import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from './userController';
import userValidationSchema from './userValidator';

const router = Router();

router.post('/signup', userValidationSchema.userValidation, registerUser);
router.post('/signin', userValidationSchema.userValidation, loginUser);
router.get('/logout', logoutUser);

export default router;
