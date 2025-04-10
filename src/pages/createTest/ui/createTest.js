import React, {useEffect, useRef, useState} from 'react';
import {useDropzone} from "react-dropzone";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";

import {onAddAlertOptions} from "features/alert/model/slice/alertSlice";
import {Select} from "shared/ui/select";
import {Radio} from "shared/ui/radio";
import {Input} from "shared/ui/input";
import {Button} from "shared/ui/button/button";
import {
    getCreateTestData,
    getCreateTestFields,
    getCreateTestProfile,
    createQuestion,
    createTest,
    fetchOrganizationFields,
    fetchTestProfile, deleteQuestion
} from "entities/createTest";

import cls from "./createTest.module.sass"
import {fetchOrganizationList, fetchOrganizationTypeList} from "entities/settings/model/settingsThunk";
import {getSettingsHeader} from "entities/settings/model/settingsSelector";
import {fetchSubjects} from "entities/oftenUsed/model/thunk/oftenUsedThunk";
import {API_URL, useHttp} from "shared/api/base";
import {useParams} from "react-router";
import {Form} from "shared/ui/form";
import {useForm} from "react-hook-form";
import {CreateTestQuestions, CreateTestVariants} from "features/createTest";

const types = [
    {id: "text", name: "Matn"},
    {id: "image", name: "Rasm"}
]

