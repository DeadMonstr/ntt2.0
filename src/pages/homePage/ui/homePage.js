import {HomeHeader, HomeNewsProfile, HomePage, HomeTest, OnlineTestEnter, TestRating, TestSolving} from "entities/home";


import cls from "./homePage.module.sass"
import {HomeNews, OnlineTestEnterFeature} from "features/homePage";
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
                <Route path={"news/:id"} element={<HomeNewsProfile/>}/>
                <Route path={"onlineTest"} element={<OnlineTestEnter/>}/>
                <Route path={"onlineTest/onlineTestEnter"} element={<OnlineTestEnterFeature/>}/>
                <Route path={"test"} element={<HomeTest/>}/>
                <Route path={"testSolving"} element={<TestSolving/>}/>
                <Route path={"testRating"} element={<TestRating/>}/>

            </Routes>

        </div>
    );
};

