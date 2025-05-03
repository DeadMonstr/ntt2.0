import React, {useEffect, useState} from 'react';
import cls from "./image.module.sass";
import {useHttp} from "shared/api/base";
import TextEditor from "shared/ui/textEditor/TextEditor";
import {useDropzone} from "react-dropzone";
import classNames from "classnames";
import {Button} from "shared/ui/button/button";

export const Image = ({component, onDelete, onComplete, onEdit, isView}) => {


    return <div className={cls.image}>
        {component.completed ?
            <View component={component} onEdit={onEdit} isView={isView}/>
            :
            <Create component={component} onDelete={onDelete} onComplete={onComplete}/>
        }
    </div>
};



const View = ({component,onEdit,isView}) => {

    const [image,setImage] = useState(null)


    const onChangeComponent = () => {
        console.log("clickssssssssssssssss")
        onEdit(component.index)
    }

    useEffect(() => {
        setImage(component.image)
    }, [component])

    console.log(image,"asdasdas")
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
                        ? <img className={cls.view__image} src={image} alt="uploaded"/>
                        : <img className={cls.view__image} src={URL.createObjectURL(image)} alt="preview"/>
                    }
                </>
            }



        </div>
    )
}

const Create = ({onDelete,component,onComplete}) => {

    const {request} = useHttp()
    const [image, setImage] = useState(null)


    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                // Rasmni ko‘rsatish uchun file saqlaymiz
                setImage(file);
            }
        }
    });
    const onSubmit = () => {


        const data = {
            image
        }


        // request(`${API_URL}`,"POST",data,headers())
        //     .then(res => console.log(res))


        onComplete({index: component.index, ...component, ...data})
    }

    const onCLickDelete = () => {
        onDelete({index: component.index})
    }


    return (
        <div className={cls.create} >
            <div className={cls.delete} onClick={onCLickDelete}>
                <i className={"fa fa-trash"}></i>
            </div>



            <div {...getRootProps()} className={cls.create__image}>
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

            <Button onClick={onSubmit}>Tasdiqlash</Button>

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