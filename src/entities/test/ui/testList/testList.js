import React from 'react';
import {Table} from "shared/ui/table";
import classNames from "classnames";
import cls from "pages/createTest/ui/createTest.module.sass";

export const TestList = () => {
    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Fan nomi</th>
                    <th>Savollar soni</th>
                    <th>Berilgan vaqt</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Matematika</td>
                    <td>15</td>
                    <td>90 minut</td>
                    <td>
                        <i
                            className={classNames("fa-solid fa-trash")}
                        />
                    </td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
}
