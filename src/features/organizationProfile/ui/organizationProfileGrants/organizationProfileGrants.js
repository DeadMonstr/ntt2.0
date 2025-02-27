import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {getOrganizationProfileData} from "entities/organizationProfile/model/selector/organizationProfileSelector";
import {API_URL, headers, useHttp} from "shared/api/base";
import cls from "features/organizationProfile/ui/organizationProfileInfoAbout/organizationProfileInfoAbout.module.sass";
import classNames from "classnames";
import TextEditor from "entities/textEditor/TextEditor";
import {Modal} from "shared/ui/modal";
import {useDropzone} from "react-dropzone";
import {Input} from "shared/ui/input";
import {Textarea} from "shared/ui/textArea";
import {Button} from "shared/ui/button/button";
import {useForm} from "react-hook-form";

export const OrganizationProfileGrants = ({isChange, setIsChange}) => {
    const {id} = useParams()
    const data = useSelector(getOrganizationProfileData)

    // const formData = new FormData()
    // const {register , handleSubmit , setValue} = useForm()
    //
    // const [newImageFile, setNewImageFile] = useState(null)
    // const {getRootProps, getInputProps} = useDropzone({
    //     onDrop: (acceptedFiles) => {
    //         setNewImageFile(acceptedFiles[0])
    //     }
    // })
    const [text,setText] = useState(null)
    const [editorState,setEditorState] = useState(null)





    useEffect(() => {
        if (data?.desc) {
            setText(data?.grand_text)
            setEditorState(data?.grand_json)
        }
    },[data])







    const {request} = useHttp()



    // const onSubmit = (data) => {
    //
    //     formData.append("url", newImageFile)
    //     formData.append("type", data.text)
    //     request(`${API_URL}organizations/organization/crud/update_grand_text/${id}/`, "PATCH", formData, headers())
    //         // .then(res => {
    //         //     setText(res.grand_text)
    //         //     setEditorState(res.grand_json)
    //         // })
    //     console.log(data)
    // }
    const onSubmit = (e) => {
        setText(e.text)
        setIsChange(false)


        const data = {
            grand_text: e.text,
            grand_json: e.editorState
        }

        request(`${API_URL}organizations/organization/crud/update_grand_text/${id}/`, "PATCH", JSON.stringify(data), headers())
            .then(res => {
                setText(res.grand_text)
                setEditorState(res.grand_json)
            })
    }
    return (
        <div className={cls.info}>

            {/*<Modal extraClass={cls.gallery__main} active={isChange} setActive={setIsChange}>*/}
            {/*    <h1>Add Gallery</h1>*/}

            {/*   <div className={cls.gallery}>*/}
            {/*       <div*/}
            {/*           {...getRootProps()}*/}
            {/*           className={cls.gallery__image}*/}
            {/*       >*/}
            {/*           <input {...getInputProps()}/>*/}

            {/*           {*/}
            {/*               newImageFile*/}
            {/*                   ? <img className={cls.gallery__inner} src={URL.createObjectURL(newImageFile)} alt=""/>*/}
            {/*                   : <i className={classNames("fas fa-image", cls.gallery__icon)}/>*/}
            {/*           }*/}


            {/*       </div>*/}
            {/*       <Textarea title={"Text"} register={register} name={"text"}/>*/}

            {/*   </div>*/}


            {/*    <Button extraClass={cls.gallery__button} onClick={handleSubmit(onSubmit)}>*/}
            {/*        Add*/}
            {/*    </Button>*/}
            {/*</Modal>*/}
            <div className={cls.container}>


                {
                    isChange ?
                        <TextEditor isSubmit={true} editorState={editorState} onSubmit={onSubmit}/>
                        :
                        <p dangerouslySetInnerHTML={{__html: text}}></p>
                }


            </div>
        </div>
    )
};

