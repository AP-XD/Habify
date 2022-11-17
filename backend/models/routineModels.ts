import mongoose, { Schema } from 'mongoose';
import ICustomLabel from '../interfaces/routineInterfaces';

const CustomLabelSchema: Schema = new Schema({
    routineName: { type: String },
    color: { type: String },
    isCategoryRoutine: { type: Boolean },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model<ICustomLabel>('CustomLabel', CustomLabelSchema);
