import express from 'express';
import { showEvent ,createEvent } from '../Controllers/eventController.js';
import {verifyUser} from '../utils/verifyUser.js';
import { getEvent } from '../Controllers/eventController.js';

const router=express.Router();

router.get('/showEvent',showEvent);
router.post('/createEvent/:id',verifyUser,createEvent);
router.get('/getEvent',getEvent);

export default router;