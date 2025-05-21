import React, {useState} from 'react';
import {Table} from "shared/ui/table";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {getTestListData} from "entities/test/model/testSelector";
import cls from "./testList.module.sass";
import {useNavigate} from "react-router";
import {API_URL, useHttp} from "../../../../shared/api/base";
import {deleteTest} from "../../model/testSlice";
import {onAddAlertOptions} from "../../../../features/alert/model/slice/alertSlice";
import {ConfirmModal} from "../../../../shared/ui/confirmModal";

export const TestList = () => {

    const {request} = useHttp()
    const dispatch = useDispatch()
    const testList = useSelector(getTestListData)
    const navigate = useNavigate()

    function compareById(a, b) {
        return a.id - b.id;
    }

    const renderTests = () => {
        return [...testList].sort(compareById).map((item, index) => {
            return (
                <tr
                    onClick={(e) => {
                        // if (!e.target?.classList?.contains("fa-solid"))
                            navigate(`/admin/testProfile/${item.id}`)
                        // else onConfirmDelete(item.id)
                    }}
                >
                    <td>{index + 1}</td>
                    <td>
                        <div className={cls.item}>
                            {item?.field_data?.map(item => {
                                return (
                                    <span>{item?.name}</span>
                                )
                            })}
                        </div>
                    </td>
                    <td>{item.subject?.name}</td>

                    <td>{item.number_questions}</td>
                    <td>{item.duration} minut</td>
                    {/*<td>*/}
                    {/*    <i*/}
                    {/*        className={classNames("fa-solid fa-trash")}*/}
                    {/*    />*/}
                    {/*</td>*/}
                </tr>
            )
        })
    }

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Yo'nalish</th>
                    <th>Fan nomi</th>
                    <th>Savollar soni</th>
                    <th>Berilgan vaqt</th>
                    {/*<th/>*/}
                </tr>
                </thead>
                <tbody>
                {renderTests()}
                </tbody>
            </Table>
        </div>
    );
}
