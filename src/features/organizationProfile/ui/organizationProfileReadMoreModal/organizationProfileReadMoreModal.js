import {memo, useCallback, useEffect, useState} from 'react';
import classNames from "classnames";
import {useDropzone} from "react-dropzone";

import {
    getOrganizationProfileError,
    getOrganizationProfileLoading,
    getOrganizationProfileReadMore,
    OrganizationProfileReadMore, updateReadMore
} from "entities/organizationProfile";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";
import {Textarea} from "shared/ui/textArea";

import cls from "./organizationProfileReadMoreModal.module.sass";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchOrganizationProfileReadMore
} from "../../../../entities/organizationProfile/model/thunk/organizationProfileThunk";
import {useForm} from "react-hook-form";
import {API_URL, useHttp} from "../../../../shared/api/base";
import {useParams} from "react-router";

export const OrganizationProfileReadMoreModal = memo(() => {

    const {
        register,
        handleSubmit
    } = useForm()
    const {request} = useHttp()
    const {id} = useParams()
    const formData = new FormData()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOrganizationProfileReadMore({id}))
    }, [id])

    const data = useSelector(getOrganizationProfileReadMore)
    const [activeModal, setActiveModal] = useState(false)
    const [newImageFile, setNewImageFile] = useState(null)
    const {getInputProps, getRootProps} = useDropzone({
        onDrop: (acceptedFiles) => setNewImageFile(acceptedFiles[0])
    })

    const onToggle = useCallback(() => setActiveModal(!activeModal), [])

    const onSubmit = (data) => {
        formData.append("name_optional", data?.name)
        formData.append("desc", data?.desc)
        if (newImageFile) formData.append("url", newImageFile)
        request(
            `${API_URL}organizations/organization_advantage/crud/update/1/`,
            "PATCH",
            formData,
            {}
        )
            .then(res => {
                dispatch(updateReadMore(res))
                console.log(res)
            })
            .catch(err => console.log(err))
        formData.delete("name_optional")
        formData.delete("desc")
        formData.delete("url")
    }

    return (
        <>
            <OrganizationProfileReadMore setActive={onToggle}/>
            <Modal
                active={activeModal}
                setActive={setActiveModal}
                extraClass={cls.editModal}
            >
                <h1 className={cls.editModal__title}>Ma’lumotni o’zgartirish</h1>
                <div className={cls.editModal__container}>
                    <div
                        className={classNames(cls.imageEdit, {
                            [cls.active]: newImageFile || data?.file?.url
                        })}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()}/>
                        {
                            newImageFile
                                ? <img
                                    className={cls.imageEdit__image}
                                    src={URL.createObjectURL(newImageFile)}
                                    alt=""
                                /> :
                                data?.file?.url
                                    ? <img
                                        className={cls.imageEdit__image}
                                        src={data?.file?.url}
                                        alt=""
                                    />
                                    : <i className={classNames("far fa-image", cls.imageEdit__icon)}/>
                        }
                    </div>
                    <Form
                        extraClassname={cls.editModal__form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Input
                            value={data?.name_optional}
                            register={register}
                            name={"name"}
                            placeholder={"Name"}
                            extraClass={cls.editModal__input}
                        />
                        <Textarea
                            value={data?.desc}
                            register={register}
                            name={"desc"}
                            placeholder={"Text"}
                        />
                    </Form>
                </div>
            </Modal>
        </>
    );
})
