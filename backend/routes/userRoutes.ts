import express from 'express';
import extractFirebaseInfo from '../middleware/extractFirebaseInfo';
import controller from '../controllers/userControllers';

const router = express.Router();

router.get('/validate', extractFirebaseInfo, controller.validateUser);
router.get('/read/:userID', controller.readUser);
router.post('/create', extractFirebaseInfo, controller.createUser);
router.post('/login', extractFirebaseInfo, controller.loginUser);
router.patch('/update/:userID', controller.updateUser);
router.get('/', controller.readAllUser);

export = router;
