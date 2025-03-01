import React, {useState} from 'react';
import classNames from "classnames";

import {Input} from "shared/ui/input";
import {Button} from "shared/ui/button/button";
import {Select} from "shared/ui/select";
import ExcQuestion from "./questionCreate/questionCreate";

import cls from "./createTest.module.sass"
import {useDropzone} from "react-dropzone";
import styles from "pages/createTest/ui/questionCreate/style.module.sass";
import {API_URL_DOC} from "shared/api/base";

export const CreateTest = () => {

    const [testList, setTestList] = useState([{id: "custom-1", name: "Hello", image: "l"}])
    const [questionList, setQuestionList] = useState([{id: "custom-1", image: ""}])
    const [variantsList, setVariantsList] = useState([{id: "custom-1"}])
    const [activeImage, setActiveImage] = useState([])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles[0], "selectedImage")
        }
    })

    const renderVariantList = (id) => {
        return variantsList.map(item => {
            if (id !== item.id) return null
            return (
                <div className={cls.questionVariant__item}>
                    <Input placeholder={"Вариант ответа"}/>
                    <Input type={"checkbox"}/>
                    <i className={classNames("fa-solid fa-minus", cls.deleteItem)}/>
                </div>
            )
        })
    }

    const renderQuestionList = (id) => {
        return questionList.map(item => {
            if (id !== item.id) return null
            return (
                <div className={cls.createQuestion}>
                    <div className={cls.createQuestion__status}>
                        <h1>Введите вопрос</h1>
                        <div className={cls.wrapper}>
                            <i className={classNames("fa-solid fa-trash", cls.deleteQuestion)}/>
                            <Select/>
                        </div>
                    </div>
                    {
                        true ?
                        <div
                            {...getRootProps()}
                            className={cls.img}
                        >

                            {
                                !!item.image ? <img
                                    src={
                                        typeof item.image === "string"
                                            ? `${API_URL_DOC}${item.image}`
                                            // ? `${API_URL_DOC}${"img"}`
                                            // : URL.createObjectURL(img)
                                            : null
                                    }
                                    alt=""/> : <h1>Rasm tanlang</h1>
                            }

                            <input
                                {...getInputProps()}
                                // onChange={onChangeImage}
                                // ref={imageRef}
                                className={styles.option__input}
                                type="file"
                            />
                        </div>
                            :
                            <Input
                                placeholder={"Введите вопрос"}
                            />
                    }
                    <div className={cls.questionVariant}>
                        <div className={cls.questionVariant__delete}>
                            <h1>Варианты: </h1>
                            <div className={cls.wrapper}>
                                <i className={classNames("fa-solid fa-trash", cls.deleteVariant)}/>
                                <Select/>
                            </div>
                        </div>
                        <div>
                            {renderVariantList(item.id)}
                        </div>
                        {/*<div className={cls.questionVariant__item}>*/}
                        {/*    <Input placeholder={"Вариант ответа"}/>*/}
                        {/*    <Input type={"checkbox"}/>*/}
                        {/*    <i className={classNames("fa-solid fa-minus", cls.deleteItem)}/>*/}
                        {/*</div>*/}
                        <i className={classNames("fa-sharp fa-solid fa-plus", cls.questionVariant__plus)}/>
                    </div>
                    <div className={cls.createQuestion__btns}>
                        <Button>Добавить вопрос</Button>
                        <Button>Удалить вопрос</Button>
                    </div>
                </div>
            )
        })
    }

    const renderTestList = () => {
        return testList.map(item => {
            return (
                <div className={cls.createTest__container}>
                    <div className={cls.titleTest}>
                        {/*<h1>{item.name ?? "Создание теста"}</h1>*/}
                        <h1>{"Создание теста"}</h1>
                        {/*<div className={cls.titleTest__btns}>*/}
                        {/*    <Button>Добавить тест</Button>*/}
                        {/*    <Button>Удалить тест</Button>*/}
                        {/*</div>*/}
                        <i className={classNames("fa-solid fa-trash", cls.titleTest__delete)}/>
                    </div>
                    {
                        // item.name ? null : <Input
                        false ? null : <Input
                            placeholder={"Название теста"}
                        />
                    }
                    {renderQuestionList(item.id)}
                    <Button
                        extraClass={cls.button}
                    >
                        Сохранить тест
                    </Button>
                </div>
            )
        })
    }

    return (
        <div className={cls.createTest}>
            <Select
                extraClass={cls.select}
                titleOption={"Выберите Предмет"}
            />
            {/*<ExcQuestion component={[]}/>*/}
            {renderTestList()}
            <div className={cls.createTest__plus}>
                <i className={classNames("fa-sharp fa-solid fa-plus", cls.icon)}/>
            </div>
        </div>
    );
};

