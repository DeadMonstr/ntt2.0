import React, {useState} from 'react';
import {useSelector} from "react-redux";

import cls from "./Header.module.sass"
import Logo from "shared/assets/logo/Layer_1.svg"


import {getSeasonSwitcherData, SeasonSwitcher} from "features/seasonSwitcher";
import {LanguageSwitcher} from "features/languageSwitcher";
import {ProfileSwitcher} from "features/profileSwitcher";

import userLogo from "shared/assets/images/userLogo.svg"



export const Header = () => {

    const currentSeason = useSelector(getSeasonSwitcherData)
    const [active, setActive] = useState("")


    return (
        <div className={cls.header}>


            <div>
                <div>
                    <SeasonSwitcher setActive={setActive} active={active}/>
                    
                </div>
            </div>





            {/*<div className={cls.container}>*/}
            {/*    <LanguageSwitcher setActive={setActive} active={active }/>*/}
            {/*    <ProfileSwitcher setActive={setActive} active={active}/>*/}
            {/*</div>*/}

        </div>
    );
};

