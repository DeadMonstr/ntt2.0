import cls from "features/homePage/ui/homeNews/homeNews.module.sass"
import {useDispatch, useSelector} from "react-redux";
import {getHomeNews, HomeNewsList} from "entities/home";

import {useEffect, useState} from "react";

import {fetchNews} from "entities/home/model/thunk/newsThunk";

export const HomeNews = () => {
    const homeNewsData = useSelector(getHomeNews)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchNews())
    }, [])


    return (
        <div className={cls.news}>

            <div className={cls.news__header}>
                <h1>So’ngi yangiliklar % Trendlar</h1>
                <h3>Hamasini ko’rish</h3>
            </div>

            <div className={cls.news__list}>
                <HomeNewsList item={homeNewsData}/>
            </div>


        </div>
    );
};


