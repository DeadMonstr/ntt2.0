import {useForm} from "react-hook-form";
import {API_URL, headers, headersImg, useHttp} from "shared/api/base";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {onAddNews, onDeleteNews, onEditNews} from "entities/news/model/newsSlice";
import {Modal} from "shared/ui/modal";
import cls from "./edit.module.sass";
import classNames from "classnames";
import {Input} from "shared/ui/input";
import {Button} from "shared/ui/button/button";
import {ConfirmModal} from "shared/ui/confirmModal";
import {onAddAlertOptions} from "features/alert/model/slice/alertSlice";
import {onChangeData} from "entities/newsProfile";
import TextEditor from "../../../../shared/ui/textEditor/TextEditor";
import {useNavigate} from "react-router";

export const EditNews = ({active, setActive, item}) => {

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue
    } = useForm({
        defaultValues: {
            title: item?.title,
            date: item?.date,

        }
    })
    const id = localStorage.getItem("organization_id")
    const formData = new FormData()
    useEffect(() => {
        setValue("title", item?.title)
        setValue("date", item?.date)

    }, [item])

    const {request} = useHttp()
    const dispatch = useDispatch()


    const [activeDelete , setActiveDelete] = useState(false)
    const [editor, setEditor] = useState(null)


    const [newImageFile, setNewImageFile] = useState(null)
    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            setNewImageFile(acceptedFiles[0])
        }
    })


    const onEdit = (data) => {
        if (newImageFile) formData.append("img", newImageFile)
        formData.append("date", data?.date)
        formData.append("title", data?.title)
        // formData.append("desc_json", JSON.stringify(editor))

        request(`${API_URL}organizations/news/${item.id}/`, "PATCH", formData, headersImg())
            .then(res => {
                dispatch(onAddAlertOptions({
                    status: true,
                    type: "success",
                    msg: "Yangilik o'zgardi"
                }))
                setActive(false)
                // dispatch(onAddHomeNews(res))
                dispatch(onChangeData(res))
                dispatch(onEditNews({id: item.id, data: res}))
            })


    }

    const onDelete = () => {
        setActive(false)
        request(`${API_URL}organizations/news/${item.id}/`, "DELETE", null, headers())
            .then(res => {

                setActiveDelete(false)
                dispatch(onDeleteNews(item.id))
                dispatch(onAddAlertOptions({
                    status: true,
                    type: "success",
                    msg: res.message
                }))
                navigate(-1)

            })

    }

    return (
        <Modal  title={"Yangilikni o'zgartirish"} active={active} setActive={setActive}>
            <div className={cls.news}>
                <div
                    {...getRootProps()}
                    className={cls.gallery__image}
                >
                    <input {...getInputProps()}/>
                    {
                        newImageFile || item?.img
                            ? <img className={cls.gallery__inner} src={newImageFile ? URL.createObjectURL(newImageFile) : item?.img} alt=""/>
                            : <i className={classNames("fas fa-image", cls.gallery__icon)}/>
                    }
                </div>
                <Input name={"title"} register={register} placeholder={"Nomi"}/>
                <Input register={register} name={"date"} type={"date"}/>
                {/*<TextEditor  extraClass={cls.news__editor} onSubmit={(e) => setEditor(e)}/>*/}
                {/*<Button onClick={handleSubmit(onPost)} extraClass={cls.news__btn}>Add</Button>*/}
                <div className={cls.news__btns}>
                    <Button onClick={handleSubmit(onEdit)} extraClass={cls.news__btn}>O'zgartirish</Button>
                    <Button type={"danger"} onClick={handleSubmit(() => setActiveDelete(true))} extraClass={cls.news__btn}>O'chirish</Button>
                </div>
            </div>
            <ConfirmModal active={activeDelete} setActive={setActiveDelete} onClick={handleSubmit(onDelete)}/>
        </Modal>
        // <Modal title={"Yangilikni tahrirlash"} active={active} setActive={setActive}>
        //     <div className={cls.news}>
        //         <div
        //             {...getRootProps()}
        //             className={cls.gallery__image}
        //         >
        //             <input {...getInputProps()}/>
        //             {
        //                 item.img || newImageFile
        //                     ? <img className={cls.gallery__inner} src={newImageFile ? URL.createObjectURL(newImageFile) : item.img} alt=""/>
        //                     : <i className={classNames("fas fa-image", cls.gallery__icon)}/>
        //             }
        //         </div>
        //         <Input name={"title"} register={register} placeholder={"Nomi"}/>
        //         <Input register={register} name={"date"} type={"date"}/>
        //         <div className={cls.news__btns}>
        //             <Button onClick={handleSubmit(onEdit)} extraClass={cls.news__btn}>Add</Button>
        //             <Button type={"danger"} onClick={handleSubmit(() => setActiveDelete(true))} extraClass={cls.news__btn}>Delete</Button>
        //         </div>
        //     </div>
        //     <ConfirmModal active={activeDelete} setActive={setActiveDelete} onClick={handleSubmit(onDelete)}/>
        //
        // </Modal>
    )

}