export const CreateTest = () => {

    const {id} = useParams()
    const {request} = useHttp()
    const formData = new FormData()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const {getInputProps, getRootProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            formData.append("res", JSON.stringify({
                answer: "hello",
                to_json: {}
            }))
            // image: acceptedFiles[0],
            formData.append("image", acceptedFiles[0])
            // request(`${API_URL}test/question/crud/update_delete/16/`, "PATCH", formData, {})
            // request(`${API_URL}test/question/crud/update_delete/15/`, "DELETE")

            request(`${API_URL}test/block/crud/update/8/`, "PATCH", formData, {})
                .then(res => console.log(res, "patch"))
            //     .catch(err => console.log(err, "patch err"))
        }
    })

    const testData = useSelector(getCreateTestData)
    const organizationTypes = useSelector(getSettingsHeader)
    const fields = useSelector(getCreateTestFields)
    const profile = useSelector(getCreateTestProfile)

    const [currentList, setCurrentList] = useState([])
    const [isChange, setIsChange] = useState()

    useEffect(() => {
        dispatch(fetchOrganizationList())
        dispatch(fetchSubjects())
    }, [])

    useEffect(() => {
        if (id)
            dispatch(fetchTestProfile({id}))
    }, [id])

    useEffect(() => {
        if (profile)
            setCurrentList(profile)
    }, [profile])

    // useEffect(() => {
    //     request(`${API_URL}test/test/crud/delete/17/`, "DELETE")
    //         .then(res => console.log(res, "red"))
    // }, [])

    useEffect(() => {
        // /test/block/crud/update/{id}/
        // formData.append("image", )
        //
    }, [])

    const [questionList, setQuestionList] = useState([
        {
            id: "custom1",
            type: "text",
            variantList: [{id: "custom1", type: "text", checked: true}],
            isChange: false
        }
    ])
    const [isError, setIsError] = useState("")

    const onChangeType = (id) => {
        dispatch(fetchOrganizationFields({id}))
    }

    const onRemoveQuestion = (id) => {
        request(`${API_URL}test/block/crud/delete/${id}/`, "DELETE")
            .then(res => console.log(res, "HELLO"))
        dispatch(deleteQuestion(id))
    }

    const onRemoveVariant = (id, questionId) => {
        setQuestionList(prevState =>
            prevState.map(item => {
                if (item.id === questionId) {
                    return {
                        id: item.id,
                        type: item.type,
                        variantList: item.variantList.filter(item => item.id !== id)
                    }
                } else return item
            })
        )
    }

    const selectVariantType = (id, type, ID) => {
        setQuestionList(prevState =>
            prevState.map(item => {
                if (item.id === ID) {
                    return {
                        id: item.id,
                        type: item.type,
                        variantList: item.variantList.map(item => {
                            if (item.id === id) {
                                return {id: item.id, type, checked: item.checked}
                            } else return item
                        })
                    }
                } else return item
            })
        )
    }

    const onChangeTrueVersion = (questionId, variantId) => {
        setQuestionList(prevState =>
            prevState.map(item => ({
                id: item.id,
                type: item.type,
                variantList: item.variantList.map(inner => {
                    if (inner.id === variantId) {
                        return {
                            id: inner.id,
                            type: inner.type,
                            checked: true
                        }
                    } else return {
                        id: inner.id,
                        type: inner.type,
                        checked: false
                    }
                })
            }))
        )
    }

    const onSaveQuestion = () => {
        if (currentList.blocks[currentList.blocks.length - 1].text.length > 1) {
            dispatch(onAddAlertOptions({
                status: true,
                type: "error",
                msg: "oldingi savol bo'sh"
            }))
            return null;
        }
        const li = {
            blocks: [{
                text: "",
                to_json: {
                    type: "text"
                },
                questions: [
                    {
                        answer: "",
                        isTrue: true,
                        to_json: {
                            type: "text"
                        }
                    },
                    {
                        answer: "",
                        isTrue: false,
                        to_json: {
                            type: "text"
                        }
                    }
                ]
            }]
        }
        request(`${API_URL}test/test/crud/add_block/${id}/`, "PATCH", JSON.stringify(li))
            .then(res => console.log(res))
    }

    const onAddVariant = (questionId) => {
        setCurrentList(prevState => ({
            ...prevState,
            blocks: prevState.blocks.map(item => {
                if (item.id === questionId) {
                    // const ID = Number(item.variantList[item.variantList.length - 1].id.slice(6, 7)) + 1
                    return {
                        ...item,
                        questions: [
                            ...item.questions,
                            {
                                questionId: item.id,
                                type: "text",
                                value: "",
                                id: item.questions[item.questions.length - 1]?.id + 1 ?? 1,
                                checked: !(item.questions.length >= 1)
                            }
                        ]
                    }
                } else return item
            })
        }))
    }

    const onSaveSingleQuestion = (id) => {
        const res = currentList.blocks
            .filter(item => item.id === id)
            .map(item => ({
                text: item.text,
                to_json: {type: item.to_json.type},
                // questions: item.questions
                //     .map(item => ({
                //         answer: item.value,
                //         isTrue: item.checked,
                //         to_json: {type: item.type}
                //     }))
            }))[0]
        console.log(res)
        request(`${API_URL}test/block/crud/update/${id}/`, "PATCH", JSON.stringify(res))
            .then(res => console.log(res, "patch"))
        // currentList.blocks
        //     .filter(item => item.id === id)[0]?.questions
        //     .map(item => ({
        //         answer: item.value,
        //         isTrue: item.checked,
        //         to_json: {type: item.type}
        //     }))
        //     .map(item => {
        //         request(`${API_URL}test/question/crud/update_delete/${id}/`, "PATCH", JSON.stringify(item))
        //             .then(res => console.log(res, "res"))
        //     })
    }

    // const onChangeField = (field) => {
    //     console.log(id, "id")
    //     dispatch(createQuestion({
    //         id,
    //         data: {field}
    //     }))
    // }
    //
    // const onChangeSubject = (subject) => {
    //     console.log(id, "id")
    //     dispatch(createQuestion({
    //         id,
    //         data: {subject}
    //     }))
    // }

    const onSubmitTest = (data) => {
        dispatch(createQuestion({id, data}))
    }

    const renderVariants = (list, ID) => {
        return list.map(item => {
            return (
                <CreateTestVariants/>
            )
        })
    }

    const renderQuestions = () => {
        return currentList?.blocks?.map((item, index) => {
            return (
                <CreateTestQuestions
                    data={item}
                    isChange={isChange}
                    setIsChange={setIsChange}
                    onAddVariant={() => onAddVariant(item.id)}
                    isDelete={profile?.blocks?.length > 1}
                    index={index + 1}
                    onRemoveQuestion={onRemoveQuestion}
                >
                    {renderVariants(item.questions, item.id)}
                </CreateTestQuestions>
            )
        })
    }

    return (
        <div className={cls.createTest}>
            <Form
                extraClassname={cls.createTest__header}
                onSubmit={handleSubmit(onSubmitTest)}
            >
                <div className={cls.wrapper}>
                    <Input
                        placeholder={"Test nomi"}
                        name={"name"}
                        register={register}
                        defaultValue={profile?.name}
                    />
                    <Input
                        type={"number"}
                        name={"duration"}
                        register={register}
                        placeholder={"Test vaqti"}
                        defaultValue={profile?.duration}
                    />
                </div>
                <div className={cls.selects}>
                    <Select
                        options={organizationTypes}
                        extraClass={cls.createTest__select}
                        titleOption={"Tashkilot turi"}
                        onChangeOption={onChangeType}
                        defaultValue={profile?.field?.organization_type}
                    />
                    <Select
                        options={fields}
                        extraClass={cls.createTest__select}
                        titleOption={"Soha turi"}
                        // onChangeOption={onChangeField}
                        name={"field"}
                        register={register}
                        defaultValue={profile?.field?.id}
                    />
                    <Select
                        extraClass={cls.createTest__select}
                        titleOption={"Fan tanlang"}
                        name={"subject"}
                        register={register}
                        // onChangeOption={onChangeSubject}
                    />
                </div>
            </Form>
            <div className={cls.createTest__container}>
                <h2 className={cls.title}>{"Test yaratish"}</h2>
                <div className={cls.wrapper}>
                    {renderQuestions()}
                    <Button
                        onClick={onSaveQuestion}
                        extraClass={cls.wrapper__btn}
                    >
                        Savol qo'shish
                    </Button>
                </div>
                {/*<div className={cls.plusQuestion}>*/}
                {/*    <i*/}
                {/*        className={classNames("fa-solid fa-plus", cls.plusQuestion__icon)}*/}
                {/*        onClick={onAddQuestion}*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

