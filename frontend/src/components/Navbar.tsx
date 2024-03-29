import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { IoMdMenu } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setShowSidebar } from '../features/routine/RoutineSlice';
import { logout } from '../features/user/userSlice';
import { useWindowSize } from '../hooks';

interface NavbarProps {
    topRef?: React.MutableRefObject<HTMLDivElement>;
}

const Navbar = ({ topRef }: NavbarProps) => {
    const dispatch = useAppDispatch();
    const { isSidebarShown } = useAppSelector((store) => store.routine);
    const [width] = useWindowSize();

    const Logout = () => {
        dispatch(logout());
    };

    return (
        <div
            className={`flex sticky top-0 left-0 right-0 z-[999] shadow-lg items-center transition-all duration-500 justify-between ${isSidebarShown && width > 1024 ? 'small-padding-x' : 'padding-x'
                } py-4 text-white bg-blue-600 sm:h-[65px] h-[50px]`}
        >
            <button onClick={() => dispatch(setShowSidebar(!isSidebarShown))} className={`text-4xl transition-colors absolute left-4 top-1/2 -translate-y-1/2 hover:text-blue-100`}>
                <IoMdMenu />
            </button>
            <Link
                to={'/'}
                onClick={() => topRef && topRef.current.scrollIntoView({ behavior: 'smooth' })}
                className="md:text-3xl text-2xl font-bold cursor-pointer transition-colors hover:text-blue-100"
            >
                <span className="sm:block hidden md:ml-4">Habify</span>
                <img className="sm:hidden block ml-9 w-9 h-9 transition-opacity hover:opacity-90" src="/favicon.png" alt="Routine logo" />
            </Link>
            <div className="flex items-center">
                <Link to={'/update'} className="sm:text-3xl text-2xl cursor-pointer transition-all hover:rotate-90 hover:opacity-80 duration-500">
                    <BsPlusLg />
                </Link>
                <span className="sm:mx-4 mx-3 text-4xl">|</span>
                <button onClick={() => Logout()} className="sm:text-2xl text-xl cursor-pointer transition-all bg-blue-500 sm:px-4 px-3 py-1 rounded-md hover:bg-blue-600 hover:shadow-sm">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
