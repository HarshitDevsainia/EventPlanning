import express from 'express';
import { signIn, signOut, signUp } from '../Controllers/authController.js';

const router=express.Router();

router.post('/signUp',signUp);
router.post('/signIn',signIn);
router.post('/signOut',signOut);

export default router;