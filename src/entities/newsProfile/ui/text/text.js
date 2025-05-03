import React, {useEffect, useState} from 'react';

import cls from "./text.module.sass"
import TextEditor from "shared/ui/textEditor/TextEditor";
import {Button} from "shared/ui/button/button";
import {API_URL, headers, useHttp} from "shared/api/base";
import {useParams} from "react-router";


export const Text = ({component,onDelete,onComplete,onEdit,isView}) => {





    return <div className={cls.text}>

        {component.completed ?
            <View component={component} onEdit={onEdit} isView={isView}/>
            :
            <Create component={component} onDelete={onDelete} onComplete={onComplete}/>
        }
    </div>


};




const View = ({component,onEdit,isView}) => {

    const [text,setText] = useState(null)


    useEffect(() => {
        setText(component?.desc_json?.text)
    },[component])


    const onChangeComponent = () => {
        onEdit(component.index)
    }




    return (
        <div className={cls.view}>


            <div className={cls.view_text} dangerouslySetInnerHTML={{__html: text}}></div>

            {
                !isView && <div className={cls.change} onClick={onChangeComponent}>
                    <i className={"fa fa-pen"}></i>
                </div>
            }

        </div>
    )
}

const Create = ({onDelete,component,onComplete}) => {

    const [editorState,setEditorState] = useState(null)


    const {id} = useParams()






    useEffect(() => {
        setEditorState(component?.desc_json?.editorState)
    },[component])


    const {request} = useHttp()

    const onSubmit = (data) => {


        const res = {
            desc_json: data,
            // ...data,
            news: id
        }

        request(`${API_URL}organizations/news_block/${component.id ? `${component.id}/` : ""}`, `${component.id ? "PATCH" : "POST"}`, JSON.stringify(res), headers())
            .then(res => {
                console.log(res)

                const data = {
                    ...res,
                    // complete: false
                }

                onComplete({index: component.index, ...component, ...data })
            })



    }

    const onCLickDelete = () => {
        onDelete({index: component.index})
    }


    return (
        <div className={cls.create}>
            <div className={cls.delete} onClick={onCLickDelete}>
                <i className={"fa fa-trash"}></i>
            </div>


            <TextEditor onSubmit={onSubmit} isSubmit={true}  editorState={editorState} setEditorState={setEditorState}  />


        </div>
    )
}