import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = [];
    // Logic to show a window of pages, e.g., 1 ... 4 5 6 ... 10
    // For simplicity with < 10 pages, show all. For more, show window.
    // Let's implement a simple version first: [Prev] [1] [2] ... [Next]

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    // Determine slice of pages to show to avoid clutter
    let showPages = pages;
    if (totalPages > 7) {
        if (currentPage <= 4) {
            showPages = [...pages.slice(0, 5), '...', totalPages];
        } else if (currentPage >= totalPages - 3) {
            showPages = [1, '...', ...pages.slice(totalPages - 5)];
        } else {
            showPages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
        }
    }

    return (
        <div className="pagination-container">
            <button
                className={`pagination-btn prev-next ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            <div className="pagination-numbers">
                {showPages.map((page, index) => (
                    <button
                        key={index}
                        className={`pagination-btn number ${page === currentPage ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
                        onClick={() => typeof page === 'number' ? onPageChange(page) : null}
                        disabled={page === '...'}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                className={`pagination-btn prev-next ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
