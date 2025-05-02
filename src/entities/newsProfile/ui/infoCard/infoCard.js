import React from 'react';

import cls from "./infoCard.module.sass"
import {useSelector} from "react-redux";
import {getNewsProfileData} from "entities/newsProfile/model/selector/newsProfileSelector";


export const InfoCard = () => {

    const data = useSelector(getNewsProfileData)


    return (
        <div className={cls.card}>

            <div className={cls.change}>
                <i className={"fa fa-pen"}></i>
            </div>


            <img src={data.img} alt=""/>

            <div className={cls.info}>
                <span>Nomi:</span>
                <span>{data.title}</span>
            </div>
            <div className={cls.info}>
                <span>Sana:</span>
                <span>{data.date}</span>
            </div>

            <p dangerouslySetInnerHTML={{__html: data.desc_json?.text}}></p>

        </div>
    );
};

