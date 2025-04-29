import {News} from "features/news";
import cls from "features/news/ui/news.module.sass";
import {NewsList} from "entities/news";
import {useState} from "react";
import {AddNews} from "features/news/ui/addNews/addNews";

export const NewsPage = () => {


    const [activeModal, setActiveModal] = useState(false)





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
                item={homeNewsData}
                setActiveEditModal={setActiveEditModal}
                setActiveEditItem={setActiveEditItem}
            />

            <AddNews
                active={activeModal}
                setActive={setActiveModal}
            />


            {/*<AddHomeNews active={activeModal} setActive={setActiveModal}/>*/}


        </div>
    );
};

