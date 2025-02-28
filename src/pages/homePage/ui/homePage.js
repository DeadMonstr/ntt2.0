import {HomeHeader, HomeNewsProfile, HomePage} from "entities/home";

import cls from "./homePage.module.sass"
import {HomeNews} from "features/homePage";
import {Outlet, Route, Routes} from "react-router";

export const Home = () => {
    return (
        <div className={cls.header}>
            <HomeHeader/>

            <Outlet/>
            <Routes>
                <Route path={"/"} element={
                    <div className={cls.header__box}>
                        <HomePage/>
                        <HomeNews/>
                    </div>}/>
                <Route path={"news-profile/:id"} element={<HomeNewsProfile/>}/>

            </Routes>

        </div>
    );
};

