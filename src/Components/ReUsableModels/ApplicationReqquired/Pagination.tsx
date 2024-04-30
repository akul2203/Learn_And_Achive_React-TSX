/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, MouseEvent } from "react";

interface PaginationProps {
  isvisible:boolean;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  last,
  first,
  totalPages,
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  numberOfElements,
  isvisible
}) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>, page: number) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  // Calculate the range of page numbers to display
  const pageRange = () => {
    const maxPagesToShow = 3;
    const pages = [];
    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = pageRange();

  const startIndex = Math.min(currentPage * itemsPerPage + 1, totalItems);
  const endIndex = Math.min((currentPage + 1) * itemsPerPage, totalItems);

  return (
    <div style={{ display: isvisible ? "block" : "none" }}>
    <nav aria-label="Page navigation example" className="table-pagination" >
      <p className="text_dark fs-16 fw-600 mb-0">
        Showing {startIndex} to {endIndex} of {totalItems} entries
      </p>
      <ul className="pagination mb-0">
        <li className={`p-2 mx-2 ms-0 ${first ? "d-none" : ""}`}>
          <a
            className={`fs-16 fw-500 secondary ${first ? "disabled" : ""}`}
            href={first ? "#" : "#"}
            onClick={(event) => {
              if (!first) {
                handleClick(event, currentPage - 1);
              } else {
                event.preventDefault(); // Prevent default behavior if disabled
              }
            }}
          >
            Previous
          </a>
        </li>

        {pages.map((page) => (
          <li
            className={`page-item ${page === currentPage ? "active" : ""}`}
            key={page}
          >
            <a
              className="page-link "
              href="#"
              onClick={(event) => handleClick(event, page)}
            >
              {page + 1}
            </a>
          </li>
        ))}

        <li className={`p-2 mx-2 ms-0 ${last ? "d-none" : ""}`}>
          <a
            className={`fs-16 fw-500 secondary`}
            href="#"
            onClick={(event) => {
              if (!last) {
                handleClick(event, currentPage + 1);
              } else {
                event.preventDefault(); // Prevent default behavior if disabled
              }
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default Pagination;
