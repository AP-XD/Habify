import { Document } from 'mongoose';
import IUser from './userInterfaces';
import ICustomLabel from './routineInterfaces';

export default interface ITask extends Document {
    title: string;
    author: IUser;
    startDate: number;
    endDate: number;
    content?: string;
    color: string;
    image?: string;
    type: ICustomLabel;
    category?: ICustomLabel;
    rating: number;
    isEndNote?: boolean;
    isLocked?: boolean;
    isStarred?: boolean;
}

export interface ITaskType {
    name: string;
    color?: string;
}
