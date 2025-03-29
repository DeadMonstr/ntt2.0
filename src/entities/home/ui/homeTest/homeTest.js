import React, {useState} from 'react';
import classNames from "classnames";

import {Button} from "shared/ui/button/button";
import {Select} from "shared/ui/select";

import cls from "./homeTest.module.sass";
import image from "shared/assets/images/3337507 1.png";
import uzImage from "shared/assets/icons/emojione-v1_flag-for-uzbekistan.png";
import ruImage from "shared/assets/icons/fxemoji_russianflag.png";

export const HomeTest = () => {

    const [active, setActive] = useState("")

    return (
        <div className={cls.test}>
            <div className={cls.test__container}>
                <img className={cls.image} src={image} alt=""/>
                <div className={cls.info}>
                    <h2 className={cls.info__title}>
                        2022-yil namunaviy testlar
                    </h2>
                    <p className={cls.info__text}>
                        2022-yilgi Davlat Test Markazi (DTM) imtihonlarida uchragan savollarning murakkablik darajasiga
                        mos keladigan, bilim va tahlil qilish qobiliyatini chuqur sinovdan o‘tkazuvchi test
                        savollari.
                    </p>
                    <div className={cls.info__list}>
                        <h2 style={{color: "#FF0000"}} className={cls.percent}>
                            36
                            <span className={cls.percent__inner}>Ishtirokchilar</span>
                        </h2>
                        <h2 style={{color: "#FF8C00"}} className={cls.percent}>
                            11
                            <span className={cls.percent__inner}>Fanlar soni</span>
                        </h2>
                        <h2 style={{color: "#A7B300"}} className={cls.percent}>
                            21.7%
                            <span className={cls.percent__inner}>Ishtirokchilar</span>
                        </h2>
                        <h2 style={{color: "#00AA3E"}} className={cls.percent}>
                            72.2%
                            <span className={cls.percent__inner}>Ishtirokchilar</span>
                        </h2>
                    </div>
                </div>
                <Button extraClass={classNames(cls.btn, cls.reverse)}>Natijalarni ko'rish</Button>
            </div>
            <div className={cls.test__container}>
                <h1 className={cls.title}>Diagnostik test</h1>
                <div className={cls.form}>
                    <h2 className={cls.form__title}>Test tilini tanlang</h2>
                    <div className={cls.form__lan}>
                        <div
                            onClick={() => setActive("uz")}
                            className={classNames(cls.selectLan, {
                                [cls.active]: active === "uz"
                            })}
                        >
                            <img src={uzImage} alt=""/>
                            O’zbek tili
                        </div>
                        <div
                            onClick={() => setActive("ru")}
                            className={classNames(cls.selectLan, {
                                [cls.active]: active === "ru"
                            })}
                        >
                            <img src={ruImage} alt=""/>
                            Rus tili
                        </div>
                    </div>
                    <div className={cls.form__sub}>
                        <Select title={"Birinchi fan"}/>
                        <Select title={"Ikkinchi fan"}/>
                    </div>
                    <h2 className={cls.form__title}>Majburiy fanlar</h2>
                    <div className={cls.form__sub}>
                        <p className={cls.subs}>
                            Ona tili (majburiy)
                            <span className={cls.subs__inner}>10 ta savol</span>
                        </p>
                        <p className={cls.subs}>
                            O'zbekiston tarixi (majburiy)
                            <span className={cls.subs__inner}>10 ta savol</span>
                        </p>
                        <p className={cls.subs}>
                            Matematika (majburiy)
                            <span className={cls.subs__inner}>10 ta savol</span>
                        </p>
                    </div>
                    <h2 className={cls.form__title}>
                        Testni umumiy vaqti:
                        <span>180 daqiqa</span>
                    </h2>
                    <h2 className={cls.form__title}>
                        Narxi:
                        <span>0 UZS</span>
                    </h2>
                    <Button extraClass={cls.btn}>Testni boshlash</Button>
                </div>
            </div>
        </div>
    );
}
