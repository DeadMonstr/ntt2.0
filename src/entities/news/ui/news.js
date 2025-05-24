import cls from "./news.module.sass"
import itemImg from "shared/assets/images/Rectangle 1001.svg"
import {useSelector} from "react-redux";
import {getNews} from "entities/news/model/newsSelector";
import {useNavigate} from "react-router";


export const NewsList = ({setActiveEditItem, setActiveEditModal}) => {

    const data = useSelector(getNews)


    const navigate = useNavigate()

    const onLink = (id) => {
        navigate(`profile/${id}`)
    }

    const renderData = () => {

        return data?.results?.map(item => (
            <div onClick={() => onLink(item.id)} className={cls.box}>

                {/*<div onClick={() => {*/}
                {/*    setActiveEditModal(true)*/}
                {/*    setActiveEditItem(item    )*/}
                {/*}} className={cls.box__pen}>*/}
                {/*    <i className={"fa fa-pen"}/>*/}
                {/*</div>*/}
                <div className={cls.box__img}>
                    <img src={item.img ? item.img : itemImg} alt=""/>
                    {/*<h2>Yangilik</h2>*/}
                </div>
                <div className={cls.box__info}>
                    <div className={cls.box__info_header}>
                        <h1>{item.date}</h1>
                        <div className={cls.box__info_header_views}>
                            <i className={"fa fa-eye"}/>
                            {item.views_display}
                        </div>
                    </div>
                    <div className={cls.box__info_title}>
                        {item.title}
                    </div>
                    {/*<div dangerouslySetInnerHTML={{__html: item?.desc_json?.text}} className={cls.box__info_text}>*/}

                    {/*</div>*/}


                </div>
                {/*<h3 onClick={() => navigate(`news-profile/${item.id}`)} className={cls.box__link}>*/}
                {/*    Batafsil <i className={"fa fa-arrow-right"}/>*/}
                {/*</h3>*/}

            </div>
        ))
    }
    return (
        <div className={cls.boxes}>
            {renderData()}
        </div>
    );
};

