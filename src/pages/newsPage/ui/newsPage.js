import cls from "./news.module.sass";
import {NewsList} from "entities/news";
import {useEffect, useState} from "react";

import {useDispatch} from "react-redux";

import {fetchNews} from "entities/news/model/newsThunk";
import {AddNews, EditNews} from "features/news";

export const NewsPage = () => {


    const [activeModal, setActiveModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)
    const [activeItem, setActiveEditItem] = useState({})


    const dispatch = useDispatch()
    const id = localStorage.getItem("organization_id")

    useEffect(() => {
        dispatch(fetchNews(id))
    }, [])


    return (
        <div className={cls.news}>

            <div className={cls.news__header}>
                <h1>So’ngi yangiliklar </h1>

            </div>

            <div className={cls.news__btns}>
                {!activeModal ? <i onClick={() => setActiveModal(!activeModal)} className={"fa fa-plus"}/> :
                    <i onClick={() => setActiveModal(!activeModal)} className={"fa fa-times"}/>
                }
            </div>

            <NewsList
                setActiveEditModal={setActiveEditModal}
                setActiveEditItem={setActiveEditItem}
                // setActiveEditModal={setActiveEditModal}
                // setActiveEditItem={setActiveEditItem}
            />

            <AddNews
                active={activeModal}
                setActive={setActiveModal}
            />

            <EditNews
                active={activeEditModal}
                setActive={setActiveEditModal}
                item={activeItem}
            />

            {/*<AddHomeNews active={activeModal} setActive={setActiveModal}/>*/}


        </div>
    );
};

