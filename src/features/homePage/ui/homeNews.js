import cls from "./homeNews.module.sass"
import {useDispatch, useSelector} from "react-redux";
import {getHomeNews, HomeNewsList, onAddHomeNews} from "entities/home";
import {Modal} from "shared/ui/modal";
import {useEffect, useState} from "react";
import classNames from "classnames";
import {useDropzone} from "react-dropzone";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";
import {Textarea} from "shared/ui/textArea";
import {useForm} from "react-hook-form";
import {onDeleteHomeNews, onEditHomeNews} from "entities/home/model/slice/homeNewsSlice";
import {Button} from "shared/ui/button/button";
import {ConfirmModal} from "shared/ui/confirmModal";
import f from "@lexical/react/LexicalClickableLinkPlugin";

export const HomeNews = () => {
    const homeNewsData = useSelector(getHomeNews)


    const [activeModal, setActiveModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)
    const [activeEditItem, setActiveEditItem] = useState(false)

    return (
        <div className={cls.news}>

            <div className={cls.news__header}>
                <h1>So’ngi yangiliklar % Trendlar</h1>
                <h3>Hamasini ko’rish</h3>
            </div>

            {/*<div className={cls.news__btns}>*/}
            {/*    <i onClick={() => setActiveModal(true)} className={"fa fa-plus"}/>*/}
            {/*</div>*/}
            <div className={cls.news__list}>
                <HomeNewsList item={homeNewsData} setActiveEditModal={setActiveEditModal}
                              setActiveEditItem={setActiveEditItem}/>
            </div>

            <AddHomeNews active={activeModal} setActive={setActiveModal}/>

            <EditHomeNews setActive={setActiveEditModal} active={activeEditModal} activeItem={activeEditItem}/>
        </div>
    );
};

const AddHomeNews = ({active, setActive}) => {
    const {register, setValue, handleSubmit} = useForm()
    const [newImageFile, setNewImageFile] = useState(null)

    const dispatch = useDispatch()

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            setNewImageFile(acceptedFiles[0])
        }
    })
    const onPostData = (data) => {
        const res = {
            ...data,
            img: newImageFile
        }

        setValue("date", "")
        setValue("name", "")
        setValue("descr", "")
        setNewImageFile(null)
        setActive(false)
        dispatch(onAddHomeNews(res))
    }

    return (
        <Modal active={active} setActive={setActive}>
            <h1>Add</h1>
            <Form onSubmit={handleSubmit(onPostData)} value={"Add"} extraClassname={cls.gallery}>
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
                <Input extraClass={cls.gallery__input} name={"name"} register={register}/>
                <Input extraClass={cls.gallery__input} name={"date"} type={"date"} register={register}/>
                <Textarea name={"descr"} register={register}/>
            </Form>
        </Modal>
    )
}

const EditHomeNews = ({setActive, active, activeItem}) => {
    const {register, setValue, handleSubmit} = useForm()
    const [newImageFile, setNewImageFile] = useState(null)
    const [activeDelete, setActiveDelete] = useState(false)


    const dispatch = useDispatch()

    useEffect(() => {
        setValue("name", activeItem.name)
        setValue("date", activeItem.date)
        setValue("descr", activeItem.descr)
    }, [activeItem, active])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            setNewImageFile(acceptedFiles[0])
        }
    })
    const onPostData = (data) => {
        const res = {
            ...data,
            img: newImageFile
        }

        setValue("date", "")
        setValue("name", "")
        setValue("descr", "")
        setNewImageFile(null)
        setActive(false)
        dispatch(onEditHomeNews({id: activeItem.id, data: res}))
    }

    const onDelete = () => {
        setActive(false)

        setActiveDelete(false)
        dispatch(onDeleteHomeNews(activeItem.id))

    }
    return (
        <Modal active={active} setActive={setActive}>
            <h1>Edit</h1>
            <Form isChange={false} value={"Add"} extraClassname={cls.gallery}>
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
                <Input extraClass={cls.gallery__input} name={"name"} register={register}/>
                <Input extraClass={cls.gallery__input} name={"date"} type={"date"} register={register}/>
                <Textarea name={"descr"} register={register}/>

            </Form>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button onClick={handleSubmit(onPostData)}>Edit</Button>
                <Button type={"danger"} onClick={handleSubmit(() => setActiveDelete(true))}>Delete</Button>
            </div>
            <ConfirmModal onClick={onDelete} active={activeDelete} setActive={setActiveDelete}/>
        </Modal>
    )
}

