"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const extractFirebaseInfo_1 = __importDefault(require("../middleware/extractFirebaseInfo"));
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const router = express_1.default.Router();
router.get('/validate', extractFirebaseInfo_1.default, userControllers_1.default.validateUser);
router.get('/read/:userID', userControllers_1.default.readUser);
router.post('/create', extractFirebaseInfo_1.default, userControllers_1.default.createUser);
router.post('/login', extractFirebaseInfo_1.default, userControllers_1.default.loginUser);
router.patch('/update/:userID', userControllers_1.default.updateUser);
router.get('/', userControllers_1.default.readAllUser);
module.exports = router;
