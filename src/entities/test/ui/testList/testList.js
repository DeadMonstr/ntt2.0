import React from 'react';
import {Table} from "shared/ui/table";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {getTestListData} from "entities/test/model/testSelector";
import cls from "pages/createTest/ui/createTest.module.sass";
import {useNavigate} from "react-router";

export const TestList = () => {

    const testList = useSelector(getTestListData)
    const navigate = useNavigate()

    function compareById(a, b) {
        return a.id - b.id;
    }

    const renderTests = () => {
        return [...testList].sort(compareById).map((item, index) => {
            return (
                <tr
                    onClick={() => navigate(`/admin/testProfile/${item.id}`)}
                >
                    <td>{index+1}</td>
                    <td>{item.subject?.name}</td>
                    <td>{item.field?.name}</td>
                    <td>15</td>
                    <td>90 minut</td>
                    <td>
                        <i
                            className={classNames("fa-solid fa-trash")}
                        />
                    </td>
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
                    <th/>
                </tr>
                </thead>
                <tbody>
                {renderTests()}
                </tbody>
            </Table>
        </div>
    );
}
