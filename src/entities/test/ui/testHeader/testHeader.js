import React from 'react';
import {useNavigate} from "react-router";

import {Button} from "shared/ui/button/button";

import cls from "./testHeader.module.sass";

export const TestHeader = ({onCreateTest}) => {

    const navigate = useNavigate()

    return (
        <div className={cls.header}>
            <h1>Testlar</h1>
            <div className={cls.header__btn}>
                <Button
                    onClick={onCreateTest}
                >
                    Test qo'shish
                </Button>
                <Button type={"filter"}>Filter</Button>
            </div>
        </div>
    );
}
