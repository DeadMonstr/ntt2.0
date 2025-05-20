import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import {useDropzone} from "react-dropzone";
import {useForm} from "react-hook-form";

import {Select} from "shared/ui/select";
import {Input} from "shared/ui/input";
import {Button} from "shared/ui/button/button";
import {Form} from "shared/ui/form";
import {API_URL, useHttp} from "shared/api/base";
import {CreateTestVariants} from "../createTestVariants/createTestVariants";

import cls from "./createTestQuestions.module.sass";
import {useDispatch} from "react-redux";
import {onAddAlertOptions} from "features/alert/model/slice/alertSlice";
import {changeQuestion} from "entities/createTest";
import {Textarea} from "../../../../shared/ui/textArea";

const types = [
    {id: "text", name: "Matn"},
    {id: "image", name: "Rasm"}
]

export const CreateTestQuestions = ({data, isChange, setIsChange, isDelete, index, onRemoveQuestion}) => {

    const {request} = useHttp()
    const dispatch = useDispatch()
    const formData = new FormData()
    const {register, handleSubmit} = useForm()

    const [currentData, setCurrentData] = useState()
    const [currentImage, setCurrentImage] = useState()
    const [variantImages, setVariantImages] = useState([])



    // const [isChangeVariant, setIsChangeVariant] = useState()

    useEffect(() => {
        if (data)
            setCurrentData(data)
    }, [data])

    const {getInputProps, getRootProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            setCurrentImage(acceptedFiles[0])
        }
    })

    const onSaveSingleQuestion = (data) => {

        const res = {
            to_json: {
                type: currentData?.to_json?.type
            },
            questions: currentData?.questions.map(item => {
                let res = {
                    isTrue: item.isTrue,
                    to_json: {...item.to_json},
                    answer: data[`${item.id}-${currentData?.id}`],
                };
                if (!item.isNew){
                    res = {
                        ...res,
                        id: item.id,
                    }
                }
                return res
            })
        };

        const text = data[String(currentData?.id)];
        if (text) {
            res.text = text;
        }

        const url = `${API_URL}test/block/crud/update/${currentData?.id}/`;

        formData.append("to_json", JSON.stringify({
            type: currentData?.to_json?.type
        }));
        formData.append("questions_list", JSON.stringify(res.questions));
        if (currentImage) {
            formData.append("image", currentImage);
        }
        if (res.text)
            formData.append("text", res.text);

        request(url, "PATCH", formData, {})
            .then(res => {
                dispatch(onAddAlertOptions({
                    status: true,
                    type: "success",
                    msg: `${index} raqamli savol o'zgartirildi`
                }))
                dispatch(changeQuestion(res))
                setCurrentImage(undefined)
                formData.delete("to_json")
                formData.delete("questions_list")
                formData.delete("image")
                formData.delete("text")
                res?.questions?.map(item => {
                    const image = variantImages.filter(inner => item.to_json.prevId === inner.id)[0]?.image
                    if ((item.to_json.type === "image" || "textImage") && !!item.to_json.prevId && !!image) {
                        formData.append("image", image)
                        formData.append("to_json", JSON.stringify({type: item.to_json.type, prevId: null}))
                        if (item.to_json.type === "textImage")
                            formData.append("answer", item.answer)
                        request(`${API_URL}test/question/crud/update_delete/${item.id}/`, "PATCH", formData, {})
                            .then(res => console.log(res, "HELLO"))
                        formData.delete("image")
                        formData.delete("to_json")
                        formData.delete("answer")
                    }
                })
            });


        // if (currentData?.to_json?.type === "image" && !!currentImage) {
        //     formData.append("res", JSON.stringify(res));
        //     formData.append("to_json", JSON.stringify({type: "image"}));
        //     formData.append("questions", JSON.stringify(res.questions));
        //     formData.append("image", currentImage);
        //     request(url, "PATCH", formData, {})
        //         .then(res => {
        //             dispatch(onAddAlertOptions({
        //                 status: true,
        //                 type: "success",
        //                 msg: `${index} raqamli savol o'zgartirildi`
        //             }))
        //             dispatch(changeQuestion(res))
        //             setCurrentImage(undefined)
        //         });
        //     formData.delete("res");
        //     formData.delete("image");
        //     formData.delete("questions");
        //     formData.delete("to_json");
        // } else {
        //     request(url, "PATCH", JSON.stringify(res))
        //         .then(res => {
        //             dispatch(onAddAlertOptions({
        //                 status: true,
        //                 type: "success",
        //                 msg: `${index} raqamli savol o'zgartirildi`
        //             }))
        //             dispatch(changeQuestion(res))
        //             setIsChange(undefined)
        //         });
        // }
    };


    const selectQuestionType = (type) => {
        setCurrentData(prevState => ({
            ...prevState,
            to_json: {type}
        }))
        // setCurrentList(prevState => ({
        //     ...prevState,
        //     blocks: prevState.blocks.map(item => {
        //         if (item.id === id) {
        //             return {
        //                 ...item,
        //                 to_json: {type}
        //             }
        //         } else return item
        //     })
        // }))
    }

    const selectVariantType = (id, type) => {
        setCurrentData(prevState => ({
            ...prevState,
            questions: prevState?.questions?.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        to_json: {type},
                    }
                } else return item
            })
        }))
    }

    const onAddVariant = () => {
        setCurrentData(prevState => ({
            ...prevState,
            questions: [
                ...prevState?.questions,
                {
                    questionId: prevState?.id,
                    to_json: {type: "text"},
                    answer: "",
                    id: prevState?.questions?.length ? prevState?.questions[prevState?.questions?.length - 1]?.id + 1 : 1,
                    isTrue: !(prevState?.questions?.length >= 1),
                    isNew: true
                }
            ]
        }))
    }

    const onChangeTrueVersion = (variantId) => {
        setCurrentData(prevState => ({
            ...prevState,
            questions: prevState?.questions?.map(inner => {
                if (inner.id === variantId) {
                    return {
                        ...inner,
                        isTrue: true
                    }
                } else return {
                    ...inner,
                    isTrue: false
                }
            })
        }))
    }

    const onGetVariantImage = (id, image) => {
        setVariantImages(prevState => [...prevState, {id, image}])
        setCurrentData(prevState => ({
            ...prevState,
            questions: prevState?.questions?.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            to_json: {
                                ...item?.to_json,
                                prevId: item.id
                            }
                        }
                    } else return item
                })
        }))
    }

    const renderVariants = (list, ID) => {
        return currentData?.questions?.map(item => {
            return (
                <CreateTestVariants
                    item={item}
                    register={register}
                    ID={currentData?.id}
                    selectVariantType={selectVariantType}
                    isChange={isChange === currentData?.id}
                    isDelete={item.isTrue ? false : currentData?.questions?.length > 1}
                    onChangeTrueVersion={onChangeTrueVersion}
                    getImage={onGetVariantImage}
                />
            )
        })
    }

    return (
        <Form
            onSubmit={handleSubmit(onSaveSingleQuestion)}
            extraClassname={cls.question}
            isChange={false}
        >
            <div className={cls.question__header}>
                <Select
                    options={types}
                    extraClass={cls.question__type}
                    title={"Savol turi"}
                    onChangeOption={selectQuestionType}
                    defaultValue={currentData?.to_json?.type}
                    status={isChange === currentData?.id ? "" : "disabled"}
                />
                <div className={cls.innerWrapper}>
                    <i
                        className={classNames("fa-solid fa-pen", cls.change, {
                            [cls.active]: isChange === currentData?.id
                        })}
                        onClick={() => setIsChange(prev => prev === currentData?.id ? NaN : currentData?.id)}
                    />
                    {
                        isDelete ?
                            <i
                                className={classNames("fa-solid fa-trash", cls.trash)}
                                onClick={() => onRemoveQuestion(currentData?.id)}
                            />
                            : null
                    }
                </div>
            </div>
            <div className={cls.question__title}>
                {
                    currentData?.to_json?.type === "text"
                        ?
                        <Textarea
                            disabled={!(isChange === currentData?.id)}
                            register={register}
                            name={String(currentData?.id)}
                            placeholder={"Savolni yozing"}
                            value={currentData?.text}
                        />
                        // <Input
                        //     placeholder={"Savolni yozing"}
                        //     disabled={!(isChange === currentData?.id)}
                        //     name={String(currentData?.id)}
                        //     register={register}
                        //     value={currentData?.text}
                        // />
                        : <div
                            aria-disabled={!isChange === currentData?.id}
                            className={cls.imageArea}
                            {...getRootProps()}
                        >
                            {
                                (currentImage?.path || currentData?.image) ?
                                    <img
                                        className={cls.imageArea__image}
                                        src={currentImage?.path ? URL.createObjectURL(currentImage) : currentData?.image}
                                        alt=""
                                    />
                                    : <h2 className={cls.imageArea__title}>Rasm tanlang</h2>
                            }
                            <input {...getInputProps()} type="file"/>
                        </div>
                }
            </div>
            <div className={cls.question__container}>
                {renderVariants()}
            </div>
            {
                isChange === currentData?.id ?
                    <i
                        className={classNames("fa-solid fa-plus", cls.plusVariant)}
                        onClick={onAddVariant}
                    /> : null
            }
            {
                isChange === currentData?.id ?
                    <Button
                        // onClick={() => onSaveSingleQuestion(item.id)}
                        extraClass={cls.question__btn}
                    >
                        Savolni saqlash
                    </Button> : null
            }
        </Form>
    );
}
