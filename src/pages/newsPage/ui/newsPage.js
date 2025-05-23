import cls from "./news.module.sass";
import {NewsList} from "entities/news";
import React, {useEffect, useMemo, useState} from "react";

import {useDispatch, useSelector} from "react-redux";

import {fetchNews} from "entities/news/model/newsThunk";
import {AddNews, EditNews} from "features/news";
import {Pagination} from "../../../features/pagination";
import {getNews} from "../../../entities/news/model/newsSelector";
import {getUserJob} from "../../../entities/userProfile";

export const NewsPage = () => {


    const userRole = useSelector(getUserJob)
    const data = useSelector(getNews)
    const [activeModal, setActiveModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)
    const [activeItem, setActiveEditItem] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = useMemo(() => 6, [])


    const dispatch = useDispatch()
    const id = localStorage.getItem("organization_id")

    useEffect(() => {
        if (pageSize && currentPage)
            dispatch(fetchNews({
                organization_id: id,
                offset: (currentPage - 1) * pageSize,
                limit: pageSize,
            }))
    }, [id, currentPage, pageSize])


    return (
        <div className={cls.news}>

            <div className={cls.news__header}>
                <h1>So’ngi yangiliklar </h1>

            </div>

            {userRole?.toLowerCase() !== "admin" && <div className={cls.news__btns}>
                {!activeModal ? <i onClick={() => setActiveModal(!activeModal)} className={"fa fa-plus"}/> :
                    <i onClick={() => setActiveModal(!activeModal)} className={"fa fa-times"}/>
                }
            </div>}

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

            {/*<AddHomeNews active={activeModal} setActive={setActiveModal}/>*/}

            <Pagination
                totalCount={data?.count}
                onPageChange={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
            />

        </div>
    );
};

