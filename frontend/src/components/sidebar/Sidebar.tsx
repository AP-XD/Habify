import React, { useEffect, useState } from 'react';
import { BsPlusLg, BsStarFill } from 'react-icons/bs';
import { IoMdMenu } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { fetchAllNotes, setShowSidebar } from '../../features/routine/RoutineSlice';
import { useDebounce, useOnClickOutside, useWindowSize } from '../../hooks';
import FilterSearchInput from '../filter-Bar/Search-Input';
import { useAppDispatch } from './../../app/hooks';
import NoteSidebarPreview from './TaskSidebarPreview';
import ITask from '../../interfaces/task';

interface SidebarProps {
    sidebarRef: React.MutableRefObject<HTMLDivElement>;
    topRef?: React.MutableRefObject<HTMLDivElement>;
}

const Sidebar = ({ sidebarRef, topRef }: SidebarProps) => {
    const { user } = useAppSelector((store) => store.user);
    const { notes, isSidebarShown } = useAppSelector((store) => store.routine);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchTerm = useDebounce(searchQuery, 600);
    const isEditPage = window.location.pathname.includes('edit');
    const [width] = useWindowSize();
    const [starred, setStarred] = useState(false);

    useOnClickOutside(sidebarRef, () => width < 1024 && dispatch(setShowSidebar(false)));

    const dispatch = useAppDispatch();

    useEffect(() => {
        isEditPage && dispatch(fetchAllNotes({ user }));
    }, []);

    const filterStarredNotes = (notes: ITask[]) => {
        return starred ? notes.filter((note) => note.isStarred) : notes;
    };

    return (
        <div
            ref={sidebarRef}
            className={`h-full fixed top-0 left-0 z-50 duration-500 ${isSidebarShown ? 'translate-x-0' : '-translate-x-full'
                } xs:w-[28rem] w-[100%] transition-all z-[2000] ease-in-out bg-blue-900 overflow-x-hidden text-white text-left text-xl`}
        >
            <div className="fl sm:h-[65px] h-[50px] sticky top-0 left-0 bg-blue-900 z-[200]">
                <button onClick={() => dispatch(setShowSidebar(!isSidebarShown))} className={`text-4xl transition-colors lg:hidden absolute left-4 top-1/2 -translate-y-1/2 hover:text-blue-100`}>
                    <IoMdMenu />
                </button>
                <Link
                    to={'/'}
                    onClick={() => {
                        topRef && topRef.current.scrollIntoView({ behavior: 'smooth' });
                        width < 1024 && dispatch(setShowSidebar(false));
                    }}
                    className="lg:text-3xl text-2xl lg:ml-0 ml-12 w-[28rem] whitespace-nowrap overflow-hidden text-ellipsis font-semibold px-4 block break-all bg-blue-900 hover:text-blue-100 transition-colors"
                >
                    {user.name.split(' ')[0]}'s Routine
                </Link>
            </div>
            <div className="relative flex-between bg-blue-800">
                <FilterSearchInput
                    searchQuery={searchQuery}
                    isSidebar={true}
                    labelClassName="text-blue-800 left-6 text-2xl"
                    deleteClassName="text-blue-800 !right-6"
                    setSearchQuery={setSearchQuery}
                    inputClassName="mx-4 text-blue-800 shadow-lg my-3 rounded-2xl pl-9 pr-9 py-1 border-solid transition-all border-blue-500 focus:border-b-[3px] hover:bg-blue-50"
                />
            </div>
            <div>
                <Link
                    to={'/update'}
                    onClick={() => width < 1024 && dispatch(setShowSidebar(false))}
                    className="text-xl new-note py-5 px-4 bg-blue-500 font-semibold flex items-center cursor-pointer duration-300 transition-colors hover:bg-blue-600"
                >
                    <span className="mr-3 plus text-2xl transition-all duration-300">
                        <BsPlusLg />
                    </span>
                    Add A New Task To Routine
                </Link>
                <button
                    onClick={() => setStarred(!starred)}
                    className={`text-lg starred-btn py-5 px-4 w-full font-semibold flex items-center cursor-pointer duration-300 transition-colors hover:bg-blue-800 ${starred ? '!bg-blue-600' : 'bg-blue-700'
                        }`}
                >
                    <span className="mr-3 star text-2xl transition-all duration-300">
                        <BsStarFill />
                    </span>
                    View Starred Tasks
                </button>
                {isEditPage || debouncedSearchTerm !== ''
                    ? filterStarredNotes(notes)
                        .filter((note) => note.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
                        .map((note) => {
                            return note.isEndNote ? null : <NoteSidebarPreview note={note} key={note._id} />;
                        })
                    : filterStarredNotes(notes).map((note) => {
                        return note.isEndNote ? null : <NoteSidebarPreview note={note} key={note._id} />;
                    })}
            </div>
        </div>
    );
};

export default Sidebar;
