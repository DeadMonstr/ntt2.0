import cls from "./home.module.sass"

import logo from "shared/assets/logo/nttLogo.svg"
import earth from "shared/assets/icons/language.png"
import {Button} from "shared/ui/button/button";
import {useState} from "react";
import classNames from "classnames";
import {useNavigate} from "react-router";

const menuList = [
    {name: "/", label: "Home"},
    {name: "technicSchools", label: "Texnikumlar"},
    {name: "directions", label: "Yo'nalish"},
    {name: "grant", label: "Grant"},
    {name: "news", label: "Yangiliklar"},
    {name: "aboutUs", label: "Biz haqimizda"},
    {name: "onlineTest", label: "Online Test"}
];


export const HomeHeader = () => {


    const [activeMenu , setActiveMenu] = useState(menuList[0].name)
    const [activeSubMenu , setActiveSubMenu] = useState(false)

    const navigate = useNavigate()


    const renderMenu = () => {
        return menuList.map(item => (
            <li
            onClick={() => {
                setActiveMenu(item.name)
                setActiveSubMenu(false)

                navigate(item.name)
            }}
            className={classNames({
                [activeSubMenu ? cls.activeSubmenu : cls.active]: activeMenu === item.name
            })}
            >{item.label}</li>
        ))
    }

    return (
        <div className={cls.header}>
            <div onClick={() => setActiveSubMenu(!activeSubMenu)} className={cls.header__hamburger}>
                <i className={activeSubMenu ? "fa fa-times" :"fa fa-bars"}/>
            </div>

            <div className={cls.header__logo}>
                <img src={logo} alt=""/>
            </div>


            <ul className={cls.header__menu}>
                {renderMenu()}
            </ul>

             <div className={`${cls.header__subMenu} ${activeSubMenu ? cls.header__activeMenu : ""}`}>
                <ul>
                    {renderMenu()}
                </ul>
            </div>


            <div className={cls.header__end}>
                <div className={cls.header__end_language}>
                    <div className={cls.header__end_language_img}>
                        <img src={earth} alt=""/>
                    </div>
                    <div className={cls.header__end_language_text}>
                        O'zbek
                        <i className={"fa fa-caret-down"}/>
                    </div>
                </div>
                <Button onClick={() => navigate("/login")} extraClass={cls.header__end_btn}>Login</Button>
            </div>

        </div>
    );
};

