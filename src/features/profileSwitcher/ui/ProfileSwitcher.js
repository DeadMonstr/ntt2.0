import React, {useCallback, useState} from 'react';
import classNames from "classnames";

import {Popup} from "shared/ui/popup";

import cls from "./ProfileSwitcher.module.sass";
import logoImage from "shared/assets/logo/logo.png";
import {Navigate, useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {exit} from "../../../pages/login/model/loginSlice";


const optionsSeason = [
    {
        id: 1,
        icon: "far fa-user-circle",
        title: "Profil",
        type:"profile"
    },
    {
        id: 2,
        icon: ["fas fa-sign-out-alt", cls.exit],
        title: "Chiqish",
        type:"exit"
    },
]

export const ProfileSwitcher = ({active, setActive}) => {

    // const [active, setActive] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const renderList = useCallback(() => {
        return optionsSeason.map(item => {
            return (
                <div
                    onClick={()=>onClick(item.type)}
                    key={item.title}
                     className={cls.item}
                >
                    <i className={classNames(item.icon)}/>
                    <h2>{item.title}</h2>
                </div>
            )
        })
    }, [])

    const onClick = (type) => {
        if (type === "profile") {
            navigate("/admin/profile", { replace: true })
        } else {
            dispatch(exit())
            navigate("/login", { replace: true })
        }
    }

    return (
        <Popup
            // extraClass={cls}
            trigger={
                <div className={cls.switcher}>
                    <img
                        onClick={() => setActive(active === "profile" ? "" : "profile")}
                        className={cls.switcher__title}
                        src={logoImage}
                        alt=""
                    />
                </div>
            }
            type="handmade"
            children={renderList()}
        />
    );
};

