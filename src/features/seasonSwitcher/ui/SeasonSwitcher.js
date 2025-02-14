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
        title: "21-22"
    },
    {
        title: "22-23"
    },
    {
        title: "24-25"
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
            dispatch(fetchCurrentSeason(years.filter(item => item.current_year)[0]))
        }

    }, [years])

    const onChange = (data) => {
        dispatch(fetchCurrentSeason(data))
    }
    const onToggle = () => setActive(active === "season" ? "" : "season")


    return (
        <Popup
            trigger={
                <div className={cls.switcher}>
                    <h1
                        className={cls.switcher__title}
                        onClick={onToggle}
                    >
                        Mavsumni o'zgartirish
                    </h1>

                    <i
                        onClick={onToggle}
                        className={classNames(
                            "fas " + (active === "season" ? "fa-chevron-up" : "fa-chevron-down"),
                            cls.switcher__icon
                        )}
                    />
                </div>
            }
            defaultActive={currentYear}
            onChange={onChange}
            // extraClass={classNames(cls.switcher__popup, {
            //     [cls.active]: active === "season"
            // })}
            options={isMobile ? telOptionsSeason : years.map(item => ({...item, title: item.date}))}
        />
    );
};

