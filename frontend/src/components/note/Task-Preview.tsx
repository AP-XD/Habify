import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ITask from '../../interfaces/task';
import { getDifferentColor, INITIAL_NOTE_ID } from '../../utils/functions';
import TaskBody from './Task-Body';

interface ITaskPreviewProps {
    note: ITask;
    previousNote: ITask | null;
}

const NotePreview = ({ note, previousNote }: ITaskPreviewProps) => {
    const [hover, setHover] = useState<boolean>(false);
    const navigate = useNavigate();

    const isInitialNote: boolean = note._id === INITIAL_NOTE_ID;
    const isTheSameDate: boolean = new Date(note.startDate).toDateString() === new Date(previousNote?.startDate || 1).toDateString();

    return (
        <div className="note sm:mb-8 mb-6 text-left text-white" key={note._id}>
            {!isTheSameDate && (
                <div className="text-[#fff] text-2xl">
                    <h4>{new Date(note.startDate).toDateString()}</h4>
                </div>
            )}
            <TaskBody
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => !isInitialNote && navigate(`/update/${note._id}`)}
                bgColor={hover ? getDifferentColor(note.color, -10) : note.color}
                titleClassName={isInitialNote ? '' : 'hover:underline !cursor-pointer'}
                className={`${isInitialNote ? 'cursor-auto' : 'cursor-pointer'} note__body sm:mt-8 mt-6`}
                note={note}
                showImage={true}
                contentClassName={'max-h-[75px]'}
            />
        </div>
    );
};

export default NotePreview;
