import React, {useCallback, useState} from 'react';
import {useDropzone} from "react-dropzone";
import classNames from "classnames";

import {Select} from "shared/ui/select";
import {Radio} from "shared/ui/radio";
import {Input} from "shared/ui/input";
import {Button} from "shared/ui/button/button";

import cls from "./createTest.module.sass"

const types = [
    {id: "text", name: "Matn"},
    {id: "image", name: "Rasm"}
]

export const CreateTest = () => {

    const {getInputProps, getRootProps} = useDropzone()

    const [questionList, setQuestionList] = useState([
        {
            id: "custom1",
            type: "text",
            variantList: [{id: "custom1", type: "text", checked: true}]
        }
    ])

    const onAddVariant = (questionId) => {
        setQuestionList(prevState =>
            prevState.map(item => {
                if (item.id === questionId) {
                    const ID = Number(item.variantList[item.variantList.length - 1].id.slice(6, 7)) + 1
                    return {
                        id: item.id,
                        type: item.type,
                        variantList: [...item.variantList, {id: `custom${ID}`, type: "text"}]
                    }
                } else return item
            })
        )
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

    const selectQuestionType = (type, id) => {
        setQuestionList(prevState =>
            prevState.map(item => {
                if (item.id === id) {
                    return {
                        id: item.id, type,
                        variantList: item.variantList
                    }
                } else return item
            })
        )
    }

    const onChangeTrueVersion = (questionId, variantId) => {
        // setTrueVariant(prev =>
        // [
        //     {questionId, variantId},
        //     ...prev.filter(item => item.questionId !== questionId)
        // ],
        // )
    }

    const onAddQuestion = () => {
        const ID = Number(questionList[questionList.length - 1].id.slice(6, 7)) + 1
        setQuestionList(prevState => [...prevState, {
            id: `custom${ID}`,
            type: "text",
            variantList: [{id: "custom1", type: "text", checked: true}]
        }])
    }

    const onRemoveQuestion = (id) => {
        setQuestionList(prevState =>
            prevState.filter(item => item.id !== id)
        )
    }

    console.log(questionList, "questionList")

    const renderVariants = (list, ID) => {
        return list.map(item => {
            return (
                <div className={cls.variant}>
                    <Radio
                        name={item.id}
                        extraClasses={cls.variant__correct}
                        checked={item.checked}
                        onChange={() => onChangeTrueVersion(ID, item.id)}
                    />
                    <Select
                        options={[...types, {id: "textImage", name: "Matn va rasm"}]}
                        extraClass={cls.variant__type}
                        titleOption={"Javob turi"}
                        onChangeOption={(data) => selectVariantType(item.id, data, ID)}
                        defaultValue={item.type}
                    />
                    <div className={cls.variant__title}>
                        {
                            item.type === "text"
                                ? <Input
                                    placeholder={"Savolni yozing"}
                                />
                                : item.type === "image"
                                    ? <div
                                        className={cls.imageArea}
                                        {...getRootProps()}
                                    >
                                        <h2 className={cls.imageArea__title}>Rasm tanlang</h2>
                                        <input {...getInputProps()} type="file"/>
                                    </div>
                                    : <div className={cls.imageWrapper}>
                                        <Input
                                            placeholder={"Savolni yozing"}
                                        />
                                        <div
                                            className={cls.imageArea}
                                            {...getRootProps()}
                                        >
                                            <h2 className={cls.imageArea__title}>Rasm tanlang</h2>
                                            <input {...getInputProps()} type="file"/>
                                        </div>
                                    </div>
                        }
                    </div>
                    <div className={cls.variant__options}>
                        <i
                            className={classNames("fa-solid fa-pen", cls.change)}
                        />
                        <i
                            className={classNames("fa-solid fa-trash", cls.trash)}
                            onClick={() => onRemoveVariant(item.id, ID)}
                        />
                    </div>
                </div>
            )
        })
    }

    const renderQuestions = () => {
        return questionList.map(item => {
            return (
                <div className={cls.question}>
                    <div className={cls.question__header}>
                        <Select
                            options={types}
                            extraClass={cls.question__type}
                            title={"Savol turi"}
                            onChangeOption={(data) => selectQuestionType(data, item.id)}
                            defaultValue={item.type}
                        />
                        <div className={cls.innerWrapper}>
                            <i
                                className={classNames("fa-solid fa-pen", cls.change)}
                            />
                            {
                                questionList.length > 1 ?
                                    <i
                                        className={classNames("fa-solid fa-trash", cls.trash)}
                                        onClick={() => onRemoveQuestion(item.id)}
                                    />
                                    : null
                            }
                        </div>
                    </div>
                    <div className={cls.question__title}>
                        {
                            item.type === "text"
                                ? <Input
                                    placeholder={"Savolni yozing"}
                                />
                                : <div
                                    className={cls.imageArea}
                                    {...getRootProps()}
                                >
                                    <h2 className={cls.imageArea__title}>Rasm tanlang</h2>
                                    <input {...getInputProps()} type="file"/>
                                </div>
                        }
                    </div>
                    <div className={cls.question__container}>
                        {renderVariants(item.variantList, item.id)}
                    </div>
                    <i
                        className={classNames("fa-solid fa-plus", cls.plusVariant)}
                        onClick={() => onAddVariant(item.id)}
                    />
                </div>
            )
        })
    }

    return (
        <div className={cls.createTest}>
            <Select
                extraClass={cls.createTest__select}
                titleOption={"Fan tanlang"}
            />
            <div className={cls.createTest__container}>
                <h2 className={cls.title}>Test yaratish</h2>
                <div className={cls.wrapper}>
                    {renderQuestions()}
                </div>
                <div className={cls.plusQuestion}>
                    <i
                        className={classNames("fa-solid fa-plus", cls.plusQuestion__icon)}
                        onClick={onAddQuestion}
                    />
                </div>
            </div>
        </div>
    );
};

