import React from 'react';

import {Button} from "shared/ui/button/button";

import cls from "./testHeader.module.sass";

export const TestHeader = ({onCreateTest, setActive}) => {

    return (
        <div className={cls.header}>
            <h1>Testlar</h1>
            <div className={cls.header__btn}>
                <Button
                    onClick={onCreateTest}
                >
                    Test qo'shish
                </Button>
                <Button onClick={() => setActive(true)} type={"filter"}>Filter</Button>
            </div>
        </div>
    );
}
