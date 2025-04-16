import React, {useEffect, useMemo} from 'react';
import {Table} from "shared/ui/table";
import {useDispatch, useSelector} from "react-redux";
import {fetchSubjectsTest} from "entities/subjectsTests/model/thunk/subjectsTestsThunk";
import {getSubjectsTests} from "entities/subjectsTests/model/selectors/subjectsTestsSelectors";
import {useNavigate} from "react-router";
import classNames from "classnames";
import cls from 'entities/subjectsTestsProfile/ui/subjectsTestsProfile.module.sass'

export const SubjectsTestsProfile = ({setActive,active}) => {

    const tests = [
        {
            id:1,
            user_name: "Shaha",
            name: "Test1",
            type: "o'qituvchi",
            subject: "Matematika",
            score: "100 ball"

        }
    ]

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSubjectsTest())
    },[])



    const navigate = useNavigate()



    return (
        <>
            <Table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Ism-familiya</th>
                    <th>Test nomi</th>
                    <th>Soha</th>
                    <th>Fan</th>
                    <th>Ball</th>
                </tr>
                </thead>
                <tbody>
                {
                    tests.map((item,index) => {
                        return (
                            <tr style={{cursor: 'pointer'}}>
                                <td>{index+1}</td>
                                <td>{item.user_name}</td>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.subject}</td>
                                <td>{item.score}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            <div
                className={classNames(cls.schoolList__filter, {
                    [cls.active]: active
                })}
                onClick={() => setActive(true)}
            >
                <i className="fa-solid fa-filter"/>
            </div>
        </>

    );
};

