import cls from "features/homePage/ui/homeNews/homeNews.module.sass";
import {useDispatch, useSelector} from "react-redux";
import {getHomeNews, HomeNewsList} from "entities/home";
import {useEffect} from "react";
import {fetchNews} from "entities/home/model/thunk/newsThunk";
import {Helmet} from "react-helmet-async";


export const HomeNews = () => {
    const homeNewsData = useSelector(getHomeNews);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNews());
    }, []);

    return (
        <>
            <Helmet>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta property="og:title" content="So’ngi yangiliklar % Trendlar"/>
                <meta property="og:description" content={`Eng so‘nggi yangiliklarni kuzatib boring!`}/>
                <meta property="og:image" content="https://talimxabarlari.uz/wp-content/uploads/gimnastika.png"/>
                <meta name="author" content="Rayhona To‘xtayeva"/>
            </Helmet>
            <div className={cls.news}>


                <div className={cls.news__header}>
                    <h1>So’ngi yangiliklar  Trendlar</h1>
                    <h3>Hamasini ko’rish</h3>
                </div>

                <div className={cls.news__list}>
                    <HomeNewsList item={homeNewsData}/>
                </div>
            </div>
        </>
    );
};
