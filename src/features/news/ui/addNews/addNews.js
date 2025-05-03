import React, {useState} from 'react';
import cls from "./addNews.module.sass"
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import {API_URL, headers, headersImg, useHttp} from "shared/api/base";
import {useDropzone} from "react-dropzone";
import { onAddNews} from "entities/news/model/newsSlice";
import classNames from "classnames";
import {Input} from "shared/ui/input";
import {Button} from "shared/ui/button/button";

import {Modal} from "shared/ui/modal";
import TextEditor from "shared/ui/textEditor/TextEditor";



export const AddNews = ({active, setActive}) => {

    const {register , handleSubmit , setValue} = useForm()
    const id = localStorage.getItem("organization_id")
    const [editor, setEditor] = useState(null)
    const {request} = useHttp()
    const dispatch = useDispatch()


    const [newImageFile, setNewImageFile] = useState(null)
    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            setNewImageFile(acceptedFiles[0])
        }
    })


    const onPost = (data) => {
        const formData = new FormData();
        if (newImageFile) formData.append("img", newImageFile)
        formData.append("date", data?.date)
        formData.append("title", data?.title)
        formData.append("organization", id)
        formData.append("desc_json", JSON.stringify(editor))



        request(`${API_URL}organizations/news/`, "POST", formData, headersImg())
            .then(res => {
                setActive(false);
                dispatch(onAddNews(res));
                setValue("title", "");
                setValue("date", "");
                setNewImageFile(null);
            });
    };

    return (
        <Modal  title={"Yangiliklar qo’shish"} active={active} setActive={setActive}>
            <div className={cls.news}>
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
                <Input name={"title"} register={register} placeholder={"Nomi"}/>
                <Input register={register} name={"date"} type={"date"}/>
                <TextEditor extraClass={cls.news__editor} onSubmit={(e) => setEditor(e)}/>
                <Button onClick={handleSubmit(onPost)} extraClass={cls.news__btn}>Add</Button>
            </div>
        </Modal>
    )

}

// export const AddHomeNews = ({active, setActive}) => {
//     const {register, setValue, handleSubmit} = useForm();
//     const userData = useSelector(getUserData);
//
//     const [blocks, setBlocks] = useState([]);
//     const {request} = useHttp();
//     const dispatch = useDispatch();
//
//
//     const [editor, setEditor] = useState(null)
//     const [newImageFile, setNewImageFile] = useState(null)
//     const {getRootProps, getInputProps} = useDropzone({
//         onDrop: (acceptedFiles) => {
//             setNewImageFile(acceptedFiles[0])
//         }
//     })
//     const addBlock = (type) => {
//         setBlocks(prev => [...prev, {id: Date.now(), type, text: null, image: null}]);
//     };
//
//     const onPostData = (data) => {
//         const formData = new FormData();
//         if (newImageFile) formData.append("img", newImageFile)
//         formData.append("date", data?.date)
//         formData.append("title", data?.title)
//         formData.append("organization", userData?.organization_id)
//         formData.append("desc_json", JSON.stringify(editor))
//
//         // blocks.forEach((b, i) => {
//         //     if (b.type === 'text' && b.text) {
//         //         formData.append(`text_${i}`, JSON.stringify(b.text));
//         //     }
//         //
//         //     if (b.type === 'image' && b.image) {
//         //         formData.append(`img_${i}`, b.image); // image URL yoki fayl
//         //     }
//         // });
//         // blocks.forEach((b, i) => {
//         //     if (b.type === 'text' && b.text) {
//         //         formData.append(`text_${i}`, JSON.stringify(b.text));
//         //         console.log(b.text)
//         //     }
//         // });
//         //
//         //
//         // blocks.forEach((b, i) => {
//         //     if (b.type === 'image' && b.image) {
//         //         formData.append(`img_${i}`, b.image);
//         //
//         //     }
//         // });
//
//         request(`${API_URL}organizations/news/`, "POST", formData, headersImg())
//             .then(res => {
//                 setActive(false);
//                 dispatch(onAddHomeNews(res));
//             });
//     };
//
//     return (
//         <div className={cls.gallery}>
//
//             <div
//                 {...getRootProps()}
//                 className={cls.gallery__image}
//             >
//                 <input {...getInputProps()}/>
//                 {
//                     newImageFile
//                         ? <img className={cls.gallery__inner} src={URL.createObjectURL(newImageFile)} alt=""/>
//                         : <i className={classNames("fas fa-image", cls.gallery__icon)}/>
//                 }
//             </div>
//             <Input extraClass={cls.gallery__input} name={"title"} placeholder={"Title"} register={register}/>
//             <Input extraClass={cls.gallery__input} name={"date"} type={"date"} register={register}/>
//
//             <div style={{display: "flex", gap: "10px", marginBottom: "1rem"}}>
//                 <Button onClick={() => addBlock('text')}>Matn</Button>
//                 <Button onClick={() => addBlock('image')}>Rasm</Button>
//             </div>
//             <TextEditor onSubmit={(e) => setEditor(e)}/>
//
//             {blocks.map((block, index) => (
//                 <div key={block.id} className={cls.news__container}>
//                     {block.type === 'text' && (
//                         <TextEditor
//                             isSubmit={true}
//                             onSubmit={(value) => {
//                                 const updated = [...blocks];
//                                 updated[index].text = value;
//                                 setBlocks(updated);
//
//                                 request(`${API_URL}upload/text/`,  "POST", JSON.stringify(value), headers())
//                                 // .then(res => {
//                                 //     // Agar backenddan image url qaytsa (masalan preview rasm)
//                                 //     if (res.url) {
//                                 //         updated[index].image = res.url;
//                                 //         setBlocks([...updated]);
//                                 //     }
//                                 // });
//                             }}
//                         />
//                     )}
//
//                     {block.type === 'image' && (
//                         <ImageDrop
//                             image={block.image}
//                             onImageSelect={(file) => {
//                                 const updated = [...blocks];
//                                 updated[index].image = file;
//                                 setBlocks(updated);
//
//
//                                 const formData = new FormData();
//                                 formData.append("img", file);
//                                 request(`${API_URL}upload/image/`, "POST", formData, headersImg())
//                                     .then(res => {
//                                         updated[index].image = res.url;
//                                         setBlocks([...updated]);
//                                     });
//                             }}
//                         />
//                     )}
//                     <Button
//                         onClick={() => {
//                             setBlocks(prev => prev.filter(b => b.id !== block.id));
//                         }}
//                     >
//                         −
//                     </Button>
//                 </div>
//             ))}
//
//             <Button onClick={handleSubmit(onPostData)}>Add</Button>
//         </div>
//     );
// };
//
// const ImageDrop = ({image, onImageSelect}) => {
//     const {getRootProps, getInputProps} = useDropzone({
//         onDrop: (acceptedFiles) => {
//             const file = acceptedFiles[0];
//             if (file) {
//                 // Rasmni ko‘rsatish uchun file saqlaymiz
//                 onImageSelect(file);
//             }
//         }
//     });
//
//     return (
//         <div {...getRootProps()} className={cls.gallery__image}>
//             <input {...getInputProps()} />
//             {
//                 image
//                     ? (
//                         typeof image === 'string'
//                             ? <img className={cls.gallery__inner} src={image} alt="uploaded"/>
//                             : <img className={cls.gallery__inner} src={URL.createObjectURL(image)} alt="preview"/>
//                     )
//                     : <i className={classNames("fas fa-image", cls.gallery__icon)}/>
//             }
//         </div>
//     );
// };

