import React from "react";
import ReactPaginate from "react-paginate"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './pagination.scss'


export interface IPaginationProps {
    initialPage?: number;
    marginPagesDisplayed?: number;
    pageCount: number;
    pageRangeDisplayed?: number;
    onChange: ({ selected }: { selected: number }) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({ initialPage, marginPagesDisplayed, pageCount, pageRangeDisplayed, onChange }: any) => {
    return (
        <ReactPaginate
            initialPage={initialPage}
            marginPagesDisplayed={marginPagesDisplayed}
            pageCount={pageCount}
            pageRangeDisplayed={pageRangeDisplayed}
            onPageChange={onChange}
            containerClassName="Pagination"
            activeClassName="Pagination__active"
            pageLinkClassName="Pagination__page-link"
            breakLinkClassName="Pagination__break-link"
            nextLinkClassName="Pagination__next-link"
            previousLinkClassName="Pagination__previous-link"
            pageClassName="Pagination__page-item"
            breakClassName="Break__break-item"
            nextClassName="Pagination__next-item"
            previousClassName="Pagination__previous-item"
            previousLabel={
                <>
                    <ArrowBackIosIcon />
                </>
            }
            nextLabel={
                <>
                    <ArrowForwardIosIcon />
                </>
            }
        />

    )
}