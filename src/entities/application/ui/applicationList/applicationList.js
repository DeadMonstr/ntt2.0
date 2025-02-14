import {memo, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import classNames from "classnames";

import {Table} from "shared/ui/table";
import cls from "./applicationList.module.sass";


export const ApplicationList = memo(({list = []}) => {
        

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1268);


    const navigate = useNavigate()


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1268);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    console.log(list)

    return (
        <div className={cls.applicationList}>
            <Table>
                <thead>
                <tr>
                    <th/>
                    <th>Ism sharif</th>
                    <th>Telefon raqam</th>
                    <th>Daraja</th>
                    {!isMobile ? <>
                        <th>Ta’lim yo’nalishlari</th>
                        <th>Ta’lim turi</th>
                        <th>Ta’lim tili</th>
                        <th>Topshirilgan sana</th>
                    </> : null}

                </tr>
                </thead>
                <tbody>

                {
                    list?.map(item => {
                        return (
                            <tr
                                onClick={() => {
                                    navigate(`profile/${item.id}`)
                                }
                            }
                                className={classNames(cls.applicationList__list, {
                                    [cls.debt]: !item?.accepted
                                })}
                            >
                                <td/>
                                <td>{item?.name}</td>
                                <td>{item?.phone}</td>
                                <td>{item?.degree}</td>
                                {!isMobile ? <>
                                    <td>{item?.field}</td>
                                    <td>{item?.shift}</td>
                                    <td>{item?.language}</td>
                                    <td>{item?.date}</td>
                                </> : null}
                            </tr>
                        )
                    })
                }


                {/*<tr*/}
                {/*    onClick={() => navigate("profile")}*/}
                {/*    className={cls.applicationList__list}*/}
                {/*>*/}
                {/*    <td/>*/}
                {/*    <td>Quddusbek Azzamov Aminjonovich</td>*/}
                {/*    <td>+998 911234567</td>*/}
                {/*    <td>Bakalavr</td>*/}
                {/*    {!isMobile ? <>*/}
                {/*        <td>Matematika</td>*/}
                {/*        <td>Sirtqi</td>*/}
                {/*        <td>O'zbek tili</td>*/}
                {/*        <td>13.07.2024</td>*/}
                {/*    </> : null}*/}
                {/*</tr>*/}
                </tbody>
            </Table>

        </div>
    )
})
