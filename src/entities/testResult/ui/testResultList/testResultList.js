import React from 'react';
import {useSelector} from "react-redux";

import {Table} from "shared/ui/table";
import {getTestResultData} from "../../module/testResultSelector";

import cls from "./testResultList.module.sass";

export const TestResultList = () => {

    const data = useSelector(getTestResultData)

    const renderList = () => {
        return data.map((item, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.name} {item.surname}</td>
                    <td>{item.date}</td>
                    <td>{item.result} ball</td>
                </tr>
            )
        })
    }

    return (
        <Table>
            <thead>
            <tr>
                <th>№</th>
                <th>Test nomi</th>
                <th>Sana</th>
                <th>Natijasi</th>
            </tr>
            </thead>
            <tbody>
            {renderList()}
            </tbody>
        </Table>
    );
}
