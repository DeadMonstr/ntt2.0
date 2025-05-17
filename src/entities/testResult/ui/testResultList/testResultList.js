import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Table} from "shared/ui/table";
import {getTestResultData} from "../../module/testResultSelector";

import cls from "./testResultList.module.sass"
import {ConfirmModal} from "shared/ui/confirmModal";
import {API_URL, useHttp} from "shared/api/base";
import {onDeleteResult} from "entities/testResult/module/testResultSlice";
import classNames from "classnames";
import {onAddAlertOptions} from "features/alert/model/slice/alertSlice";

export const TestResultList = () => {

    const data = useSelector(getTestResultData)
    const [modal, setModal] = useState(false)

    const [active , setActive] = useState("")


    const [item, setItem] = useState(null)
    const {request} = useHttp()

    const dispatch = useDispatch()



    const handleClick = (id) => {
        setActive(active === id ? null : id)
    };



    const renderList = () => {
        return data.map((item, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{item?.name} {item?.surname}</td>
                    <td>{item?.test.field.name}</td>
                    <td
                        style={{position: "relative"}}
                        onClick={() => handleClick(item.id)}
                    >
                        {item?.test.subject.name}
                        <div className={classNames(cls.popup, {
                            [cls.active]: active === item.id
                        })}>
                            <strong>Majburiy fanlar:</strong>
                            {Object.values(item?.true_answers?.mandatory || {}).map((subject, index) => (
                                <div key={`mandatory-${index}`}>
                                    <div style={{display: "flex" , justifyContent: "space-between"}}><strong>{subject.subject}</strong>   <div>Ball: {subject.score}</div></div>


                                </div>
                            ))}
                            <strong style={{marginTop: '10px', display: 'block'}}>Ixtiyoriy fanlar:</strong>
                            {Object.values(item?.true_answers?.optional || {}).map((subject, index) => (
                                <div key={`optional-${index}`}>
                                    <div style={{display: "flex" , justifyContent: "space-between"}}><strong>{subject.subject}</strong>   <div>Ball: {subject.score}</div></div>

                                </div>
                            ))}
                        </div>

                    </td>



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
                dispatch(onAddAlertOptions({
                    status: true,
                    type: "success",
                    msg: res.message
                }))
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
