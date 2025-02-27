import React, {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";

import {Table} from "shared/ui/table";
import {Select} from "shared/ui/select";

import cls from "./organizationProfileApplications.module.sass";
import {
    fetchOrganizationProfileApplications,
    fetchOrganizationProfileDegrees, fetchOrganizationProfileFields, fetchOrganizationProfileShifts
} from "../../model/thunk/organizationProfileThunk";
import {
    getOrganizationProfileApplications, getOrganizationProfileData,
    getOrganizationProfileDegrees, getOrganizationProfileFields, getOrganizationProfileShifts
} from "../../model/selector/organizationProfileSelector";
import {fetchEducationLanguage, getEducationLanguages} from "../../../oftenUsed";
import {fetchShifts} from "../../../oftenUsed/model/thunk/oftenUsedThunk";
import {getShifts} from "../../../oftenUsed/model/selector/oftenUsedSelector";

export const OrganizationProfileApplications = memo(() => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const data = useSelector(getOrganizationProfileApplications)
    const organization = useSelector(getOrganizationProfileData)
    const languages = useSelector(getEducationLanguages)
    const fields = useSelector(getOrganizationProfileFields)
    const shifts = useSelector(getOrganizationProfileShifts)
    const degree = useSelector(getOrganizationProfileDegrees)

    const [field_id, setSelectedFields] = useState()
    const [shift_id, setSelectedShifts] = useState()
    const [degree_id, setSelectedDegree] = useState()
    const [language_id, setSelectedLanguages] = useState()

    useEffect(() => {
        dispatch(fetchEducationLanguage())
        if (organization?.organization_type?.id) {
            dispatch(fetchOrganizationProfileShifts(organization?.organization_type?.id))
            dispatch(fetchOrganizationProfileDegrees(organization?.organization_type?.id))
            dispatch(fetchOrganizationProfileFields(organization?.organization_type?.id))
        }
    }, [dispatch, organization?.organization_type?.id])

    useEffect(() => {
        dispatch(fetchOrganizationProfileApplications({
            organization_id: id, field_id, degree_id,shift_id,language_id
        }))
    }, [id,field_id,degree_id,shift_id,language_id])

    const renderApplicationsList = useCallback(() => {
        return data?.map(item => {
            return (
                <tr>
                    <td>{item?.name}</td>
                    <td>{item?.phone}</td>
                    <td>{item?.degree}</td>
                    <td>{item?.field}</td>
                    <td>{item?.shift}</td>
                    <td>{item?.language}</td>
                    <td>{item?.date}</td>
                </tr>
            )
        })
    }, [data])

    return (
        <div className={cls.applications}>
            <div className={cls.applications__header}>
                <h2 className={cls.applications__title}>Arizalar</h2>
                <Select onChangeOption={setSelectedDegree} options={degree} extraClass={cls.applications__select}
                        titleOption={"Bakalavriat"}/>
                <Select onChangeOption={setSelectedFields} options={fields} extraClass={cls.applications__select}
                        titleOption={"Yo’nalish"}/>
                <Select onChangeOption={setSelectedShifts} options={shifts} extraClass={cls.applications__select}
                        titleOption={"Ta’lim turi"}/>
                <Select onChangeOption={setSelectedLanguages} options={languages} extraClass={cls.applications__select}
                        titleOption={"Ta’lim tili"}/>
            </div>
            <div className={cls.applications__content}>
                <Table extraClass={cls.applications__table}>
                    <thead>
                    <tr>
                        <th>Ism sharif</th>
                        <th>Telefon raqam</th>
                        <th>Daraja</th>
                        <th>Ta’lim yo’nalishlari</th>
                        <th>Ta’lim turi</th>
                        <th>Ta’lim tili</th>
                        <th>Topshirilgan sana</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderApplicationsList()}
                    </tbody>
                </Table>
            </div>
        </div>
    );
})
