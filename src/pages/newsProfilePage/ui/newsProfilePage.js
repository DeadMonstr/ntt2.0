import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {fetchNewsProfileData, InfoCard, ViewComponents} from "entities/newsProfile";


import cls from "./newsProfilePage.module.sass"
import {useDispatch, useSelector} from "react-redux";
import {getNewsProfileData} from "entities/newsProfile/model/selector/newsProfileSelector";
import {CrudComponents} from "features/newsProfile";



export const NewsProfilePage = () => {

    const {id} = useParams()
    const data = useSelector(getNewsProfileData)

    const [activeChange,setActiveChange] = useState(false)

    const onClickChange = () => {
        setActiveChange(state => !state)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchNewsProfileData(id))
    },[id])


    return (
        <div className={cls.profile}>
            <InfoCard/>

            <div className={cls.container}>
                <div className={cls.header}>
                    <h1>Ba'tafsil</h1>
                    <div className={cls.change} onClick={onClickChange }>
                        {activeChange ? <i className={"fa fa-times"}></i> :  <i className={"fa fa-pen"}></i>}


                    </div>
                </div>

                {
                    activeChange ? <CrudComponents/> : <ViewComponents/>
                }











            </div>
        </div>
    );
};

