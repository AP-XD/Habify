import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/userInterfaces';
import { ITaskType } from '../interfaces/taskInterfaces';

const UserSchema: Schema = new Schema(
    {
        // uid: { type: String, unique: true },
        uid: { type: String },
        name: { type: String },
        customTaskTypes: { type: String },
        customTaskCategories: { type: String }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);
