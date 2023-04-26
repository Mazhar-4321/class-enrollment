import express from 'express';
import * as userController from '../controllers/user.controller';
import * as StudentController from '../controllers/student.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/availableCourses', StudentController.availableCourses);

router.get('/myCourses/:email', StudentController.myCourses);





export default router;
