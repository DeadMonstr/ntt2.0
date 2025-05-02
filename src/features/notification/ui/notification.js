import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchNotificationData, getNotificationData} from "entities/notification";

import cls from "./notification.module.sass"
import {Input} from "shared/ui/input";

import img from "shared/assets/icons/Group 7.svg"
import {Link} from "react-router-dom";

export const Notification = () => {
    const data = useSelector(getNotificationData)
    const dispatch = useDispatch()

    const id = localStorage.getItem("organization_id")
    const [list, setList] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (data)
            setList(data)
    }, [data])

    useEffect(() => {
        if (search) {
            setList(
                data.filter(item =>
                    item?.name?.includes(search.toLowerCase()) ||
                    item?.phone?.toLowerCase().includes(search?.toLowerCase())
                )
            )
        } else setList(data)
    }, [search])


    useEffect(() => {
        dispatch(fetchNotificationData(id))
    }, [])
    return (
        <div className={cls.notification}>

            <h1 className={cls.notification__title}>Messaging</h1>

            <Input
                name={"search"}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className={cls.notification__list}>
                {
                    list?.map(item => (
                        <Link to={`/admin/notification/item/${item.student_id}`}>
                            <div className={cls.notification__list_item}>
                                <img src={img} alt=""/>
                                <div className={cls.notification__list_item_text}>
                                    <h2>{item.name}</h2>
                                    <h3>{item.phone}</h3>
                                </div>

                            </div>
                        </Link>
                    ))
                }
            </div>


        </div>
    );
};

