import express from 'express';
import { showEvent ,createEvent, getOneEvent ,getEvent, deleteEvent } from '../Controllers/eventController.js';
import {verifyUser} from '../utils/verifyUser.js';
import {  } from '../Controllers/eventController.js';

const router=express.Router();

router.get('/showEvent',showEvent);
router.post('/createEvent/:id',verifyUser,createEvent);
router.get('/getEvent',getEvent);
router.get('/getOneEvent/:eventID',getOneEvent);
router.delete('/:eventId/:userId',verifyUser,deleteEvent);

export default router;