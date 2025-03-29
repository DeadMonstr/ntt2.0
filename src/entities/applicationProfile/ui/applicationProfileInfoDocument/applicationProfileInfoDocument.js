import cls from "../applicationProfile.module.sass";
import {useDispatch, useSelector} from "react-redux";
import {
    applicationProfileSelectors,
    applicationProfileStatus
} from "entities/applicationProfile/model/selectors/applicationProfileSelectors";
import {Select} from "../../../../shared/ui/select";
import {API_URL, headers, useHttp} from "../../../../shared/api/base";
import {useParams} from "react-router";
import {useCallback, useEffect, useState} from "react";
import {fetchApplicationStatus} from "../../model/thunk/applicationProfileThunk";

const listData = [
    {id: "newRequest", name: "Yangi ariza", disabled: true},
    {id: "acceptedRequest", name: "Qabul qilingan"},
    {id: "rejectedRequest", name: "Rad etilgan"},
    {id: "returnRequest", name: "Tahrirlashga qaytarilgan"},
    {id: "invitedRequest", name: "Imtihonga chaqirilgan"}
]

export const ApplicationProfileInfoDocument = () => {

    const {id} = useParams()
    const {request} = useHttp()
    const dispatch = useDispatch()
    const data = useSelector(applicationProfileSelectors)
    const status = useSelector(applicationProfileStatus)
    const [selectedStatus, setSelectedStatus] = useState()

    useEffect(() => {
        if (id)
            dispatch(fetchApplicationStatus({id}))
    }, [id])

    useEffect(() => {
        if (selectedStatus && selectedStatus !== "newRequest")
            request(`${API_URL}students/student_requests/update/${id}`, "PATCH", JSON.stringify({status: selectedStatus}), headers())
                .then(res => console.log(res))
                .catch(err => console.log(err))
    }, [selectedStatus])

    return (
        <div className={`${cls.application__info} ${cls.application__box}`}>
            <h1>Ariza ma’lumotlari</h1>
            <div className={cls.application__info_wrapper}>
                <ul className={cls.application__info_infos}>
                    <li>Yo'nalish nomi <span>Matematika</span></li>
                    <li>Daraja <span>{data?.degree}</span></li>
                    <li>Ta'lim turi <span>{data?.shift}</span></li>
                    <li>Ta'lim tili <span>{data?.language}</span></li>
                </ul>
                <Select
                    defaultValue={status ?? "newRequest"}
                    title={"Ariza holati"}
                    options={listData}
                    onChangeOption={setSelectedStatus}
                />
            </div>
        </div>
    );
};