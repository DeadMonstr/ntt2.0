import React, {useState} from 'react';
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
import {headers, headersImg, useHttp} from "shared/api/base";

import cls from "./userProfilePage.module.sass";

export const UserProfilePage = () => {

    const {request} = useHttp()
    const dispatch = useDispatch()
    const formData = new FormData()
    const {register, handleSubmit} = useForm()
    const userData = useSelector(getUserData)

    const [currentImage, setCurrentImage] = useState(undefined)
    const {getInputProps, getRootProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            setCurrentImage(acceptedFiles[0])
            formData.append("image", acceptedFiles[0])
            request({
                url: `users/user/crud/${userData?.id}/`,
                method: "PUT",
                body: formData,
                headers: headersImg()
            })
                .then(res => dispatch(updateUserImage(res)))
            formData.delete("image")
        }
    })

    const onSubmit = (data) => {
        request({
            url: `users/user/crud/${userData?.id}/`,
            method: "PUT",
            body: JSON.stringify(data),
            headers: headers()
        })
            .then(res => dispatch(updateUser(res)))
    }

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
                <div
                    className={cls.user__form}
                >
                    <Input
                        register={register}
                        name={"name"}
                        title={"Ism familiya"}
                        value={userData?.name}
                    />
                    <Input
                        register={register}
                        name={"passport_seria"}
                        title={"Passport seriya"}
                        value={userData?.passport_seria}
                    />
                    <Input
                        register={register}
                        name={"indefikatsiya_pin"}
                        title={"JSHSHR"}
                        value={userData?.indefikatsiya_pin}
                    />
                    <Input
                        register={register}
                        name={"sex"}
                        title={"Jinsi"}
                        value={userData?.sex}
                    />
                    <Input
                        register={register}
                        name={"phone_extra"}
                        title={"Qo'shimcha telefon raqami"}
                        value={userData?.phone_extra}
                    />
                    <Input
                        register={register}
                        name={"born_date"}
                        title={"Tug'ilgan sanasi"} type={"date"}
                        value={userData?.born_date}
                    />
                    <Input
                        register={register}
                        name={"born_address"}
                        title={"Tug'ilgan joyi"}
                        value={userData?.born_address}
                    />
                    <Input
                        register={register}
                        name={"email"}
                        title={"Email"}
                        value={userData?.email}
                    />
                </div>
            </Form>
        </div>
    );
}
