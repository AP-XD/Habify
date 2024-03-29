import React from 'react';
import { INITIAL_NOTE_ID } from '../../utils/functions';
import ITask from '../../interfaces/task';
import { useNavigate, useParams } from 'react-router-dom';
import NoteInfo from '../note/Task-Info';
import { AiFillStar } from 'react-icons/ai';
import { useAppDispatch } from '../../app/hooks';
import { setShowSidebar } from '../../features/routine/RoutineSlice';
import { useWindowSize } from '../../hooks';
import { defaultNoteTypes } from '../../utils/data';

interface NoteSidebarPreviewProps {
    note: ITask;
}

const NoteSidebarPreview = ({ note }: NoteSidebarPreviewProps) => {
    const isInitialNote: boolean = note._id === INITIAL_NOTE_ID;
    const navigate = useNavigate();
    const params = useParams();
    const currentNoteOpenedId = params.noteID;
    const dispatch = useAppDispatch();
    const [width] = useWindowSize();

    return (
        <div
            onClick={() => {
                if (isInitialNote) return;
                navigate(`/update/${note._id}`);
                width < 1024 && dispatch(setShowSidebar(false));
            }}
            className={`sm:pt-2 pt-1 sm:pb-1 pb-[2px] px-4 ${currentNoteOpenedId === note._id ? '!bg-blue-700' : 'bg-blue-800'
                } my-[2px] transition-all duration-200 hover:bg-blue-900 text-left w-full ${isInitialNote ? '' : 'cursor-pointer'}`}
        >
            <h4 className="text-lg whitespace-nowrap overflow-hidden text-ellipsis">{note.title}</h4>
            <div className="flex-between">
                <h5 className="text-sm text-blue-500">{new Date(note.startDate).toDateString()}</h5>
                <div>
                    {note.isStarred && <NoteInfo className="!text-base !py-[1px] !px-[6px] mr-1" text={<AiFillStar className="text-[1.3rem] inline-block pb-1" />} color="#0950c1" />}
                    <NoteInfo text={note.type ? note.type.labelName : defaultNoteTypes[0].labelName} color="#0950c1" className="!text-base mr-0 !py-[1px] !px-[6px]" />
                </div>
            </div>
        </div>
    );
};

export default NoteSidebarPreview;
