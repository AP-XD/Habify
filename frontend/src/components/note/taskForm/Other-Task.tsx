import React from 'react';
import ITask from '../../../interfaces/task';
import OtherNoteBtn from './Other-Task-Button';

interface OtherNotesProps {
    prevNote: ITask | null;
    nextNote: ITask | null;
}
const OtherNotes = ({ prevNote, nextNote }: OtherNotesProps) => {
    return (
        <div className="flex-between py-2 custom-border border-t-2 mt-4">
            <OtherNoteBtn isPrev={true} otherNote={prevNote} />
            <div className="sm:h-12 h-10 w-[1px] shrink-0 rounded-md bg-blue-200 block"></div>
            <OtherNoteBtn isPrev={false} otherNote={nextNote} />
        </div>
    );
};

export default OtherNotes;
