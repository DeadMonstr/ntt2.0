import React from 'react';

import {Button} from "shared/ui/button/button";
import {Timer} from "shared/lib/components/timer";

import cls from "./testSolving.module.sass";
import classNames from "classnames";

export const TestSolving = () => {

    const renderSubs = (data) => {
        return data.map(item => {
            return (
                <div className={cls.testSubs__item}>
                    <h2 className={cls.title}>{item}</h2>
                    <p className={cls.text}>30 ta savol</p>
                </div>
            )
        })
    }

    const renderMenu = () => {
        return (
            <p
                className={classNames(cls.menu__item, {
                    [cls.active]: true
                })}
            >
                Matematika
                <span>10/30</span>
            </p>
        )
    }

    const renderQuestion = () => {
        return (
            <div className={cls.question}>
                <h2
                    className={cls.question__title}
                >
                    1. Qaysi so‘zlar juftligi tub va yasama so‘zlarga mansub bo‘la
                    oladi?
                </h2>
                <div className={cls.question__list}>
                    {renderVariants([1, 2, 3, 4])}
                </div>
            </div>
        )
    }

    const renderVariants = (data) => {
        return data.map(item => {
            return (
                <h2
                    className={classNames(cls.item, {
                        [cls.active]: item === 1
                    })}
                >
                    B)
                    <span className={cls.item__inner}>bo‘g‘ma (kasallik nomi) − bo‘g‘ma (belgi-xususiyat bildiruvchi so‘z)</span>
                </h2>
            )
        })
    }

    return (
        <div className={cls.main}>
            <div className={cls.main__header}>
                <div className={cls.testSubs}>
                    <h1 className={cls.testSubs__title}>IXTIYORIY: </h1>
                    {renderSubs(["Ona tili va Adabiyot", "Tarix"])}
                </div>
                <div className={cls.testSubs}>
                    <h1 className={cls.testSubs__title}>MAJBURIY: </h1>
                    {renderSubs(["Matematika", "Ingliz tili", "Kimyo"])}
                </div>
            </div>
            <div className={cls.main__content}>
                <div className={cls.info}>
                    <div className={cls.info__title}>
                        <h2>Tarix</h2>
                    </div>
                    <div className={cls.info__container}>
                        {renderQuestion()}
                        {renderQuestion()}
                    </div>
                    <div className={cls.info__btn}>
                        <Button>Tugatish</Button>
                    </div>
                </div>
                <div className={cls.menu}>
                    <Timer/>
                    <div className={cls.menu__container}>
                        {renderMenu()}
                        {renderMenu()}
                        {renderMenu()}
                        {renderMenu()}
                        {renderMenu()}
                        {renderMenu()}
                    </div>
                </div>
            </div>
        </div>
    );
}
