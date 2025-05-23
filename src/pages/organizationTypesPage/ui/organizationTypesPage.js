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
import {fetchRegionDistrict} from "entities/oftenUsed/model/thunk/oftenUsedThunk";


export const OrganizationTypesPage = () => {
    const regionLocal = localStorage.getItem("regionLocal")
    const typeLocal = localStorage.getItem("typeLocal")

    const dispatch = useDispatch()
    const cards = useSelector(organizationTypeCard)

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = useMemo(() => 9, [])
    const [selectRegion, setSelectRegion] = useState(regionLocal ? regionLocal : 1)
    const [selectType, setSelectType] = useState(typeLocal ? typeLocal : 1)


    const [selectedDistrict , setSelectedDistrict] = useState(null)

    localStorage.setItem("regionLocal", selectRegion)
    localStorage.setItem("typeLocal", selectType)

    useEffect(() => {

        setSelectRegion(regionLocal)
        setSelectType(typeLocal)
    }, [])


    useEffect(() => {
        if (selectRegion && selectType) {
            dispatch(fetchOrganizationTypesCards({
                organization_type: selectType,
                offset: (currentPage-1)*pageSize,
                limit: pageSize,
                // currentPage: currentPage,
                region: selectRegion,
                district: selectedDistrict
            }))
        }
    }, [currentPage, dispatch, pageSize, selectRegion, selectType , selectedDistrict])


    useEffect(() => {
        if (selectRegion)
            dispatch(fetchRegionDistrict(selectRegion))
    } , [selectRegion])



    return (
        <Box extraClass={cls.mainBox}>
            <div className={cls.mainBox__extraBox}>
                <div className={cls.mainBox__extraBox__typeBox}>
                    <OrganizationTypesFilter
                        setSelectRegion={setSelectRegion}
                        selectRegion={selectRegion}
                        setSelectType={setSelectType}
                        setSelectedDistrict={setSelectedDistrict}
                        selectType={selectType}
                        selectedDistrict={selectedDistrict}
                    />
                </div>
                {/*{cards.length >= pageSize && */}
                <Pagination
                    totalCount={cards?.count}
                    onPageChange={setCurrentPage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                />
            {/*}*/}
            </div>
        </Box>
    );
};

