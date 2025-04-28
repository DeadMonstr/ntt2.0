import React, {useEffect, useMemo} from 'react';
import {Table} from "shared/ui/table";
import {useDispatch, useSelector} from "react-redux";
import {fetchSubjectsTest} from "entities/subjectsTests/model/thunk/subjectsTestsThunk";
import {getSubjectsTests} from "entities/subjectsTests/model/selectors/subjectsTestsSelectors";
import {useNavigate} from "react-router";
import classNames from "classnames";
import cls from './subjectsTests.module.sass'

export const SubjectsTests = ({setActive,active}) => {

    const tests = [
        {
            id:1,
            name: "Test1",
            duration: "2 soat",
            type: "o'qituvchi",
            subject: "Matematika"

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
                    <th>Test nomi</th>
                    <th>Davomiyligi</th>
                    <th>Soha</th>
                    <th>Fan</th>
                </tr>
                </thead>
                <tbody>
                {
                    tests.map((item,index) => {
                        return (
                            <tr onClick={() => navigate(`${item.id}`)}  style={{cursor: 'pointer'}}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.duration}</td>
                                <td>{item.type}</td>
                                <td>{item.subject}</td>
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

