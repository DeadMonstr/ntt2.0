import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Table} from "shared/ui/table";
import {getTestResultData} from "../../module/testResultSelector";

import cls from "./testResultList.module.sass";
import {ConfirmModal} from "shared/ui/confirmModal";
import {API_URL, useHttp} from "shared/api/base";
import {onDeleteResult} from "entities/testResult/module/testResultSlice";

export const TestResultList = () => {

    const data = useSelector(getTestResultData)
    const [modal, setModal] = useState(false)


    const [item , setItem] = useState(null)
    const {request} = useHttp()

    const dispatch = useDispatch()

    const renderList = () => {
        return data.map((item, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{item?.name} {item?.surname}</td>
                    <td>{item?.test.field.name}</td>
                    <td>{item?.test.subject.name}</td>
                    <td>{item?.result} ball</td>
                    <td>{item?.date}</td>
                    <td><i onClick={() => {
                        setModal(true)
                        setItem(item)
                    }} className={"fa fa-trash"}></i></td>
                </tr>
            )
        })
    }

    const onDelete = () => {
        dispatch(onDeleteResult(item.id))
        request(`${API_URL}test/test/get/test_result_delete/${item.id}/`, "DELETE")
            .then(res => {
                setModal(false)
        })
    }

    return (
        <>
            <Table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Ism Familiya</th>
                    <th>Soha</th>
                    <th>Fan</th>
                    <th>Natijasi</th>
                    <th>Sana</th>
                    <th/>

                </tr>
                </thead>
                <tbody>
                {renderList()}
                </tbody>
            </Table>


            <ConfirmModal active={modal} setActive={setModal} onClick={onDelete}/>
        </>
    );
}
