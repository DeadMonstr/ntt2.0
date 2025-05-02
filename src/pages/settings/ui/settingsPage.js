import cls from "./settings.module.sass"
import {useDispatch, useSelector} from "react-redux";
import {
    getSettingsData, getSettingsDegree,
    getSettingsDirection,
    getSettingsHeader
} from "entities/settings/model/settingsSelector";


import {useEffect, useMemo, useState} from "react";
import {SettingsFilter, SettingsHeader, SettingsLists} from "features/settings";
import {
    fetchOrganizationList,
    fetchOrganizationTypeDegree,
    fetchOrganizationTypeList
} from "entities/settings/model/settingsThunk";
import {Pagination} from "features/pagination";
import {useParams} from "react-router";

const filter = [
    {name: "Yo’nalishlar", id: 1},
    {name: "Darajalar", id: 2},
]

export const SettingsPage = () => {


    const {id} = useParams()

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = useMemo(() => 10, [])
    const settingsDirection = useSelector(getSettingsDirection)
    const settingsDegree = useSelector(getSettingsDegree)
    const settingsHeader = useSelector(getSettingsHeader)
    const [activeFilter, setActiveFilter] = useState(filter[0]?.id)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOrganizationList())
    }, [])

    useEffect(() => {
        if (id && currentPage) {
            if (activeFilter === 1) {
                dispatch(fetchOrganizationTypeList({id: id, currentPage, pageSize}))
            } else {
                dispatch(fetchOrganizationTypeDegree({id: id, currentPage, pageSize}))
            }
        }
    }, [id, currentPage, dispatch, activeFilter])


    return (
        <div className={cls.settings}>


            {/*<SettingsHeader/>*/}

            <SettingsFilter filterData={settingsHeader} organizationType={id}
                            activeFilter={activeFilter} setActiveFilter={setActiveFilter}
                            filterItem={filter}/>


            <div style={{maxHeight: "calc(100vh - 33rem)", overflow: "auto"}}>
                <SettingsLists
                    activeFilter={activeFilter}
                    data={activeFilter === 1 ? settingsDirection?.results : settingsDegree?.results}
                />
            </div>

             <Pagination
                    totalCount={activeFilter === 1 ? settingsDirection?.count : settingsDegree?.count}
                    onPageChange={setCurrentPage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                />

        </div>
    );
};

