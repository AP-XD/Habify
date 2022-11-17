"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("../config/logging"));
const userModels_1 = __importDefault(require("../models/userModels"));
const validateUser = (req, res, next) => {
    logging_1.default.info('Token validated, returning user...');
    let firebase = res.locals.firebase;
    return userModels_1.default.findOne({ uid: firebase.uid })
        .then((user) => {
        if (user) {
            return res.status(200).json({ user });
        }
        else {
            return res.status(401).json({ message: 'user not found' });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const createUser = (req, res, next) => {
    logging_1.default.info('Attempting to register user...');
    let { uid, name } = req.body;
    let fire_token = res.locals.fire_token;
    const newUserId = new mongoose_1.default.Types.ObjectId();
    const user = new userModels_1.default({
        _id: newUserId,
        uid,
        name
    });
    return user
        .save()
        .then((newUser) => {
        logging_1.default.info(`New user ${uid} created...`);
        return res.status(201).json({ user: newUser, fire_token });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const updateUser = (req, res, next) => {
    const _id = req.params.userID;
    logging_1.default.info(`Incoming update for ${_id} ...`);
    return userModels_1.default.findById(_id)
        .exec()
        .then((user) => {
        if (user) {
            user.set(req.body);
            user.save()
                .then((newUser) => {
                logging_1.default.info(`User updated...`);
                return res.status(201).json({ user: newUser });
            })
                .catch((error) => {
                logging_1.default.error(error);
                return res.status(500).json({ error });
            });
        }
        else {
            return res.status(404).json({ message: 'user not found' });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const loginUser = (req, res, next) => {
    logging_1.default.info('Loggin in user...');
    let { uid } = req.body;
    let fire_token = res.locals.fire_token;
    return userModels_1.default.findOne({ uid })
        .then((user) => {
        if (user) {
            logging_1.default.info(`User ${uid} found, signing in...`);
            return res.status(200).json({ user, fire_token });
        }
        else {
            logging_1.default.info(`User ${uid} not found, register...`);
            return createUser(req, res, next);
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const readUser = (req, res, next) => {
    const _id = req.params.userID;
    logging_1.default.info(`Incoming read for ${_id} ...`);
    return userModels_1.default.findById(_id)
        .then((user) => {
        if (user) {
            return res.status(200).json({ user });
        }
        else {
            return res.status(404).json({ message: 'user not found' });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const readAllUser = (req, res, next) => {
    logging_1.default.info(`Incoming read all...`);
    return userModels_1.default.find()
        .exec()
        .then((users) => {
        return res.status(200).json({
            count: users.length,
            users
        });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
exports.default = {
    validateUser,
    createUser,
    loginUser,
    readUser,
    updateUser,
    readAllUser
};
