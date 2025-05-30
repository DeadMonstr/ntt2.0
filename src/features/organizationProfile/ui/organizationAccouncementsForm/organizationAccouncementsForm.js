import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import cls from "./organizationAccouncementsForm.module.sass";
import {Button} from "shared/ui/button/button";
import {Select} from "shared/ui/select";
import {Input} from "shared/ui/input";
import {Form} from "shared/ui/form";
import {API_URL, headers, useHttp} from "shared/api/base";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchOrganizationProfileDegrees,
    getOrganizationProfileData,
    getOrganizationProfileDegrees
} from "entities/organizationProfile";
import {getAcademicYears, getEducationLanguages, getShifts} from "entities/oftenUsed/model/selector/oftenUsedSelector";
import {fetchAcademicYear, fetchEducationLanguage, fetchShifts} from "entities/oftenUsed/model/thunk/oftenUsedThunk";
import {
    fetchOrganizationProfileFields,
    fetchOrganizationProfileShifts
} from "entities/organizationProfile/model/thunk/organizationProfileThunk";
import {
    getOrganizationProfileFields,
    getOrganizationProfileShifts
} from "entities/organizationProfile/model/selector/organizationProfileSelector";
import {set} from "react-hook-form";
import {useNavigate} from "react-router";
import {onAddAlertOptions, onDeleteAlert} from "features/alert/model/slice/alertSlice";
import {MultiSelect} from "shared/ui/multiSelect";
import {onDeleteLanding} from "entities/organizationProfile/model/slice/organizationProfileSlice";
import TextEditor from "shared/ui/textEditor/TextEditor";

