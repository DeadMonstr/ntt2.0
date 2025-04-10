import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";

import {Pagination} from "features/pagination";
import {fetchTestList, TestHeader, TestList} from "entities/test";
import {API_URL, useHttp} from "shared/api/base";

import cls from "./testPage.module.sass";
import {useNavigate} from "react-router";

export const TestPage = () => {

    const dispatch = useDispatch()
    const {request} = useHttp()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchTestList())
    }, [])

    const onCreateTest = () => {

        const res = {
            name: null,
            field: null,
            subject: null,
            duration: null,
            blocks: [
                {
                    text: null,
                    to_json: {
                        type: "text"
                    },
                    questions: [
                        {
                            isTrue: true,
                            answer: null,
                            to_json: {
                                type: "text"
                            }
                        },
                        {
                            isTrue: false,
                            answer: null,
                            to_json: {
                                type: "text"
                            }
                        }
                    ]
                }
            ]
        }

        request(`${API_URL}test/test/crud/create/`, "POST", JSON.stringify(res))
            .then(res => navigate(`/admin/testProfile/${res.id}`))
    }

    return (
        <div className={cls.test}>
            <TestHeader onCreateTest={onCreateTest}/>
            <TestList/>
            <Pagination/>
        </div>
    );
}
