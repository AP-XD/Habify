import express from 'express';
import controller from '../controllers/taskControllers';

const router = express.Router();

router.get('/read/:noteID', controller.readTask);
router.get('/query/:authorID', controller.queryTask);
router.post('/create', controller.createTask);
router.patch('/update/:noteID', controller.updateTask);
router.delete('/:noteID', controller.deleteTask);
router.get('/:authorID', controller.readAllTask);

export = router;
