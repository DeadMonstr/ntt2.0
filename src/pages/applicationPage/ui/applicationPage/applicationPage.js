
import {ApplicationHeader, ApplicationList} from "entities/application";

import cls from "./applicationPage.module.sass";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchApplicationData} from "pages/applicationPage/model/thunk/applicationThunk";
import {ApplicationFilters} from "../applicationFilters/applicationFilters";
import {
    applicationDegreeSelectors,
    applicationFieldSelectors,
    applicationLanguageSelectors, applicationRequestsSelectors,
    applicationSearchSelectors,
    applicationShiftSelectors,
    applicationTypeSelectors
} from "../../model/selectors/applicationSelectors";
import {Navigate, Outlet, Route, Routes} from "react-router";



const listData = [

    {name: "allRequest", label: "Hamma arizalar"},
    {name: "newRequest", label: "Yangi arizalar"},
    {name: "acceptRequest", label: "Qabul qilinganlar"},
    {name: "rejectRequest", label: "Rad etilganlar"},
    {name: "returnRequest", label: "Tahrirlashga qaytarilganlar"},
    {name: "invitedRequest", label: "Imtihonga chaqirilganlar"}
]

export const ApplicationPage = () => {

    const dispatch = useDispatch()


    const requests = useSelector(applicationRequestsSelectors)


    const [active , setActive] = useState(listData[0].name)
    const search = useSelector(applicationSearchSelectors)
    const type = useSelector(applicationTypeSelectors)
    const degree = useSelector(applicationDegreeSelectors)
    const field = useSelector(applicationFieldSelectors)
    const shift = useSelector(applicationShiftSelectors)
    const language = useSelector(applicationLanguageSelectors)


    useEffect(() => {
        const data = {
            type_id: type,
            degree_id: degree,
            field_id:field,
            shift_id: shift,
            language_id: language,
            search,
            status: active

        }

        dispatch(fetchApplicationData(data))
    },[type, degree, field, shift, language,search , active])


    return (
        <div className={cls.applicationPage}>
            <ApplicationHeader data={listData} active={active} setActive={setActive}/>

            <div className={cls.applicationPage__header}>
                <h1 className={cls.applicationPage__title}>{listData.filter(item => item.name === active)[0]?.label || "Hamma arizalar"}</h1>
                <ApplicationFilters/>


            </div>
            <ApplicationList list={requests?.results || []}/>
        </div>
    )
}
