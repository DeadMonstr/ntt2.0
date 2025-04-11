import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import {useDropzone} from "react-dropzone";
import {useDispatch} from "react-redux";

import {deleteVariant} from "entities/createTest";
import {Radio} from "shared/ui/radio";
import {Input} from "shared/ui/input";
import {Select} from "shared/ui/select";
import {API_URL, useHttp} from "shared/api/base";

import cls from "./createTestVariants.module.sass";

const types = [
    {id: "text", name: "Matn"},
    {id: "image", name: "Rasm"},
    {id: "textImage", name: "Matn va rasm"}
]

export const CreateTestVariants = ({
                                       ID,
                                       item,
                                       onChangeTrueVersion,
                                       selectVariantType,
                                       isDelete,
                                       register,
                                       isChange,
                                       getImage
                                   }) => {

    const {request} = useHttp()
    const dispatch = useDispatch()

    const [currentImage, setCurrentImage] = useState(undefined)

    useEffect(() => {
        if (currentImage)
            getImage(item.id, currentImage)
    }, [currentImage])

    const onRemoveVariant = () => {
        request(`${API_URL}test/question/crud/update_delete/${item.id}/`, "DELETE")
            .then(res => console.log(res, "HELLO"))
        dispatch(deleteVariant({questionId: ID, variantId: item.id}))
    }

    const {getInputProps, getRootProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            setCurrentImage(acceptedFiles[0])
        }
    })

    return (
        <div className={cls.variant}>
            <Radio
                disabled={!isChange}
                name={ID}
                extraClasses={cls.variant__correct}
                checked={item.isTrue}
                onChange={() => onChangeTrueVersion(item.id)}
            />
            <Select
                options={types}
                extraClass={cls.variant__type}
                titleOption={"Javob turi"}
                onChangeOption={(data) => selectVariantType(item.id, data)}
                defaultValue={item.to_json.type}
                status={isChange ? "" : "disabled"}
            />
            <div className={cls.variant__title}>
                {
                    item.to_json.type === "text"
                        ? <Input
                            placeholder={"Javobni yozing"}
                            register={register}
                            name={String(`${item.id}-${ID}`)}
                            value={item.answer}
                            disabled={!isChange}
                        />
                        : item.to_json.type === "image"
                            ? <div
                                aria-disabled={!isChange}
                                className={cls.imageArea}
                                {...getRootProps()}
                            >
                                {
                                    (currentImage?.path || item?.image) ?
                                        <img
                                            className={cls.imageArea__image}
                                            src={currentImage?.path ? URL.createObjectURL(currentImage) : item?.image}
                                            alt=""
                                        />
                                        : <h2 className={cls.imageArea__title}>Rasm tanlang</h2>
                                }
                                <input {...getInputProps()} type="file"/>
                            </div>
                            : <div className={cls.imageWrapper}>
                                <Input
                                    placeholder={"Savolni yozing"}
                                    register={register}
                                    name={String(`${item.id}-${ID}`)}
                                    value={item.answer}
                                    disabled={!isChange}
                                />
                                <div
                                    aria-disabled={!isChange}
                                    className={cls.imageArea}
                                    {...getRootProps()}
                                >
                                    {
                                        (currentImage?.path || item?.image) ?
                                            <img
                                                className={cls.imageArea__image}
                                                src={currentImage?.path ? URL.createObjectURL(currentImage) : item?.image}
                                                alt=""
                                            />
                                            : <h2 className={cls.imageArea__title}>Rasm tanlang</h2>
                                    }
                                    <input {...getInputProps()} type="file"/>
                                </div>
                            </div>
                }
            </div>
            <div className={cls.variant__options}>
                {/*<i*/}
                {/*    className={classNames("fa-solid fa-pen", cls.change)}*/}
                {/*/>*/}
                {
                    isDelete ?
                        !item.checked ?
                            <i
                                className={classNames("fa-solid fa-trash", cls.trash)}
                                onClick={() => onRemoveVariant(item.id, ID)}
                            /> : null : null
                }
            </div>
        </div>
    );
}
