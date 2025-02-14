import React, {useCallback, useEffect, useState} from 'react';
import classNames from "classnames";
import {isMobile} from "react-device-detect";
import {NavLink} from "react-router-dom";




import cls from "./MenuBar.module.sass"
import {useSelector} from "react-redux";
import {getUserJob, getUserOrganizationId, getUserOrganizationName} from "../../../entities/userProfile";
import {menuConfig} from "../model/config/menuConfig";

export const MenuBar = () => {

    const [activeMultiLink, setActiveMultiLink] = useState(false)
    const [activeMenu, setActiveMenu] = useState(false)
    const userRole = useSelector(getUserJob)
    const userOrganizationName = useSelector(getUserOrganizationName)
    const userOrganizationId = useSelector(getUserOrganizationId)

    const renderMenuList = useCallback(() => {
        return menuConfig?.map(item => {
            if (item.roles?.includes(userRole?.toLowerCase())) {


                if (item?.isMultiLink) {
                    return (
                        <details
                            open={activeMultiLink}
                            className={classNames(cls.menubar__multiItem)}
                        >
                            <summary
                                className={cls.menubar__title}
                                onClick={() => setActiveMultiLink(!activeMultiLink)}
                            >
                                <NavLink
                                    key={item.to}
                                    className={
                                        ({isActive}) =>
                                            isActive ? classNames(cls.menubar__item, cls.active) : cls.menubar__item
                                    }
                                    to={item.to}
                                >
                                    <i className={classNames(item.icon)}/>
                                    {item.label}
                                </NavLink>
                                <i className="fas fa-chevron-down"/>
                            </summary>
                            <div
                                className={classNames(cls.menubar__wrapper)}
                            >
                                {
                                    item?.types?.map(link => {
                                        return (
                                            <NavLink
                                                key={link.to}
                                                className={
                                                    ({isActive}) =>
                                                        isActive ? classNames(cls.menubar__fork, cls.active) : cls.menubar__fork
                                                }
                                                to={`${item.to}/${link.to}`}
                                            >
                                                {/*<i className={classNames(item.icon)}/>*/}
                                                {link.label}
                                            </NavLink>
                                        )
                                    })
                                }
                            </div>
                        </details>
                    )
                }

                return (
                    <NavLink
                        onClick={() => setActiveMultiLink(false)}
                        key={item.to}
                        className={
                            ({isActive}) =>
                                isActive ? classNames(cls.menubar__item, cls.active) : cls.menubar__item
                        }
                        to={item?.isOrganization ? `${item.to}/${userOrganizationId}` : item.to}
                    >
                        {item.icon ? <i className={classNames(item.icon)}/> : <img src={item.img.organization} alt=""/>}
                        {item?.isOrganization ? userOrganizationName : item.label}
                    </NavLink>
                )
            }
        })
    }, [activeMultiLink, userOrganizationId, userOrganizationName, userRole  ,menuConfig])

    return (
        <>
            <i
                onClick={() => setActiveMenu(true)}
                className={classNames("fas fa-bars", cls.bars)}
            />
            <div
                className={classNames(cls.menubar, "close", {
                    [cls.activeOpe]: activeMenu
                })}
                onClick={(e) => {
                    console.log(e?.target?.classList.value)
                    if (e?.target?.classList && e?.target?.classList?.value?.includes("close")) {
                        setActiveMenu(false)
                    }
                }}
            >
                {
                    isMobile ? <div
                        className={classNames(cls.menubar__telMenu, {
                            [cls.activeOpe]: activeMenu
                        })}
                    >
                        {renderMenuList()}
                    </div> : renderMenuList()
                }
            </div>

        </>
    );
};

