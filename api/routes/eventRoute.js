import express from 'express';
import { showEvent ,createEvent } from '../Controllers/eventController.js';
import {verifyUser} from '../utils/verifyUser.js';

const router=express.Router();

router.get('/showEvent',showEvent);
router.post('/createEvent/:id',verifyUser,createEvent);

export default router;