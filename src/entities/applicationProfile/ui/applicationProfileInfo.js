import cls from "./application.module.sass"

import ava from "shared/assets/images/ava.svg"
import {Button} from "shared/ui/button/button";
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import img from "shared/assets/icons/img.svg"

export const ApplicationProfileInfo = ({data}) => {
    return (
        <div className={cls.application}>

            <ProfileLeft data={data}/>

            <div className={cls.application__middle}></div>
            <ProfileRight/>
        </div>
    );
};

const ProfileLeft = ({data}) => {
    const buttonItem = [
        {label: "Qabul qilinganlar", name: "accepted"},
        {label: "Rad etilganlar", name: "rejected"},
        {label: "Tahrirlashdan qaytganlar", name: "returned_from_edit"},
        {label: "Tahrirlashga qaytarilganlar", name: "sent_for_edit"},
        {label: "Imtihonga chaqirilganlar", name: "invited_to_exam"},
        {label: "Baholanganlar", name: "evaluated"},
        {label: "Shartnoma berilganlar", name: "contract_issued"},
        {label: "To‘lov qilganlar", name: "paid"},
        {label: "Talabalikka tavsiya qilinganlar", name: "recommended_for_admission"}
    ];

    const popupRef = useRef(null);
    const [activeButton, setActiveButton] = useState(null)

    const [activePopup, setActivePopup] = useState(false)

    useEffect(() => {
        setActiveButton(buttonItem[0])
    }, [])
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setActivePopup(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={cls.application__left}>

            <div className={cls.application__left_img}>
                <img src={ava} alt=""/>
            </div>
            <div className={cls.application__left_header}>
                <h2>Khusan Akhmedov</h2>
                <span>Arizachi</span>
            </div>
            <ul className={cls.application__left_info}>
                <li>Tel raqam : <span>99912123123</span></li>
                <li>Qo'shimcha raqam : <span>99912123123</span></li>
                <li>Elektron pochta : <span>isardor859@gmail.com</span></li>
            </ul>
            <div className={cls.application__left_footer}>
                <h2>Ariza m'alumotlari</h2>
                <ul>
                    <li>Ta'lim tili <span>Ta'lim tili</span></li>
                    <li>Yo'nalish <span>Ta'lim tili</span></li>
                    <li>Talim shakli <span>Ta'lim tili</span></li>
                    <li>Ariza turi <span>Ariza turi</span></li>
                </ul>

            </div>
            <Button onClick={() => setActivePopup(!activePopup)}
                    extraClass={cls.application__left_button}>{activeButton?.label} <i
                className={`fa fa-chevron-${activePopup ? "up" : "down"}`}/></Button>

            {/*{activePopup && */}
            <div ref={popupRef} className={`${cls.application__left_popup} ${activePopup ? cls.active : ""}`}>
                {buttonItem.map(item => (
                    <h2 key={item.name}
                        onClick={() => {
                            setActiveButton(item);
                            setActivePopup(false);
                        }}
                        className={classNames(cls.application__left_popup_item, {
                            [cls.application__left_popup_item_active]: activeButton?.name === item.name
                        })}>
                        {item.label}
                    </h2>
                ))}
            </div>
            {/*}*/}
        </div>
    )
}


const ProfileRight = () => {
    return (
        <div className={cls.application__right}>

            <div className={cls.application__right_header}>
                <h2>Pasport ma'lumotlari</h2>
                <ul>
                    <li>Pasport seriya : <span>AA950945</span></li>
                    <li>Identifikatsiya : <span>1231231123</span></li>
                    <li>Jinsi : <span>Erkak</span></li>
                    <li>Tug’ilgan joy : <span>Navoiy viloyati</span></li>
                </ul>

                <div className={cls.application__right_header_document}>
                    Passport nusxa
                    <div>
                        <img src={img} alt=""/>
                        <h6>Upload image</h6>

                    </div>
                </div>

            </div>

        </div>
    )
}

