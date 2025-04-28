import cls from "features/news/ui/news.module.sass"
import {useDispatch, useSelector} from "react-redux";
import {getHomeNews, onAddHomeNews} from "entities/home";
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
import {NewsList} from "entities/news";
import TextEditor from "entities/textEditor/TextEditor";
import {API_URL, headers, headersImg, useHttp} from "shared/api/base";
import {fetchNews} from "entities/home/model/thunk/newsThunk";
import {onAddAlertOptions} from "features/alert/model/slice/alertSlice";
import {getUserOrganizationId} from "entities/userProfile";

export const News = () => {
    const homeNewsData = useSelector(getHomeNews)


    const [activeModal, setActiveModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)
    const [activeEditItem, setActiveEditItem] = useState(false)
    const dispatch = useDispatch()


    const orgId = localStorage.getItem("organization_id")
    useEffect(() => {
        dispatch(fetchNews(orgId))
    }, [])

    return (
        <div className={cls.news}>

            <div className={cls.news__header}>
                <h1>So’ngi yangiliklar {!activeModal ? "Trendlar" : "yaratish"}</h1>
                <h3>Hamasini ko’rish</h3>
            </div>

            <div className={cls.news__btns}>
                {!activeModal ? <i onClick={() => setActiveModal(!activeModal)} className={"fa fa-plus"}/> :
                    <i onClick={() => setActiveModal(!activeModal)} className={"fa fa-times"}/>}
            </div>
            {!activeModal ? <div className={cls.news__list}>

                    {activeEditModal ?

                        <EditHomeNews
                            setActive={setActiveEditModal}
                            active={activeEditModal}
                            activeItem={activeEditItem}/> :
                        <NewsList
                            item={homeNewsData}
                            setActiveEditModal={setActiveEditModal}
                            setActiveEditItem={setActiveEditItem}/>}
                </div> :

                <AddHomeNews active={activeModal} setActive={setActiveModal}/>}


        </div>
    );
};

const AddHomeNews = ({active, setActive}) => {
    const {register, setValue, handleSubmit} = useForm()

    const formData = new FormData()
    const [editor, setEditor] = useState(null)
    const [newImageFile, setNewImageFile] = useState(null)

    const organization = useSelector(getUserOrganizationId)


    const {request} = useHttp()
    const dispatch = useDispatch()

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            setNewImageFile(acceptedFiles[0])
        }
    })
    const onPostData = (data) => {


        if (newImageFile) formData.append("img", newImageFile)
        formData.append("date", data?.date)
        formData.append("organization", organization)
        formData.append("title", data?.title)
        formData.append("desc_json", JSON.stringify(editor))


        request(`${API_URL}organizations/news/`, "POST", formData, headersImg())
            .then(res => {
                setActive(false)
                dispatch(onAddHomeNews(res))
            })


    }

    return (
        <div className={cls.gallery}>
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
            <Input extraClass={cls.gallery__input} name={"title"} placeholder={"Title"} register={register}/>
            <Input extraClass={cls.gallery__input} name={"date"} type={"date"} register={register}/>
            <TextEditor onSubmit={(e) => setEditor(e)}/>
            <Button onClick={handleSubmit(onPostData)}>Add</Button>

        </div>
    )
}

const EditHomeNews = ({setActive, active, activeItem}) => {
    const {register, setValue, handleSubmit} = useForm()
    const [newImageFile, setNewImageFile] = useState(null)
    const [activeDelete, setActiveDelete] = useState(false)
    const [editor, setEditor] = useState(null)
    const [editorState, setEditorState] = useState(null)

    const formData = new FormData()

    const dispatch = useDispatch()
    const {request} = useHttp()

    useEffect(() => {
        setValue("name", activeItem.name)
        setValue("date", activeItem.date)
        setEditorState(activeItem.desc_json.editorState)
    }, [activeItem, active])

    console.log(editorState, "editr")
    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            setNewImageFile(acceptedFiles[0])
        }
    })
    const onPostData = (data) => {
        if (newImageFile) formData.append("img", newImageFile)
        formData.append("date", data?.date)
        formData.append("desc_json", JSON.stringify(editor))


        request(`${API_URL}organizations/news/${activeItem.id}/`, "PATCH", formData, headersImg())
            .then(res => {
                setActive(false)
                // dispatch(onAddHomeNews(res))
                dispatch(onEditHomeNews({id: activeItem.id, data: res}))
            })


    }

    const onDelete = () => {
        setActive(false)
        request(`${API_URL}organizations/news/${activeItem.id}/`, "DELETE", null, headers())
            .then(res => {

                setActiveDelete(false)
                dispatch(onDeleteHomeNews(activeItem.id))
                dispatch(onAddAlertOptions({
                    status: true,
                    type: "success",
                    msg: res.message
                }))

            })

    }
    console.log(activeItem)
    return (
        <div className={cls.gallery}>
            <Button onClick={() => setActive(false)}>Ortga</Button>
            {/*<Form isChange={false} value={"Add"} extraClassname={cls.gallery}>*/}
            <div
                {...getRootProps()}
                className={cls.gallery__image}
            >
                <input {...getInputProps()}/>
                {
                    newImageFile
                        ? <img className={cls.gallery__inner} src={URL.createObjectURL(newImageFile)} alt=""/>
                        : <img src={activeItem.img} alt=""/>
                }
            </div>
            <Input extraClass={cls.gallery__input} name={"date"} type={"date"} register={register}/>
            <TextEditor onSubmit={(e) => setEditor(e)} editorState={editorState}/>

            {/*</Form>*/}
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button onClick={handleSubmit(onPostData)}>Edit</Button>
                <Button type={"danger"} onClick={handleSubmit(() => setActiveDelete(true))}>Delete</Button>
            </div>
            <ConfirmModal onClick={onDelete} active={activeDelete} setActive={setActiveDelete}/>
        </div>
    )
}

