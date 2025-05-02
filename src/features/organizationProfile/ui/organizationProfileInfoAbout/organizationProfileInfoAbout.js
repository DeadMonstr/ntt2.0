import React, {useEffect, useState} from 'react';

import cls from "features/organizationProfile/ui/organizationProfileInfoAbout/organizationProfileInfoAbout.module.sass"
import classNames from "classnames";
import {API_URL, headers, useHttp} from "shared/api/base";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {getOrganizationProfileData} from "entities/organizationProfile";
import TextEditor from "shared/ui/textEditor/TextEditor";


export const OrganizationProfileInfoAbout = ({isChange , setIsChange}) => {


    const {id} = useParams()
    const data = useSelector(getOrganizationProfileData)


    const [text, setText] = useState(null)
    const [editorState, setEditorState] = useState(null)



    useEffect(() => {
        if (data?.desc) {
            setText(data?.desc)
            setEditorState(data?.desc_json)
        }

    }, [data])




    const {request} = useHttp()


    const onSubmit = (e) => {
        setText(e.text)
        setIsChange(false)


        const data = {
            desc: e.text,
            desc_json: e.editorState
        }

        request(`${API_URL}organizations/organization/crud/update_desc_text/${id}/`, "PATCH", JSON.stringify(data), headers())
            .then(res => {
                setText(res.desc)
                setEditorState(res.desc_json)
            })
    }


    return (
        <div className={cls.info}>
            {/*<div className={cls.header}>*/}
            {/*    {userRole && <div className={cls.pen} onClick={onChange}>*/}
            {/*        {*/}
            {/*            isChange ?*/}
            {/*                <i*/}

            {/*                    className={classNames("fas fa-times")}*/}
            {/*                />*/}
            {/*                :*/}
            {/*                <i*/}
            {/*                    className={classNames("fas fa-pen")}*/}
            {/*                />*/}
            {/*        }*/}

            {/*    </div>}*/}
            {/*</div>*/}

            <div className={cls.container}>


                {
                    isChange ?
                        <TextEditor isSubmit={true}  editorState={editorState} onSubmit={onSubmit}/>
                        :
                        <p dangerouslySetInnerHTML={{__html: text}}/>
                }


            </div>
        </div>
    );
};

