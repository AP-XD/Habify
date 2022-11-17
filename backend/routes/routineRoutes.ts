import express from 'express';
import controller from '../controllers/routineControllers';

const router = express.Router();

router.post('/create', controller.createRoutine);
router.patch('/update/:customLabelID', controller.updateRoutine);
router.delete('/:customLabelID', controller.deleteRoutine);
router.get('/:authorID', controller.readAllRoutine);

export = router;
