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
import {getUserOrganizationId} from "entities/userProfile";




const listData = [
    {name: "allRequest", label: "Hamma arizalar"},
    {name: "newRequest", label: "Yangi ariza"},
    {name: "acceptedRequest", label: "Qabul qilingan"},
    {name: "rejectedRequest", label: "Rad etilgan"},
    {name: "returnRequest", label: "Tahrirlashga qaytarilgan"},
    {name: "invitedRequest", label: "Imtihonga chaqirilgan"}
]

export const ApplicationPage = () => {

    const dispatch = useDispatch()
    const requests = useSelector(applicationRequestsSelectors)

    const [active, setActive] = useState(listData[0].name)


    const search = useSelector(applicationSearchSelectors)
    const type = useSelector(applicationTypeSelectors)
    const degree = useSelector(applicationDegreeSelectors)
    const field = useSelector(applicationFieldSelectors)
    const shift = useSelector(applicationShiftSelectors)
    const language = useSelector(applicationLanguageSelectors)
    const organization = useSelector(getUserOrganizationId)

    useEffect(() => {

        const data = {
            type_id: type,
            degree_id: degree,
            field_id: field,
            shift_id: shift,
            language_id: language,
            organization: organization,
            search,
            status: active
        }

        dispatch(fetchApplicationData(data))


    }, [type, degree, field, shift, language, search, active,organization])

    const role = localStorage.getItem("role")
    return (
        <div className={cls.applicationPage}>
            <ApplicationHeader data={listData} active={active} setActive={setActive}/>

            {role !== "organization" && <div className={cls.applicationPage__header}>
                <h1 className={cls.applicationPage__title}>{listData.filter(item => item.name === active)[0]?.label || "Hamma arizalar"}</h1>
                <ApplicationFilters/>


            </div>}
            <ApplicationList list={requests?.results || []}/>
        </div>
    )
}
