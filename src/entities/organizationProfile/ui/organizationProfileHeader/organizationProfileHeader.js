import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import classNames from "classnames";

import cls from "./organizationProfileHeader.module.sass";
import applications from "shared/assets/images/8275507 1.png";
import announcements from "shared/assets/images/3d-rendering-two-pictures-isolated-png 1.png";
import gallery from "shared/assets/images/8275507 2.png";
import info from "shared/assets/images/info.png";
import grants from "shared/assets/images/grants.png";

export const OrganizationProfileHeader = memo(({setActive}) => {

    const [activeLink, setActiveLink] = useState(null)

    const linksList = useMemo(() => [
        {
            name: "Haqida",
            image: info,
            bgColor: "#E7EFFF"
        },
        {
            name: "Grantlar",
            image: grants,
            bgColor: "#E7EFFF"
        },
        {
            name: "Arizalar",
            image: applications,
            bgColor: "#E7EFFF"
        },
        {
            name: "E’lonlar",
            image: announcements,
            bgColor: "#C5D1DC80"
        },
        {
            name: "Gallereya",
            image: gallery,
            bgColor: "#E7EFFF"
        },
    ], [])


    useEffect(() => {
        const item = localStorage.getItem("organizationProfileHeader" )

        if (item) {
            setActiveLink(item)
            setActive(item)
        }
    },[])

    const onChangeActiveMenu = (name) => {
        localStorage.setItem("organizationProfileHeader" , name)
        setActive(name)
        setActiveLink(name)
    }



    const renderLinks = useCallback(() => {
        return linksList.map(item => {
            return (
                <div
                    className={classNames(cls.item, {
                        [cls.active]: activeLink === item.name
                    })}
                    onClick={() => onChangeActiveMenu(item.name)}
                >
                    <div
                        style={{background: item.bgColor}}
                        className={cls.item__image}
                    >
                        <img src={item.image} alt=""/>
                    </div>
                    <h2>{item.name}</h2>
                </div>
            )
        })
    }, [linksList, activeLink, setActive])

    return (
        <div className={cls.header}>
            {renderLinks()}
        </div>
    );
})
