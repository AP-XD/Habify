import React from 'react';
import ITask from '../../../interfaces/task';
import TaskBody from '../Task-Body';

interface NoteFormPreviewProps {
    isShort?: boolean;
    startDate: number;
    note: ITask;
}

const NoteFormPreview = ({ isShort, startDate, note }: NoteFormPreviewProps) => {
    return (
        <div className="text-left mt-4">
            <h4 className="sm:text-2xl text-xl text-[#fff] mb-1">Preview</h4>
            {isShort && (
                <div className="text-[#0950c1] text-xl">
                    <h4>{new Date(startDate).toDateString()}</h4>
                </div>
            )}
            <TaskBody className={isShort ? 'note__body my-8' : ''} note={note} />
        </div>
    );
};

export default NoteFormPreview;
