import { Router } from 'express';
import { registerUser, loginUser } from './userController';
import userValidationSchema from './userValidator';

const router = Router();

router.post('/signup', userValidationSchema.userValidation, registerUser);
router.post('/signin', userValidationSchema.userValidation, loginUser);

export default router;
