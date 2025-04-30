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
import {getUserData} from "entities/userProfile";
import {Select} from "shared/ui/select";

export const News = () => {
    const homeNewsData = useSelector(getHomeNews)
    const userData = useSelector(getUserData)


    const [activeModal, setActiveModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)
    const [activeEditItem, setActiveEditItem] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (userData?.organization_id)
            dispatch(fetchNews({id: userData?.organization_id}))
    }, [userData?.organization_id])

    return (
        <div className={cls.news}>

            <div className={cls.news__header}>
                <h1>So’ngi yangiliklar {!activeModal ? "Trendlar" : "yaratish"}</h1>
                <h3>Hamasini ko’rish</h3>
            </div>

            <div className={cls.news__btns}>
                {!activeModal ? <i onClick={() => setActiveModal(!activeModal)} className={"fa fa-plus"}/> :

                    <i onClick={() => setActiveModal(!activeModal)} className={"fa fa-times"}/>

                }
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

                <>

                    <AddHomeNews active={activeModal} setActive={setActiveModal}/>

                </>

            }


        </div>
    );
};

const AddHomeNews = ({active, setActive}) => {
    const {register, setValue, handleSubmit} = useForm();
    const userData = useSelector(getUserData);

    const [blocks, setBlocks] = useState([]);
    const {request} = useHttp();
    const dispatch = useDispatch();


    const [editor, setEditor] = useState(null)
    const [newImageFile, setNewImageFile] = useState(null)
    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            setNewImageFile(acceptedFiles[0])
        }
    })
    const addBlock = (type) => {
        setBlocks(prev => [...prev, {id: Date.now(), type, text: null, image: null}]);
    };

    const onPostData = (data) => {
        const formData = new FormData();
        if (newImageFile) formData.append("img", newImageFile)
        formData.append("date", data?.date)
        formData.append("title", data?.title)
        formData.append("organization", userData?.organization_id)
        formData.append("desc_json", JSON.stringify(editor))

        // blocks.forEach((b, i) => {
        //     if (b.type === 'text' && b.text) {
        //         formData.append(`text_${i}`, JSON.stringify(b.text));
        //     }
        //
        //     if (b.type === 'image' && b.image) {
        //         formData.append(`img_${i}`, b.image); // image URL yoki fayl
        //     }
        // });
        // blocks.forEach((b, i) => {
        //     if (b.type === 'text' && b.text) {
        //         formData.append(`text_${i}`, JSON.stringify(b.text));
        //         console.log(b.text)
        //     }
        // });
        //
        //
        // blocks.forEach((b, i) => {
        //     if (b.type === 'image' && b.image) {
        //         formData.append(`img_${i}`, b.image);
        //
        //     }
        // });

        request(`${API_URL}organizations/news/`, "POST", formData, headersImg())
            .then(res => {
                setActive(false);
                dispatch(onAddHomeNews(res));
            });
    };

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

            <div style={{display: "flex", gap: "10px", marginBottom: "1rem"}}>
                <Button onClick={() => addBlock('text')}>Matn</Button>
                <Button onClick={() => addBlock('image')}>Rasm</Button>
            </div>
            <TextEditor onSubmit={(e) => setEditor(e)}/>

            {blocks.map((block, index) => (
                <div key={block.id} className={cls.news__container}>
                    {block.type === 'text' && (
                        <TextEditor
                            isSubmit={true}
                            onSubmit={(value) => {
                                const updated = [...blocks];
                                updated[index].text = value;
                                setBlocks(updated);

                                request(`${API_URL}upload/text/`,  "POST", JSON.stringify(value), headers())
                                    // .then(res => {
                                    //     // Agar backenddan image url qaytsa (masalan preview rasm)
                                    //     if (res.url) {
                                    //         updated[index].image = res.url;
                                    //         setBlocks([...updated]);
                                    //     }
                                    // });
                            }}
                        />
                    )}

                    {block.type === 'image' && (
                        <ImageDrop
                            image={block.image}
                            onImageSelect={(file) => {
                                const updated = [...blocks];
                                updated[index].image = file;
                                setBlocks(updated);


                                const formData = new FormData();
                                formData.append("img", file);
                                request(`${API_URL}upload/image/`, "POST", formData, headersImg())
                                    .then(res => {
                                        updated[index].image = res.url;
                                        setBlocks([...updated]);
                                    });
                            }}
                        />
                    )}
                    <Button
                        onClick={() => {
                            setBlocks(prev => prev.filter(b => b.id !== block.id));
                        }}
                    >
                        −
                    </Button>
                </div>
            ))}

            <Button onClick={handleSubmit(onPostData)}>Add</Button>
        </div>
    );
};

const ImageDrop = ({image, onImageSelect}) => {
    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                // Rasmni ko‘rsatish uchun file saqlaymiz
                onImageSelect(file);
            }
        }
    });

    return (
        <div {...getRootProps()} className={cls.gallery__image}>
            <input {...getInputProps()} />
            {
                image
                    ? (
                        typeof image === 'string'
                            ? <img className={cls.gallery__inner} src={image} alt="uploaded"/>
                            : <img className={cls.gallery__inner} src={URL.createObjectURL(image)} alt="preview"/>
                    )
                    : <i className={classNames("fas fa-image", cls.gallery__icon)}/>
            }
        </div>
    );
};

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