export const OrganizationAccouncementsForm = ({setIsChange, changedItem}) => {


    const academicYears = useSelector(getAcademicYears)
    const languages = useSelector(getEducationLanguages)
    const degrees = useSelector(getOrganizationProfileDegrees)
    const fields = useSelector(getOrganizationProfileFields)
    const orgData = useSelector(getOrganizationProfileData)
    const shifts = useSelector(getOrganizationProfileShifts)


    const dispatch = useDispatch()


    const [year, setYear] = useState(null)
    const [lang, setLang] = useState([])
    const [degree, setDegree] = useState(null)
    const [field, setField] = useState(null)
    const [shift, setShift] = useState(null)
    const [price, setPrice] = useState(null)
    const [grant, setGrant] = useState(false)

    const [editorDesc, setEditorDesc] = useState({})
    const [editorDemand, setEditorDemand] = useState({})

    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")


    useLayoutEffect(() => {
        if (changedItem?.id) {
            setEditorDesc({
                text: changedItem.desc,
                editorState: changedItem.desc_json
            })
            setEditorDemand({
                text: changedItem.requirements,
                editorState: changedItem.requirements_json
            })
            setYear(changedItem.year.id)
            setLang(changedItem.education_language.map((item) => ({label: item.name, value: item.id})))
            setDegree(changedItem.degree.id)
            setField(changedItem.field.id)
            setShift(changedItem.shift.map((item) => ({label: item.name, value: item.id})))
            setPrice(changedItem.price)
            setGrant(changedItem.grant)

            setStart(changedItem.start_date)
            setEnd(changedItem.expire_date)

        }
    }, [changedItem])


    useEffect(() => {
        if (orgData.organization_type.id) {
            dispatch(fetchOrganizationProfileDegrees(orgData.organization_type.id))
            dispatch(fetchOrganizationProfileFields(orgData.organization_type.id))
            dispatch(fetchOrganizationProfileShifts(orgData.organization_type.id))
            dispatch(fetchAcademicYear())
            dispatch(fetchEducationLanguage())
        }
    }, [orgData])



    const onSubmitDesc = useCallback((e) => {
        setEditorDesc(e)
    }, [setEditorDesc])

    const onSubmitTalablar = useCallback((e) => {
        setEditorDemand(e)
    }, [setEditorDemand])

    const onChangedGrant = useCallback((e) => {
        setGrant(e.target.checked)
    }, [])

    const onChangedPrice = useCallback((e) => {
        setPrice(e.target.value)
    }, [])

    const onChangedStartTime = useCallback((e) => {
        setStart(e.target.value)
    }, [])

    const onChangedEndTime = useCallback((e) => {
        setEnd(e.target.value)
    }, [])

    const onChangeLang = (value) => {
        setLang(value)
    }

    const onChangeShift = (value) => {
        setShift(value)
    }


    const {request} = useHttp()

    const navigate = useNavigate()


    const onSubmit = (e) => {

        e.preventDefault()
        const data = {
            organization: orgData.id,
            education_language: lang,
            year: year,
            desc: editorDesc.text,
            desc_json: editorDesc.editorState,
            degree,
            grant,
            price,
            requirements: editorDemand.text,
            requirements_json: editorDemand.editorState,
            shift,
            field,
            start_date: start,
            expire_date: end,
        }


        if (changedItem?.id) {
            request(`${API_URL}organizations/organization_landing_page/crud/update/${changedItem?.id}/`, "PUT", JSON.stringify(data), headers())
                .then(res => {
                    setIsChange(false)
                    dispatch(onAddAlertOptions({
                        status: true,
                        type: "success",
                        msg: res.message
                    }))
                    // navigate(-1)
                })
        } else{
            request(`${API_URL}organizations/organization_landing_page/crud/create/`, "POST", JSON.stringify(data), headers())
                .then(res => {
                    setIsChange(false)

                    dispatch(onAddAlertOptions({
                        status: true,
                        type: "success",
                        msg: res.message
                    }))
                })
        }



    }


    const deleteAnn  = () => {
        request(`${API_URL}organizations/organization_landing_page/crud/delete/${changedItem?.id}/`, "DELETE",null, headers())
            .then(res => {
                dispatch(onAddAlertOptions({
                    status: true,
                    type: "error",
                    msg: res.message
                }))
                // navigate(-1)
                setIsChange(false)
                dispatch(onDeleteLanding(changedItem.id))

            })
    }



    return (
        <>
            <Form extraClassname={cls.create} id={"createForm"} isChange={false} onSubmit={onSubmit}>
                <Button onClick={() => setIsChange(false)}>Ortga</Button>

                <div className={cls.create__change}>
                    <Select defaultValue={degree} required onChangeOption={setDegree} options={degrees}
                            extraClass={cls.create__select}
                            title={"Darajalar"}/>
                    <Select defaultValue={field} required onChangeOption={setField} options={fields}
                            extraClass={cls.create__select}
                            title={"Soha"}/>

                    <MultiSelect
                        title={"Talim shakli"}
                        defaultValue={shift}
                        required
                        onChange={onChangeShift}
                        value={shift}
                        options={shifts.map((item) => ({label: item.name, value: item.id}))}
                    />
                    {/*<Select defaultValue={shift} required onChangeOption={setShift} options={shifts}*/}
                    {/*        extraClass={cls.create__select}*/}
                    {/*        title={"Talim shakli"}/>*/}


                    <MultiSelect
                        title={"Talim tili"}
                        defaultValue={lang}
                        required
                        onChange={onChangeLang}
                        value={lang}
                        options={languages.map((item) => ({label: item.name, value: item.id}))}
                    />

                    <Select defaultValue={year} required onChangeOption={setYear} options={academicYears}
                            extraClass={cls.create__select}
                            title={"O'quv yili"}/>


                    <Input value={price} required onChange={onChangedPrice} type={"number"} title={"Kantrakt narxi"}
                           extraClass={cls.create__input}/>
                    <Input value={start} required onChange={onChangedStartTime} type={"date"} title={"Boshlanish sanasi"}
                           extraClass={cls.create__input}/>
                    <Input value={end} required onChange={onChangedEndTime} type={"date"} title={"Tugash sanasi"}
                           extraClass={cls.create__input}/>
                    <Input
                        // required
                        checked={grant}
                        onChange={onChangedGrant}
                        type={"checkbox"}
                        placeholder={"Grant"}
                    />
                    {/*<Textarea title={"Desc"}/>*/}
                </div>

            </Form>
            <div className={cls.item}>
                <TextEditor editorState={editorDesc?.editorState} required isSubmit={false} title={"Tavsif"}
                            onSubmit={onSubmitDesc}/>
                <TextEditor editorState={editorDemand?.editorState} isSubmit={false} title={"Talablar"}
                            onSubmit={onSubmitTalablar}/>

            </div>
            <Button id={"createForm"} type={"submit"}>Submit</Button>
            {changedItem?.id && <Button onClick={deleteAnn} id={"Delete"} type={"danger"}>Delete</Button>}


        </>
    );
};

