import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useAppSelector } from '../../app/hooks';
import { useWindowSize } from '../../hooks';
import '../../styles/note.scss';
import Loading from '../UI/Loading';
import FilterBar from '../filter-Bar/Bar';
import NoteForm from './taskForm/Task-Form';
import NotePreview from './Task-Preview';
import ITask from '../../interfaces/task';

interface NotesProps {
    notes: ITask[];
}

const Notes = ({ notes }: NotesProps) => {
    const { loading, isSidebarShown, isFilterBarShown } = useAppSelector((store) => store.routine);
    const [showFullAddForm, setShowFullAddForm] = useState<boolean>(false);
    const filterBarRef = useRef() as MutableRefObject<HTMLDivElement>;
    const [width] = useWindowSize();

    useEffect(() => {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 500);
    }, [isSidebarShown, isFilterBarShown]);

    return (
        <div
            style={{ paddingTop: isFilterBarShown ? (filterBarRef.current ? filterBarRef.current.offsetHeight + 20 : 112) : 30 }}
            className={`notes ${isSidebarShown && width > 1024 ? 'small-padding-x' : 'padding-x'} transition-all duration-500 relative`}
        >
            <FilterBar filterBarRef={filterBarRef} setShowFullAddForm={setShowFullAddForm} />

            <h5 className="sm:text-3xl text-xl text-left lg:mb-2 md:mb-3 mb-6 text-slate-500 font-bold text-[#8fc9ff]">Add a quick task</h5>
            <div className="relative">
                <button
                    onClick={() => setShowFullAddForm(!showFullAddForm)}
                    className={`${showFullAddForm ? 'rotate-45 bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                        }  text-white sm:p-2 p-[6px] transition-all shadow-md duration-300 z-30 sm:text-xl text-lg rounded-full absolute sm:-top-5 -top-4 left-1/2 -translate-x-1/2`}
                >
                    <BsPlusLg />
                </button>
                <NoteForm showFullAddForm={showFullAddForm} setShowFullAddForm={setShowFullAddForm} isShort={true} />
            </div>
            {loading ? (
                <Loading scaleSize={2} className="mt-20" />
            ) : (
                notes.map((note, index) => {
                    return <NotePreview note={note} key={`${note._id}${note.isEndNote && 'endNote'}`} previousNote={index === 0 ? null : notes[index - 1]} />;
                })
            )}
        </div>
    );
};

export default Notes;
