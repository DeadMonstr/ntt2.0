import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";

import {fetchTestResults, TestResultList} from "entities/testResult";

import cls from "./testResultPage.module.sass";

export const TestResultPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTestResults())
    }, [])

    return (
        <div className={cls.testResult}>
            <h1 className={cls.testResult__title}>Natijalar tarixi</h1>
            <TestResultList/>
        </div>
    );
}
