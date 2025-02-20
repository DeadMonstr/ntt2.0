import classNames from "classnames";
import {getSeasonSwitcherData} from "features/seasonSwitcher/model/seasonSwitcherSelector";
import {fetchCurrentSeason} from "features/seasonSwitcher/model/seasonSwitcherSlice";
import React, {useEffect, useState} from 'react';
import {isMobile} from "react-device-detect";
import {useDispatch, useSelector} from "react-redux";

import {Popup} from "shared/ui/popup";

import cls from "./SeasonSwitcher.module.sass"
import {useHttp} from "shared/api/base";
import {fetchAcademicYear} from "entities/oftenUsed/model/thunk/oftenUsedThunk";
import {getAcademicYears} from "entities/oftenUsed/model/selector/oftenUsedSelector";


const telOptionsSeason = [
    {
        id: 1,
        title: "2024-2025"
    },
    {
        id: 2,
        title: "2025-2026"
    },
    {
        id: 3,
        title: "2026-2027"
    }
]

export const SeasonSwitcher = ({active, setActive}) => {

    const dispatch = useDispatch()
    const currentYear = useSelector(getSeasonSwitcherData)
    const years = useSelector(getAcademicYears)


    const {request} = useHttp()


    useEffect(() => {
        dispatch(fetchAcademicYear())
    }, [])

    useEffect(() => {
        if (years.length) {
            dispatch(fetchCurrentSeason(years.filter(item => item.current_year)[0].title))
        }
    }, [years])

    const onChange = (data) => {
        dispatch(fetchCurrentSeason(data))
    }
    const onToggle = () => setActive(active === "season" ? "" : "season")

    console.log(currentYear)
    return (
        <div className={cls.switcher}>
            <h2 className={cls.subtitle}>Mavsumni o'zgartirish</h2>
            <Popup
                extraClass={cls.switcher__popup}
                trigger={
                    <>
                        <h1
                            className={cls.switcher__title}
                            onClick={onToggle}
                        >
                            Qabul: {currentYear?.title}
                        </h1>

                        <i
                            onClick={onToggle}
                            className={classNames(
                                "fas " + (active === "season" ? "fa-chevron-up" : "fa-chevron-down"),
                                cls.switcher__icon
                            )}
                        />
                    </>
                }
                defaultActive={currentYear}
                onChange={onChange}
                // extraClass={classNames(cls.switcher__popup, {
                //     [cls.active]: active === "season"
                // })}
                options={telOptionsSeason}
                // options={isMobile ? telOptionsSeason : years.map(item => ({...item, title: item.date}))}
            />
        </div>

    );
};

