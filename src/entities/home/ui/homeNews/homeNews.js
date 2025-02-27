import cls from "./homeNews.module.sass"
import itemImg from "shared/assets/images/Rectangle 1001.svg"
import {useNavigate} from "react-router";

export const HomeNewsList = ({item , setActiveEditItem , setActiveEditModal}) => {
    console.log(item)
    const navigate = useNavigate()
    const renderData = () => {

        return item.map(item => (
            <div className={cls.box}>

                {/*<div onClick={() => {*/}
                {/*    setActiveEditModal(true)*/}
                {/*    setActiveEditItem(item)*/}
                {/*}} className={cls.box__icons}>*/}
                {/*    <i className={"fa fa-pen"}/>*/}
                {/*</div>*/}

                <div className={cls.box__img}>
                    <img src={itemImg} alt=""/>
                    <h2>Yangilik</h2>
                </div>
                <div className={cls.box__info}>
                    <div className={cls.box__info_header}>
                        <h1>{item.date}</h1>
                        <div className={cls.box__info_header_views}>
                            <i className={"fa fa-eye"}/>
                            111
                        </div>
                    </div>
                    <div className={cls.box__info_title}>
                        {item.name}
                    </div>
                    <div className={cls.box__info_text}>
                        {item.descr}
                    </div>


                </div>
                <h3 onClick={() => navigate(`news-profile/${item.id}`)} className={cls.box__link}>
                    Batafsil <i className={"fa fa-arrow-right"}/>
                </h3>

            </div>
        ))
    }
    return (
        <>
            {renderData()}
        </>
    );
};

