import React, {useState} from 'react';
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";

import {Popup} from "shared/ui/popup";
import {getLanguageSwitcherData} from "../model/languageSwitcherSelector";
import {fetchCurrentLanguage} from "../model/languageSwitcherSlice";

import cls from "./LanguageSwitcher.module.sass";
import languageImage from "shared/assets/icons/language.png";



const optionsLanguage = [
    "en", "uz", "ru"
]


export const LanguageSwitcher = () => {

    const dispatch = useDispatch()

    const defaultLanguage = useSelector(getLanguageSwitcherData)
    const [active, setActive] = useState("")

    const onChange = (data) => {
        dispatch(fetchCurrentLanguage(data))
        setActive(false)
    }

    console.log(active)
    return (
        <div className={cls.switcher}>
            <img
                onClick={() => setActive(active === "language" ? "" : "language")}
                className={cls.switcher__title}
                src={languageImage}
                alt="languageImage"
            />
            <Popup
                onChange={onChange}
                defaultActive={defaultLanguage}
                extraClass={classNames(cls.switcher__popup, {
                    [cls.active]: active === "language"
                })}
                options={optionsLanguage}
            />
        </div>
    );
};
