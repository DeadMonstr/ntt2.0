import {memo, useCallback, useEffect, useState} from 'react';
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";

import {
    OrganizationProfileGallery,
    fetchOrganizationProfileGallery, addGallery, updateGallery,
} from "entities/organizationProfile";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";

import cls from "./organizationProfileGalleryModal.module.sass";
import {useDropzone} from "react-dropzone";
import {API_URL, headers, useHttp} from "../../../../shared/api/base";
import {useParams} from "react-router";
import {Button} from "shared/ui/button/button";
import {ConfirmModal} from "shared/ui/confirmModal";
import {onDeleteDegree, onDeleteDirection} from "entities/settings";
import {deleteGallery} from "entities/organizationProfile/model/slice/organizationProfileSlice";

export const OrganizationProfileGalleryModal = memo(({userRole  , addActiveModal  ,setAddActiveModal}) => {

    const {id} = useParams()
    useEffect(() => {
        dispatch(fetchOrganizationProfileGallery({id}))
    }, [id])

    const {request} = useHttp()
    const formData = new FormData()
    const dispatch = useDispatch()
    const [activeModal, setActiveModal] = useState(false)
    const [changedImage, setChangedImage] = useState({})
    const [newImageFile, setNewImageFile] = useState(null)
    const [activeConfirm, setActiveConfirm] = useState(false)

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            setNewImageFile(acceptedFiles[0])
        }
    })

    useEffect(() => {
        if (!addActiveModal) setNewImageFile(null)
    }, [addActiveModal])

    const onActiveModal = useCallback((data) => setActiveModal(data), [])

    const onSubmit = (e) => {
        formData.append("url", newImageFile)
        formData.append("type", changedImage?.file?.type)
        formData.append("organization", changedImage?.organization?.id)
        request(
            `${API_URL}organizations/organization_gallery/crud/update/${changedImage?.file?.id}/`,
            "PATCH",
            formData,
            {}
        )
            .then(res => {
                dispatch(updateGallery(res))
                setActiveModal(false)
            })
            .catch(err => console.log(err))
        formData.delete("url")
        formData.delete("type")
        formData.delete("organization")
    }

    const onCreate = (e) => {
        e.preventDefault()
        formData.append("url", newImageFile)
        formData.append("type", "img")
        request(`${API_URL}organizations/organization_gallery/crud/create-file/`, "POST", formData, {})
            .then(res => {
                request(
                    `${API_URL}organizations/organization_gallery/crud/create/`,
                    "POST",
                    JSON.stringify({file_id: res?.id, organization: id})
                )
                    .then(res => {
                        dispatch(addGallery(res))
                        setAddActiveModal(false)
                    })
                    .catch(err => console.log(err))
            })


        formData.delete("url")
        formData.delete("type")
    }


    const onDelete = () => {

        request(`${API_URL}organizations/organization_gallery/crud/delete/${changedImage?.file?.id}/`, "DELETE", null, headers())
            .then(res => {
                console.log(res, "resssssssssssssssssssss")
                dispatch(deleteGallery(changedImage?.file?.id))
            })

        setActiveConfirm(false)
        setActiveModal(false)
    }
    const onChangedModalOpen = (e) => {
        setChangedImage(e)
        setActiveModal(true)
    }

    return (
        <>
            <OrganizationProfileGallery
                userRole={userRole}
                setChangedImage={onChangedModalOpen}
                isAdd={setAddActiveModal}
            />
            <Modal
                active={activeModal}
                setActive={setActiveModal}
            >
                <div className={cls.gallery__change}>
                    <h1 className={cls.gallery__title}>Rasmni o’zgartirish</h1>
                    <div
                        {...getRootProps()}
                        className={cls.gallery__image}
                    >
                        <input {...getInputProps()}/>
                        {
                            newImageFile
                                ? <img className={cls.gallery__inner} src={URL.createObjectURL(newImageFile)} alt=""/>
                                : <img className={cls.gallery__inner} src={changedImage?.file?.url} alt=""/>
                        }
                    </div>

                    <div className={cls.gallery__buttons}>
                        <Button
                            extraClass={cls.delete}
                            onClick={() => setActiveConfirm(true)}
                            type={"delete"}
                        >
                            O'chirish
                        </Button>
                        <Button
                            id={"idChangeForm"}
                            onClick={onSubmit}
                            type={"submit"}
                            disabled={!newImageFile}
                        >
                            Tasdiqlash
                        </Button>
                    </div>

                    <ConfirmModal
                        onClick={onDelete}
                        active={activeConfirm}
                        setActive={setActiveConfirm}
                    />
                </div>
            </Modal>
            <Modal
                active={addActiveModal}
                setActive={setAddActiveModal}
            >
                <Form
                    disabled={!newImageFile}
                    extraClassname={cls.gallery}
                    onSubmit={onCreate}
                >
                    <h1 className={cls.gallery__title}>Rasm qo'shish</h1>
                    <div
                        {...getRootProps()}
                        className={cls.gallery__image}
                    >
                        <input {...getInputProps()}/>
                        {
                            newImageFile
                                ? <img className={cls.gallery__inner} src={URL.createObjectURL(newImageFile)} alt=""/>
                                : <i className={classNames("fas fa-image", cls.gallery__icon)}/>
                        }
                    </div>
                </Form>
            </Modal>
        </>
    );
})
