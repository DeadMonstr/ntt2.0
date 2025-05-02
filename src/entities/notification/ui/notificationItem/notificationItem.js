import React, {useEffect, useState} from 'react';

import cls from "./notificationItem.module.sass";

import {useDispatch, useSelector} from "react-redux";
import {fetchNotificationProfile} from "entities/notification/module/notificationThunk";
import {useParams} from "react-router";
import {API_URL, headers, useHttp} from "shared/api/base";
import {Button} from "shared/ui/button/button";
import {getNotificationProfile} from "entities/notification/module/notificationSelector";
import {onAddMsg} from "entities/notification/module/notificationSlice";
import TextEditor from "shared/ui/textEditor/TextEditor";

export const NotificationItem = () => {

    const dispatch = useDispatch()

    const {id} = useParams()
    const orgId = localStorage.getItem("organization_id")


    const data = useSelector(getNotificationProfile)

    const {request} = useHttp()
    useEffect(() => {
        dispatch(fetchNotificationProfile({id, orgId}))
    }, [id , orgId])

    const onPostMsg = (e) => {

        const res = {
            description: e.text,
            desc_json: e.editorState,
            organization: orgId,
            student_id: Number(id)
        }

        request(`${API_URL}students/notification/create/`, "POST", JSON.stringify(res), headers())
            .then(res => {
                console.log(res)
                dispatch(onAddMsg(res))
            })
    }


    return (
        <div className={cls.notification}>
            <div className={cls.notification__box}>
                {data?.results?.map(item => (
                    <div className={cls.notification__box_item}>
                        <div dangerouslySetInnerHTML={{__html: item.description}}></div>
                        <div className={cls.notification__box_item_time}>{item.created_at}</div>
                    </div>

                ))}
            </div>

            <div className={cls.notification__text}>
                <TextEditor extraClass={cls.notification__text_item} onSubmit={onPostMsg} isSubmit={true}/>

            </div>

        </div>
    );
}
