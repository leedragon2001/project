import React from "react";
import "./pagination.scss"

const Paginate = (PerPage: any, Total: any, Pagination: any) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(Total / PerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='paginate'>
            {pageNumbers.map(number => (
                <span key={number} className='items-page'>
                    <a onClick={() => Pagination(number)} href='!#' className='links-page'>
                        {number}
                    </a>
                </span>
            ))}
        </div>
    );
};

export default Paginate;