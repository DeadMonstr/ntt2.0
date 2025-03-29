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
    {id: "image", name: "Rasm"},
    {id: "textImage", name: "Matn va rasm"}
]

export const CreateTest = () => {

    const {getInputProps, getRootProps} = useDropzone()

    const [isQuestionType, setIsQuestionType] = useState("text")
    const [isVariantType, setIsVariantType] = useState("text")

    const selectQuestionType = useCallback((data) => setIsQuestionType(data), [])
    const selectVariantType = useCallback((data) => setIsVariantType(data), [])

    return (
        <div className={cls.createTest}>
            <Select
                extraClass={cls.createTest__select}
                titleOption={"Выберите Предмет"}
            />
            <div className={cls.createTest__container}>
                <h2 className={cls.title}>Test yaratish</h2>
                <div className={cls.wrapper}>
                    <div className={cls.question}>
                        <Select
                            options={types}
                            extraClass={cls.question__type}
                            title={"Savol turi"}
                            onChangeOption={selectQuestionType}
                            defaultValue={isQuestionType}
                        />
                        <div className={cls.question__title}>
                            {
                                isQuestionType === "text"
                                    ? <Input
                                        placeholder={"Savolni yozing"}
                                    />
                                    : isQuestionType === "image"
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
                        <div className={cls.question__container}>
                            <div className={cls.variant}>
                                <Radio extraClasses={cls.variant__correct}/>
                                <Select
                                    options={types}
                                    extraClass={cls.variant__type}
                                    titleOption={"Javob turi"}
                                    onChangeOption={selectVariantType}
                                />
                                <div className={cls.variant__title}>
                                    {
                                        isVariantType === "text"
                                            ? <Input
                                                placeholder={"Savolni yozing"}
                                            />
                                            : isVariantType === "image"
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
                                <div>
                                    <i className="fa-solid fas-change"/>
                                    <i className="fa-solid fas-tresh"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cls.question}>
                        <Select
                            options={types}
                            extraClass={cls.question__type}
                            title={"Savol turi"}
                            onChangeOption={selectQuestionType}
                            defaultValue={isQuestionType}
                        />
                        <div className={cls.question__title}>
                            {
                                isQuestionType === "text"
                                    ? <Input
                                        placeholder={"Savolni yozing"}
                                    />
                                    : isQuestionType === "image"
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
                        <div className={cls.question__container}>
                            <div className={cls.variant}>
                                <Radio extraClasses={cls.variant__correct}/>
                                <Select
                                    options={types}
                                    extraClass={cls.variant__type}
                                    titleOption={"Javob turi"}
                                    onChangeOption={selectVariantType}
                                />
                                <div className={cls.variant__title}>
                                    {
                                        isVariantType === "text"
                                            ? <Input
                                                placeholder={"Savolni yozing"}
                                            />
                                            : isVariantType === "image"
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
                                <div>
                                    <i className="fa-solid fas-change"/>
                                    <i className="fa-solid fas-tresh"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cls.question}>
                        <Select
                            options={types}
                            extraClass={cls.question__type}
                            title={"Savol turi"}
                            onChangeOption={selectQuestionType}
                            defaultValue={isQuestionType}
                        />
                        <div className={cls.question__title}>
                            {
                                isQuestionType === "text"
                                    ? <Input
                                        placeholder={"Savolni yozing"}
                                    />
                                    : isQuestionType === "image"
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
                        <div className={cls.question__container}>
                            <div className={cls.variant}>
                                <Radio extraClasses={cls.variant__correct}/>
                                <Select
                                    options={types}
                                    extraClass={cls.variant__type}
                                    titleOption={"Javob turi"}
                                    onChangeOption={selectVariantType}
                                />
                                <div className={cls.variant__title}>
                                    {
                                        isVariantType === "text"
                                            ? <Input
                                                placeholder={"Savolni yozing"}
                                            />
                                            : isVariantType === "image"
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
                                <div>
                                    <i className="fa-solid fas-change"/>
                                    <i className="fa-solid fas-tresh"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

