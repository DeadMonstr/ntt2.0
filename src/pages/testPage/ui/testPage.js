import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Pagination} from "features/pagination";
import {fetchTestList, getTestListDataCount, TestHeader, TestList} from "entities/test";
import {API_URL, useHttp} from "shared/api/base";

import cls from "./testPage.module.sass";
import {useNavigate} from "react-router";
import {Modal} from "shared/ui/modal";
import {Select} from "shared/ui/select";
import {getSettingsHeader} from "entities/settings/model/settingsSelector";
import {fetchOrganizationFields, getCreateTestFields} from "entities/createTest";
import {getSubjects} from "entities/oftenUsed/model/selector/oftenUsedSelector";
import {fetchOrganizationList} from "entities/settings/model/settingsThunk";
import {fetchSubjects} from "entities/oftenUsed/model/thunk/oftenUsedThunk";

export const TestPage = () => {

    useEffect(() => {
        dispatch(fetchOrganizationList())
        dispatch(fetchSubjects())
    }, [])

    const dispatch = useDispatch()
    const {request} = useHttp()
    const navigate = useNavigate()

    const organizationTypes = useSelector(getSettingsHeader)
    const fields = useSelector(getCreateTestFields)
    const subjects = useSelector(getSubjects)
    const dataCount = useSelector(getTestListDataCount)

    const [active, setActive] = useState(false)
    const [selectedSub, setSelectedSub] = useState("all")
    const [selectedField, setSelectedField] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = useMemo(() => 50, [])

    // useEffect(() => {
    //     dispatch(fetchTestList())
    // }, [])

    useEffect(() => {
        if (selectedField || selectedSub || pageSize || currentPage)
            dispatch(fetchTestList({
                subject: selectedSub,
                field: selectedField,
                offset: (currentPage - 1) * pageSize,
                limit: pageSize,
            }))
    }, [selectedField, selectedSub, pageSize, currentPage])

    const onChangeType = (id) => {
        dispatch(fetchOrganizationFields({id}))
    }

    const onCreateTest = () => {

        const res = {
            name: null,
            field: [],
            subject: null,
            duration: null,
            blocks: [
                {
                    text: null,
                    to_json: {
                        type: "text"
                    },
                    questions: [
                        {
                            isTrue: true,
                            answer: null,
                            to_json: {
                                type: "text"
                            }
                        },
                        {
                            isTrue: false,
                            answer: null,
                            to_json: {
                                type: "text"
                            }
                        }
                    ]
                }
            ]
        }

        request(`${API_URL}test/test/crud/create/`, "POST", JSON.stringify(res))
            .then(res => navigate(`/admin/testProfile/${res.id}`))
    }

    return (
        <div className={cls.test}>
            <TestHeader onCreateTest={onCreateTest} setActive={setActive}/>
            <TestList/>
            <Pagination
                totalCount={dataCount}
                onPageChange={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
            />
            <Modal
                setActive={setActive}
                active={active}
                title={"Filter"}
                extraClass={cls.test__filter}
            >
                <Select
                    options={organizationTypes}
                    extraClass={cls.test__select}
                    titleOption={"Tashkilot turi"}
                    title={"Tashkilot turi"}
                    onChangeOption={onChangeType}
                    // defaultValue={profile?.field?.organization_type}
                />
                <Select
                    options={fields}
                    extraClass={cls.test__select}
                    title={"Soha turi"}
                    titleOption={"Hamma"}
                    onChangeOption={setSelectedField}
                    name={"field"}
                    // register={register}
                    defaultValue={selectedField}
                />
                <Select
                    options={subjects}
                    extraClass={cls.test__select}
                    title={"Fan tanlang"}
                    titleOption={"Hamma"}
                    name={"subject"}
                    defaultValue={selectedSub}
                    // register={register}
                    onChangeOption={setSelectedSub}
                    // defaultValue={"all"}
                />
            </Modal>
        </div>
    );
}
