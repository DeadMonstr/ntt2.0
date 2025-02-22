import {HomeHeader, HomePage} from "entities/home";

import cls from "./homePage.module.sass"
export const Home = () => {
    return (
        <div className={cls.header}>
            <HomeHeader/>
            <HomePage/>

        </div>
    );
};

