import React, {useEffect, useState} from 'react';

import cls from "./infoCard.module.sass"
import {useSelector} from "react-redux";
import {getNewsProfileData} from "entities/newsProfile/model/selector/newsProfileSelector";


export const InfoCard = ({setActiveEdit}) => {

    const data = useSelector(getNewsProfileData)

    const [formattedDate, setFormattedDate] = useState("")

    useEffect(() => {
        console.log(data?.date, "data?.date")
        if (data?.date) {
            const [year, month, day] = data?.date?.split("-");
            setFormattedDate(`${day}-${month}-${year}`);
        }
    }, [data?.date])

    return (
        <div className={cls.card}>

            <div
                onClick={() => setActiveEdit(true)}
                className={cls.change}
            >
                <i
                    className={"fa fa-pen"}
                />
            </div>


            <img src={data.img} alt=""/>

            <div className={cls.info}>
                <span>Nomi:</span>
                <span>{data.title}</span>
            </div>
            <div className={cls.info}>
                <span>Sana:</span>
                <span>{formattedDate}</span>
            </div>

            {/*<p dangerouslySetInnerHTML={{__html: data.desc_json?.text}}></p>*/}

        </div>
    );
};

