"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("../config/logging"));
const taskModels_1 = __importDefault(require("../models/taskModels"));
const createTask = (req, res, next) => {
    logging_1.default.info('Attempting to register note...');
    let { title, author, startDate, endDate, content, color, image, type, category, rating } = req.body;
    const note = new taskModels_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title,
        author,
        startDate,
        endDate,
        content,
        color,
        image,
        type,
        category,
        rating
    });
    return note
        .save()
        .then((newNote) => {
        logging_1.default.info(`New note created...`);
        return res.status(201).json({ note: newNote });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const readTask = (req, res, next) => {
    const _id = req.params.noteID;
    logging_1.default.info(`Incoming read for ${_id} ...`);
    return taskModels_1.default.findById(_id)
        .populate('type')
        .populate('category')
        .then((note) => {
        if (note) {
            return res.status(200).json({ note });
        }
        else {
            return res.status(404).json({ message: 'note not found' });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const readAllTask = (req, res, next) => {
    const author_id = req.params.authorID;
    logging_1.default.info(`Incoming read all...`);
    return taskModels_1.default.find({ author: author_id })
        .populate('type')
        .populate('category')
        .exec()
        .then((notes) => {
        return res.status(200).json({
            count: notes.length,
            notes
        });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const queryTask = (req, res, next) => {
    const { title } = req.query;
    const author_id = req.params.authorID;
    logging_1.default.info(`Incoming query...`);
    const titleRegex = title ? new RegExp(title.toString(), 'i') : new RegExp('');
    return taskModels_1.default.find({ title: { $regex: titleRegex }, author: author_id })
        .populate('type')
        .populate('category')
        .exec()
        .then((notes) => {
        return res.status(200).json({
            count: notes.length,
            notes
        });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const updateTask = (req, res, next) => {
    const _id = req.params.noteID;
    logging_1.default.info(`Incoming update for ${_id} ...`);
    return taskModels_1.default.findById(_id)
        .exec()
        .then((note) => {
        if (note) {
            note.set(req.body);
            note.save()
                .then((newNote) => {
                logging_1.default.info(`Note updated...`);
                return res.status(201).json({ note: newNote });
            })
                .catch((error) => {
                logging_1.default.error(error);
                return res.status(500).json({ error });
            });
        }
        else {
            return res.status(404).json({ message: 'note not found' });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const deleteTask = (req, res, next) => {
    const _id = req.params.noteID;
    logging_1.default.info(`Incoming delete for ${_id} ...`);
    return taskModels_1.default.findByIdAndDelete(_id)
        .then((note) => {
        return res.status(200).json({ message: 'Note was deleted.' });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
exports.default = {
    createTask,
    readTask,
    readAllTask,
    queryTask,
    updateTask,
    deleteTask
};
