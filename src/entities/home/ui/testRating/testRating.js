import React from 'react';

import {Button} from "shared/ui/button/button";

import cls from "./testRating.module.sass";

export const TestRating = () => {
    return (
        <div className={cls.rating}>
            <h1 className={cls.rating__title}>Diagnostik test natijasi</h1>
            <h2 className={cls.user}>
                SEVINCH KASIMXODJAYEVA,
                <span className={cls.user__inner}>ushbu testdagi natijangiz quyidagicha</span>
            </h2>
            <div className={cls.rating__static}>
                <h2 className={cls.rate}>
                    15
                    <span className={cls.rate__inner}>To'g'ri javoblar</span>
                </h2>
                <h2
                    style={{color: "#FF8C00"}}
                    className={cls.rate}
                >
                    33.5
                    <span className={cls.rate__inner}>Umumiy natija</span>
                </h2>
                <h2
                    style={{color: "#FF3B30"}}
                    className={cls.rate}
                >
                    52 min
                    <span className={cls.rate__inner}>Sarflangan vaqt</span>
                </h2>
            </div>
            <div className={cls.rating__container}>
                <div className={cls.list}>
                    <p className={cls.list__item}>
                        Ona tili va adabiyot
                        <span>5 x 3.1</span>
                        <span>15.5 ball</span>
                    </p>
                    <p className={cls.list__item}>
                        Ona tili va adabiyot
                        <span>5 x 3.1</span>
                        <span>15.5 ball</span>
                    </p>
                    <p className={cls.list__title}>
                        Majburiy fanlar
                    </p>
                    <p className={cls.list__item}>
                        Ona tili va adabiyot
                        <span>5 x 3.1</span>
                        <span>15.5 ball</span>
                    </p>
                    <p className={cls.list__item}>
                        Ona tili va adabiyot
                        <span>5 x 3.1</span>
                        <span>15.5 ball</span>
                    </p>
                    <p className={cls.list__item}>
                        Ona tili va adabiyot
                        <span>5 x 3.1</span>
                        <span>15.5 ball</span>
                    </p>
                </div>
                <Button extraClass={cls.btn}>Qayta test topshirish</Button>
            </div>
        </div>
    );
}
