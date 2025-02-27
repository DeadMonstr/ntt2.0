import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {getOrganizationProfileData} from "entities/organizationProfile/model/selector/organizationProfileSelector";
import {API_URL, headers, useHttp} from "shared/api/base";
import cls from "features/organizationProfile/ui/organizationProfileInfoAbout/organizationProfileInfoAbout.module.sass";
import classNames from "classnames";
import TextEditor from "entities/textEditor/TextEditor";

export const OrganizationProfileGrants = ({userRole}) => {
    const {id} = useParams()
    const data = useSelector(getOrganizationProfileData)


    const [text,setText] = useState(null)
    const [editorState,setEditorState] = useState(null)

    const [isChange,setIsChange] = useState(false)



    useEffect(() => {
        if (data?.desc) {
            setText(data?.grand_text)
            setEditorState(data?.grand_json)
        }
    },[data])


    const onChange = () => {
        setIsChange(state => !state)
    }



    const {request} = useHttp()



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
            <div className={cls.header}>
                <h1>Grantlar</h1>
                {userRole&&<div className={cls.pen} onClick={onChange}>
                    {
                        isChange ?
                            <i

                                className={classNames("fas fa-times")}
                            />
                            :
                            <i
                                className={classNames("fas fa-pen")}
                            />
                    }

                </div>}
            </div>

            <div className={cls.container}>


                {
                    isChange ?
                        <TextEditor isSubmit={true} editorState={editorState} onSubmit={onSubmit}  />
                        :
                        <p dangerouslySetInnerHTML={{__html: text}}></p>
                }


            </div>
        </div>
    )
};

