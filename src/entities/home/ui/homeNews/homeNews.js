import cls from "./homeNews.module.sass"
import itemImg from "shared/assets/images/Rectangle 1001.svg"
import {useNavigate} from "react-router";
import {useState} from "react";
import {Modal} from "shared/ui/modal";

export const HomeNewsList = ({item}) => {
    const navigate = useNavigate()

    const [activeItem, setActiveItem] = useState(null)

    const [activeModal, setActiveModal] = useState(false)
    const renderData = () => {

        return item?.results?.map(item => (
            <div className={cls.box}>

                <div className={cls.box__links}>
                    <a href={item?.shared?.telegram}>
                        <i className={"fa-brands fa-telegram"}/>
                    </a>
                    <a href={item?.shared?.facebook}>
                        <i className={"fa-brands fa-facebook"}/>
                    </a>
                    <a href={item?.shared?.instagram}>
                        <i className={"fa-brands fa-instagram"}/>
                    </a>


                </div>


                <div className={cls.box__img}>
                    <img src={item.img ? item.img : itemImg} alt=""/>
                    <h2>Yangilik</h2>
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
                        {item.name}
                    </div>
                    <div
                        dangerouslySetInnerHTML={{__html: item.desc_json.text}}
                        className={cls.box__info_text}
                    />
                </div>

                <h3
                    onClick={() => navigate(`news/${item.id}`)}
                    className={cls.box__link}
                >
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

