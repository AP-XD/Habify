"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const routineControllers_1 = __importDefault(require("../controllers/routineControllers"));
const router = express_1.default.Router();
router.post('/create', routineControllers_1.default.createRoutine);
router.patch('/update/:customLabelID', routineControllers_1.default.updateRoutine);
router.delete('/:customLabelID', routineControllers_1.default.deleteRoutine);
router.get('/:authorID', routineControllers_1.default.readAllRoutine);
module.exports = router;
