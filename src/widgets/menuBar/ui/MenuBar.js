import React, {useCallback, useEffect, useState} from 'react';
import classNames from "classnames";
import {isMobile} from "react-device-detect";
import {NavLink} from "react-router-dom";
import logOut from "shared/assets/icons/Log out.svg"


import cls from "./MenuBar.module.sass"
import {useSelector} from "react-redux";
import {getUserData, getUserJob, getUserOrganizationId, getUserOrganizationName} from "../../../entities/userProfile";
import {menuConfig} from "../model/config/menuConfig";
import userLogo from "shared/assets/images/userLogo.svg";
import {useNavigate} from "react-router";

export const MenuBar = () => {

    const [activeMultiLink, setActiveMultiLink] = useState(false)
    const [activeMenu, setActiveMenu] = useState(false)
    const userRole = useSelector(getUserJob)
    const userOrganizationName = useSelector(getUserOrganizationName)
    const userOrganizationId = useSelector(getUserOrganizationId)
    const userData = useSelector(getUserData)

    const navigate = useNavigate()

    const renderMenuList = useCallback(() => {
        return menuConfig?.map(item => {
            if (item.roles?.includes(userRole?.toLowerCase())) {


                return (
                    <NavLink
                        onClick={() => setActiveMultiLink(false)}
                        key={item.to}
                        className={
                            ({isActive}) =>
                                isActive ? classNames(cls.options__item, cls.active) : cls.options__item
                        }
                        to={item?.isOrganization ? `${item.to}/${userOrganizationId}` : item.to}
                    >
                        {item.img}
                        <h1>{item?.isOrganization ? userOrganizationName : item.label}</h1>

                    </NavLink>
                )
            }
        })
    }, [activeMultiLink, userOrganizationId, userOrganizationName, userRole, menuConfig])

    const onLogOut = () => {
        localStorage.clear()
        navigate("/login")
    }

    console.log(userData, "userData")

    return (
        <>
            <div className={cls.menubar}>
                <div
                    className={cls.profile}
                    onClick={() => navigate("/admin/profile")}
                >

                    <img className={cls.profile__img} src={userData?.image} alt="Logo"/>

                    <h2>{userData?.name} {userData?.surname}</h2>
                </div>
                <div className={cls.options}>
                    {
                        renderMenuList()
                    }
                    <div onClick={onLogOut} className={cls.menubar__logout}>

                        <img src={logOut} alt=""/>
                        <h2>Chiqish</h2>

                    </div>
                </div>





            </div>
        </>
    );
};

