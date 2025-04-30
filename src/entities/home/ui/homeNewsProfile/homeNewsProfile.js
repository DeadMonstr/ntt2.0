import cls from "./homeNewsProfile.module.sass"
import {getProfileItem} from "entities/news/model/newsSelector";
import {useDispatch, useSelector} from "react-redux";
import profileImg from "shared/assets/images/profileImg.svg"
import {Button} from "shared/ui/button/button";
import {useNavigate, useParams} from "react-router";
import univerImg from "shared/assets/images/Ellipse 118.png"
import {useEffect, useState} from "react";
import {fetchProfileItem} from "entities/news/model/newsThunk";


export const HomeNewsProfile = () => {
    const data = useSelector(getProfileItem)

    const {id} = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchProfileItem(id))
    } , [])
    const renderData = () => {
        return data?.landing?.map(item => (
            <div className={cls.profile__footer_container_box}>

                <div className={cls.profile__footer_container_box_header}>
                    <img src={univerImg} alt=""/>
                    <h2>{item.name}</h2>
                </div>
                <ul>
                    <li>Ta'lim tili <span>{item.language}</span></li>
                    <li>Ta’lim shakli <span>{item.shift}</span></li>
                    <li>Talablar <span dangerouslySetInnerHTML={{__html: item.requirements}}></span></li>
                    <li>Kontrakt to’lovi<span>{item.price}</span></li>
                </ul>

                <div className={cls.profile__footer_container_box_footer}>
                    <h2>
                        Yo'nalish haqida
                    </h2>
                    <p dangerouslySetInnerHTML={{__html: item.desc}}></p>
                </div>


            </div>
        ))
    }

    return (
        <div className={cls.profile}>
            <Button onClick={() => navigate(-1)}>Back</Button>
            <div className={cls.profile__container}>
                <div className={cls.profile__container_left}>
                    <div className={cls.profile__container_left_img}>
                        <img src={profileImg} alt=""/>
                    </div>
                    <div className={cls.profile__container_left_info}>
                        O’zbekistonda Oliy Ta’limni 3 tilda olish mumkin.
                    </div>
                </div>
                <div className={cls.profile__container_right}>
                    <div className={cls.profile__container_right_header}>
                        Ma’lumotlar
                    </div>
                    <div className={cls.profile__container_right_info} dangerouslySetInnerHTML={{__html: data?.desc_json?.text}}>

                    </div>
                </div>
            </div>

            <div className={cls.profile__footer}>

                <div className={cls.profile__footer_title}>
                    E’lonlar
                </div>
                <div className={cls.profile__footer_container}>
                    {renderData()}
                </div>

            </div>
        </div>


    );
};

