import React, {useCallback, useEffect, useState} from 'react';
import classNames from "classnames";
import {isMobile} from "react-device-detect";
import {NavLink} from "react-router-dom";


import cls from "./MenuBar.module.sass"
import {useSelector} from "react-redux";
import {getUserJob, getUserOrganizationId, getUserOrganizationName} from "../../../entities/userProfile";
import {menuConfig} from "../model/config/menuConfig";
import userLogo from "shared/assets/images/userLogo.svg";

export const MenuBar = () => {

    const [activeMultiLink, setActiveMultiLink] = useState(false)
    const [activeMenu, setActiveMenu] = useState(false)
    const userRole = useSelector(getUserJob)
    const userOrganizationName = useSelector(getUserOrganizationName)
    const userOrganizationId = useSelector(getUserOrganizationId)

    const renderMenuList = useCallback(() => {
        return menuConfig?.map(item => {
            // if (item.roles?.includes(userRole?.toLowerCase())) {


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
                    {item.icon}

                    {/*{item.icon ? <i className={classNames(item.icon)}/> : <img src={item.img.organization} alt=""/>}*/}
                    <h1>{item?.isOrganization ? userOrganizationName : item.label}</h1>

                </NavLink>
            )
            // }
        })
    }, [activeMultiLink, userOrganizationId, userOrganizationName, userRole, menuConfig])

    return (
        <>
            <div className={cls.menubar}>
                <div className={cls.profile}>

                    <img className={cls.profile__img} src={userLogo} alt="Logo"/>

                    <h2>Shahzod Sobirjonov</h2>
                </div>
                <div className={cls.options}>
                    {
                        renderMenuList()
                    }
                </div>

            </div>
        </>
    );
};

