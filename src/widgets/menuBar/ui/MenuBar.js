import React, {useCallback, useEffect, useState} from 'react';
import classNames from "classnames";

import {NavLink} from "react-router-dom";
import logOut from "shared/assets/icons/Log out.svg"


import cls from "./MenuBar.module.sass"
import {useDispatch, useSelector} from "react-redux";
import {getUserJob, getUserOrganizationId, getUserOrganizationName} from "entities/userProfile";

import userLogo from "shared/assets/images/userLogo.svg";
import {useNavigate} from "react-router";
import {menuBarList} from "../model/selector/menuBarSelector";
import {fetchMenuSettingsTypes} from "widgets/menuBar/model/thunk/menuBarThunk";


import { ReactComponent as Dashboard } from  "shared/assets/images/Vector.svg" ;
import { ReactComponent as Applications }  from "shared/assets/images/Vector-1.svg";
import { ReactComponent as CourseApplications }  from "shared/assets/images/Vector-2.svg";
import { ReactComponent as Settings }  from "shared/assets/images/Vector-3.svg";
import { ReactComponent as News }  from "shared/assets/icons/fluent_news-16-regular.svg";
import { ReactComponent as Notification }  from "shared/assets/icons/ion_mail-notification.svg";


const icons = [
    {
        to: "dashboard",
        img: <Dashboard/>,
    },
    {
        to: "applications",
        img: <Applications/>,
    },
    {
        to: "organizationTypes",
        img: <CourseApplications/>,
    },
    {
        to: "organizationProfile",
        img: <CourseApplications/>,
    },
    {
        to: "settings",
        img: <Settings/>,
    },
    {
        to: "testListPage",
        img: <Settings/>,
    },
    {
        to: "news",
        img: <News/>,
    },
    {
        to: "notification",
        img: <Notification/>,
    },
]




export const MenuBar = () => {

    const [activeMultiLink, setActiveMultiLink] = useState(false)
    const userRole = useSelector(getUserJob)
    const userOrganizationName = useSelector(getUserOrganizationName)
    const userOrganizationId = useSelector(getUserOrganizationId)
    const menuList = useSelector(menuBarList)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMenuSettingsTypes())
    },[])



    const renderMenuList = useCallback(() => {


        return menuList?.map(item => {
            if (item.roles?.includes(userRole?.toLowerCase())) {
                if (item?.isMultiLink) {
                    return <MultipleMenuItem item={item}/>
                }


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
                        {icons.filter(icon => icon.to === item.to)[0]?.img}
                        <h1>{item?.isOrganization ? userOrganizationName : item.label}</h1>
                    </NavLink>
                )
            }
        })
    }, [activeMultiLink, userOrganizationId, userOrganizationName, userRole, menuList])

    const onLogOut = () => {
        localStorage.clear()
        navigate("/login")
    }
    return (
        <>
            <div className={cls.menubar}>
                <div className={cls.profile}>

                    <img className={cls.profile__img} src={userLogo} alt="Logo"/>

                    <h2>Shahzod Omonboyev</h2>
                </div>
                <div className={cls.options}>
                    <div className={cls.options__list}>
                        {
                            renderMenuList()
                        }
                    </div>

                    <div onClick={onLogOut} className={cls.menubar__logout}>
                        <img src={logOut} alt=""/>
                        <h2>Chiqish</h2>
                    </div>
                </div>



            </div>
        </>
    );
};




const MultipleMenuItem = ({item}) => {
    const [activeMultiLink, setActiveMultiLink] = useState(false)


    const onChange = (e) => {
        e.preventDefault()

        setActiveMultiLink(prev => !prev)
    }

    return (
        <div
            className={classNames(cls.options__multipleItem)}
        >
            <NavLink
                key={item.to}
                className={
                    ({isActive}) =>
                        isActive ? classNames(cls.item, cls.active) : cls.item
                }
                onClick={onChange}
                to={item.to}
            >
                {icons.filter(icon => icon.to === item.to)[0]?.img}
                <h1>{item.label}</h1>
                <i className={classNames("fas fa-chevron-down", {
                    [cls.active]: activeMultiLink
                })}/>
            </NavLink>
            <div
                className={classNames(cls.list, {
                    [cls.active]: activeMultiLink
                })}
            >
                <div className={cls.container}>
                    {
                        item?.types?.map(link => {
                            return (
                                <NavLink
                                    key={link.to}
                                    className={
                                        ({isActive}) =>
                                            isActive ? classNames(cls.list__item, cls.active) : cls.list__item
                                    }
                                    to={`${item.to}/${link.id}`}
                                >
                                    {/*<i className={classNames(item.icon)}/>*/}
                                    {link.name}
                                </NavLink>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}