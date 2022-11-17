import IUser from './userInterfaces';

export default interface ICustomLabel extends Document {
    routineName: string;
    color: string;
    isCategoryRoutine: boolean;
    user: IUser;
}
