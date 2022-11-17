import React, { useEffect, useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { useAppSelector } from '../../app/hooks';
import ITask from '../../interfaces/task';
import Notes from '../note/Tasks';

interface PaginationProps {
    items: ITask[];
}

const Pagination = ({ items }: PaginationProps) => {
    const { loading } = useAppSelector((store) => store.routine);
    const [currentItems, setCurrentItems] = useState<ITask[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, items]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <Notes notes={currentItems} />
            {!loading && (
                <ReactPaginate
                    breakLabel="..."
                    previousLabel={<MdArrowForwardIos className="text-3xl text-center rotate-180 sm:mx-2 mx-1 text-blue-700 transition-colors hover:text-blue-600" />}
                    nextLabel={<MdArrowForwardIos className="text-3xl text-center sm:mx-2 mx-1 text-blue-700 transition-colors hover:text-blue-600" />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    containerClassName="sm:mb-10 mb-7 sm:pt-3 pt-1 flex gap-1 items-center justify-center text-xl list-none"
                    pageLinkClassName="py-2 px-4 cursor-pointer rounded transition-all text-blue-700 hover:bg-blue-500 hover:text-white"
                    activeLinkClassName="bg-blue-600 !text-white"
                    renderOnZeroPageCount={() => null}
                />
            )}
        </>
    );
};

export default Pagination;
