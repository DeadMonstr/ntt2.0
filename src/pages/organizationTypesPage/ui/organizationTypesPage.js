import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    OrganizationTypesFilter,
    organizationTypeCard,
    fetchOrganizationTypesCards
} from "features/organizationTypes";
import {Pagination} from "features/pagination";
import {Box} from "shared/ui/box/box";

import cls from './organizationTypesPage.module.sass'


export const OrganizationTypesPage = () => {

    const dispatch = useDispatch()
    const cards = useSelector(organizationTypeCard)

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = useMemo(() => 9, [])
    const [selectRegion, setSelectRegion] = useState(1)
    const [selectType, setSelectType] = useState(1)

    useEffect(() => {
        if (selectRegion && selectType) {
            dispatch(fetchOrganizationTypesCards({
                id: selectType,
                region: selectRegion,
                currentPage: currentPage,
                pageSize: pageSize
            }))
        }
    }, [currentPage, dispatch, pageSize, selectRegion, selectType])

    return (
        <Box extraClass={cls.mainBox}>
            <div className={cls.mainBox__extraBox}>
                <div className={cls.mainBox__extraBox__typeBox}>
                    <OrganizationTypesFilter
                        setSelectRegion={setSelectRegion}
                        selectRegion={selectRegion}
                        setSelectType={setSelectType}
                        selectType={selectType}
                    />
                </div>
                <Pagination
                    totalCount={cards?.count}
                    onPageChange={setCurrentPage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                />
            </div>
        </Box>
    );
};

