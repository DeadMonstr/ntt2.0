import React, {useEffect, useState} from 'react';
import cls from "./image.module.sass";
import {API_URL, API_URL_DOC, headers, headersImg, useHttp} from "shared/api/base";
import TextEditor from "shared/ui/textEditor/TextEditor";
import {useDropzone} from "react-dropzone";
import classNames from "classnames";
import {Button} from "shared/ui/button/button";
import {useParams} from "react-router";

export const Image = ({component, onDelete, onComplete, onEdit, isView}) => {


    return <div className={cls.image}>
        {component.completed ?
            <View component={component} onEdit={onEdit} isView={isView}/>
            :
            <Create component={component} isView={isView} onDelete={onDelete} onComplete={onComplete}/>
        }
    </div>
};


const View = ({component, onEdit, isView}) => {

    const [image, setImage] = useState(null)


    const onChangeComponent = () => {

        onEdit(component.index)
    }

    useEffect(() => {
        setImage(component.img)
    }, [component])


    return (
        <div className={cls.view}>

            {
                !isView && <div className={cls.change} onClick={onChangeComponent}>
                    <i className={"fa fa-pen"}></i>
                </div>
            }


            {
                image &&
                <>
                    {
                        typeof image === 'string'
                            ? <img className={cls.view__image} src={API_URL_DOC+image} alt="uploaded"/>
                            : <img className={cls.view__image} src={URL?.createObjectURL(image)} alt="preview"/>
                    }
                </>
            }


        </div>
    )
}

const Create = ({onDelete, component, onComplete, isView}) => {

    const {request} = useHttp()
    const [image, setImage] = useState(null)

    const {id} = useParams()


    useEffect(() => {
        setImage(component.img)
    }, [component])


    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setImage(file);
            }
        }
    });
    const onSubmit = () => {
        const formData = new FormData();
        if (image) formData.append("img", image)
        formData.append("news", id)
        formData.append("type_block", component.type)


        request(`${API_URL}organizations/news_block/${component.id ? `${component.id}/` : ''}`, `${component.img ? "PATCH" : "POST"}`, formData, headersImg())
            .then(res => {

                onComplete({...component, news: id, id: res.id, img: res.img_url})
            })


    }

    const onCLickDelete = () => {
        onDelete({index: component.index, id: component.id})
    }


    return (
        <div className={cls.create}>
            <div className={cls.delete} onClick={onCLickDelete}>
                <i className={"fa fa-trash"}></i>
            </div>


            <div {...getRootProps()} className={cls.create__image}>
                <input {...getInputProps()} />
                {
                    image
                        ? (
                            typeof image === 'string'
                                ? <img className={cls.create__inner} src={API_URL_DOC+image} alt="uploaded"/>
                                : <img className={cls.create__inner} src={URL.createObjectURL(image)} alt="preview"/>
                        )
                        : <i className={classNames("fas fa-image", cls.create__icon)}/>
                }

            </div>
            <div className={cls.create__btn}>


                <Button onClick={onSubmit}>Tasdiqlash</Button>
            </div>

        </div>
    )
}

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
                            ? <img className={cls.create__inner} src={image} alt="uploaded"/>
                            : <img className={cls.create__inner} src={URL.createObjectURL(image)} alt="preview"/>
                    )
                    : <i className={classNames("fas fa-image", cls.create__icon)}/>
            }
        </div>
    );
};