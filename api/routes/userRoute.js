import express from 'express';
import {user} from '../Controllers/userController.js';
const router=express.Router();

router.get('/',user);

export default router;