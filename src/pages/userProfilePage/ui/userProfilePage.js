import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useDropzone} from "react-dropzone";
import classNames from "classnames";

import {
    getUserData,
    updateUser,
    updateUserImage
} from "entities/userProfile";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";
import {API_URL, headers, headersImg, useHttp} from "shared/api/base";

import cls from "./userProfilePage.module.sass";
import {onAddAlertOptions} from "features/alert/model/slice/alertSlice";

export const UserProfilePage = () => {

    const {request} = useHttp()
    const dispatch = useDispatch()
    const formData = new FormData()
    const {register, handleSubmit,setValue} = useForm()
    const {register: registerPassword,handleSubmit: handleSubmitPassword,clearErrors,watch,formState: { errors },setError} = useForm()
    const userData = useSelector(getUserData)


    const password = watch("password")
    const confirm_password = watch("confirm_password")



    console.log(userData)

    const [currentImage, setCurrentImage] = useState(undefined)
    const {getInputProps, getRootProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            setCurrentImage(acceptedFiles[0])
            formData.append("image", acceptedFiles[0])
            request(`${API_URL}users/user/crud/update_photo/${userData?.id}/`, "PUT", formData, headersImg())
                .then(res => dispatch(updateUserImage(res)))
            formData.delete("image")
        }
    })

    useEffect(() => {
        if (userData?.id) {
            setValue("name", userData?.name)
            setValue("surname", userData?.surname)
            setValue("born_date", userData?.born_date)
        }
    },[userData?.id])

    useEffect(() => {
        console.log(password,confirm_password)
        if (confirm_password !== password) {
            setError("confirm_password", { type: "custom", message: "Parollar mos emas" })
        } else {
            // setError("password", { type: "custom", message: "Parollar mos emas" })
            clearErrors()
        }
    },[password,confirm_password])

    const onSubmit = useCallback((data) => {
        console.log(data)
        if (userData?.id)

        request(`${API_URL}users/user/crud/${userData.id}/`, "PUT", JSON.stringify(data), headers())
            .then(res => {
                dispatch(onAddAlertOptions({
                    type: "success",
                    status: true,
                    msg: "Muvaffaqiyatli o'zgartirildi"
                }))
                dispatch(updateUser(res))
            })
    },[userData?.id])

    const onSubmitPassword = useCallback((data) => {
        if (userData?.id)

            request(`${API_URL}users/user/crud/update_password/${userData.id}/`, "PUT", JSON.stringify(data), headers())
                .then(res => {
                    dispatch(onAddAlertOptions({
                        type: "success",
                        status: true,
                        msg: "Parol muvaffaqiyatli o'zgartirildi"
                    }))
                })

    },[userData?.id])

    console.log(errors)
    return (
        <div className={cls.user}>
            <div className={cls.user__image}>
                <div {...getRootProps()} className={cls.inner}>
                    {
                        !!currentImage ?
                            <img className={cls.inner__img} src={URL.createObjectURL(currentImage)} alt=""/>
                            :
                            <i className={classNames("fa-solid fa-image", cls.inner__icon)}/>
                    }
                    <input {...getInputProps()} type="file"/>
                </div>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className={cls.user__form}>
                    <Input
                        register={register}
                        name={"name"}
                        title={"Ism"}
                        // defaultValue={userData?.name}
                    />
                    <Input
                        register={register}
                        name={"surname"}
                        title={"Familiya"}
                        // defaultValue={userData?.surname}
                    />

                    <Input
                        register={register}
                        name={"born_date"}
                        title={"Tug'ilgan sanasi"} type={"date"}
                        // defaultValue={userData?.born_date}
                    />

                </div>
            </Form>
            <Form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                <div className={cls.user__form}>
                    <Input
                        register={registerPassword}
                        name={"password"}
                        title={"Parol"}
                        type={"password"}
                        errors={errors}
                        // defaultValue={userData?.name}
                    />
                    <Input
                        register={registerPassword}
                        name={"confirm_password"}
                        type={"password"}
                        title={"Parolni tasdiqlash"}
                        errors={errors}
                        // defaultValue={userData?.surname}
                    />


                </div>
            </Form>
        </div>
    );
}
