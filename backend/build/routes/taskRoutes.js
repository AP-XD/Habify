"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const taskControllers_1 = __importDefault(require("../controllers/taskControllers"));
const router = express_1.default.Router();
router.get('/read/:noteID', taskControllers_1.default.readTask);
router.get('/query/:authorID', taskControllers_1.default.queryTask);
router.post('/create', taskControllers_1.default.createTask);
router.patch('/update/:noteID', taskControllers_1.default.updateTask);
router.delete('/:noteID', taskControllers_1.default.deleteTask);
router.get('/:authorID', taskControllers_1.default.readAllTask);
module.exports = router;
