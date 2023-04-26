import express from 'express';
import * as AdminController from '../controllers/admin.controller'


const router = express.Router();

router.post('/addCourse', AdminController.addCourse);
router.delete('/deleteCourse/:id', AdminController.deleteCourse);





export default router;
