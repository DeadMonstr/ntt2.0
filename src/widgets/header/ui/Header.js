import React, {useState} from 'react';

import cls from "./Header.module.sass"


import { SeasonSwitcher} from "features/seasonSwitcher";




export const Header = () => {

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

