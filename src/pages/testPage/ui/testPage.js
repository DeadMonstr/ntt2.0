import React, {useEffect} from 'react';

import {Pagination} from "features/pagination";
import {TestHeader, TestList} from "entities/test";

import cls from "./testPage.module.sass";

export const TestPage = () => {

    return (
        <div className={cls.test}>
            <TestHeader/>
            <TestList/>
            <Pagination/>
        </div>
    );
}
