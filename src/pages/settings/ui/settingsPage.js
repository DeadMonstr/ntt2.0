import cls from "./settings.module.sass"
import {useDispatch, useSelector} from "react-redux";
import {
    getSettingsData, getSettingsDegree,
    getSettingsDirection,
    getSettingsHeader
} from "../../../entities/settings/model/settingsSelector";



import {useEffect, useMemo, useState} from "react";
import {SettingsFilter, SettingsHeader, SettingsLists} from "../../../features/settings";
import {
    fetchOrganizationList,
    fetchOrganizationTypeDegree,
    fetchOrganizationTypeList
} from "../../../entities/settings/model/settingsThunk";
import {Pagination} from "../../../features/pagination";

const filter = [
    {name: "Yo’nalishlar", id: 1},
    {name: "Darajalar", id: 2},
]

export const SettingsPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = useMemo(() => 9, [])
    const settingsDirection = useSelector(getSettingsDirection)
    const settingsDegree = useSelector(getSettingsDegree)
    const settingsHeader = useSelector(getSettingsHeader)
    const [active, setActive] = useState(settingsHeader[0]?.id)
    const [activeFilter, setActiveFilter] = useState(filter[0]?.id)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOrganizationList())
    }, [])

    useEffect(() => {
        if (active && currentPage) {
            if (activeFilter === 1) {
                dispatch(fetchOrganizationTypeList({id: active, currentPage, pageSize}))
            } else {
                dispatch(fetchOrganizationTypeDegree({id: active, currentPage, pageSize}))
            }
        }
    }, [active, currentPage, dispatch, activeFilter])
    return (
        <div className={cls.settings}>


            <SettingsHeader active={active} setActive={setActive} settingsHeader={settingsHeader}/>

            <SettingsFilter active={active} activeFilter={activeFilter} setActiveFilter={setActiveFilter}
                            filterItem={filter}/>


            <SettingsLists

                activeFilter={activeFilter}
                data={activeFilter === 1 ? settingsDirection?.results : settingsDegree?.results}/>

            <Pagination
                totalCount={activeFilter === 1 ? settingsDirection?.count : settingsDegree?.count}
                onPageChange={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
            />
        </div>
    );
};

