import React, { useCallback } from 'react';
import classNames from "classnames";
import { usePagination, DOTS } from "shared/lib/hooks/usePagination";
import cls from "./pagination.module.sass";

export const Pagination = React.memo((props) => {
    const {
        totalCount,
        onPageChange,
        currentPage,
        pageSize,
        className
    } = props;


    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount: 1,
        pageSize,
    });
    const onNext = () => {
        if (currentPage < Math.ceil(totalCount / pageSize)) {
            onPageChange(currentPage + 1);
        }
    };

    const onPrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const renderPageNumbers = useCallback(() => {
        return paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
                return <li key={index} className={classNames(cls.pagination_item, 'dots')}>&#8230;</li>;
            }
            return (
                <li
                    key={index}
                    className={classNames(cls.pagination_item, {
                        [cls.selected]: pageNumber === currentPage
                    })}
                    // @ts-ignore
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </li>
            );
        });
    }, [currentPage, onPageChange, paginationRange]);

    if (!totalCount) return null;

    return (
        <div className={cls.pagination}>
            <ul className={classNames(cls.pagination_container, className)}>
                {currentPage > 1 && (
                    <li
                        className={classNames(cls.pagination_item, cls.arrow)}
                        onClick={onPrevious}
                    >
                        <i className="fas fa-arrow-left"></i>
                    </li>
                )}
                {renderPageNumbers()}
                {currentPage < Math.ceil(totalCount / pageSize) && (
                    <li
                        className={classNames(cls.pagination_item, cls.arrow)}
                        onClick={onNext}
                    >
                        <i className="fas fa-arrow-right"></i>
                    </li>
                )}
            </ul>
        </div>
    );
})
