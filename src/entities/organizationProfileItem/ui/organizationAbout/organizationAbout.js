import React from 'react';
import {useNavigate} from "react-router";
import cls from "../organizationProfileItem.module.sass";

import logo from "shared/assets/logo/logo.png"

export const OrganizationProfileAbout = () => {


    const navigate = useNavigate()


    // const renderData = () => {
    //
    //     return data.map(item => (
    //         <div className={cls.profile__box} >
    //             <img src={item.img} alt=""/>
    //
    //             <div className={(cls.profile__box_basic)}>
    //                 <h2>
    //                     {item.name}
    //
    //                 </h2>
    //                 <div className={cls.profile__box_info}>
    //
    //                     <div>
    //                         {item.location}
    //                     </div>
    //
    //                     <div onClick={() => navigate(`organizationAbout/${item.id}`)}>
    //                         Ma’lumot <i className={"fas fa-arrow-right"}/>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     ))
    // }

    return (
        <div className={cls.profileAbout}>
            <div className={cls.profileAbout__box}>
                <div style={{display: "flex", gap: "2rem", flexDirection: "column", width: "100%"}}>
                    <div style={{display: "flex", gap: "2rem"}}>
                        <img src={logo} alt=""/>
                        <div className={(cls.profileAbout__box_basic)}>
                            <h2>
                                University of Business and Science
                                <span>Namangan viloyati</span>
                            </h2>
                        </div>
                    </div>


                    <ul>
                        <li>Kontrakt to'lovi <span>9 860 000 - 23 120 000 UZS</span></li>
                        <li>Qabul muddati <span>Lorem ipsum dolor.</span></li>
                        <li onClick={() => navigate(`../organizationBasicInfo/1`)}>Taxrirlash
                            {/*<i className={"fas fa-arrow-right"}/>*/}
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cls.profileAbout__box}>
                <div className={cls.profileAbout__box_descr}>
                    <h2>OTM haqida</h2>
                    <p>
                        “University of Business and Science” haqida:
                        “University of Business and Science”da 2024-2025-o‘quv yili uchun qabul
                        jarayonlari boshlandi.....
                    </p>
                    <div onClick={() => navigate("../aboutOtm/1")} className={cls.profileAbout__box_descr_edit}>
                        Taxrirlash
                        {/*<i className={"fas fa-arrow-right"}/>*/}
                    </div>
                </div>
            </div>

            <div className={cls.profileAbout__box}>
                <div className={cls.profileAbout__box_descr}>
                    <h2>Grantlar</h2>
                    <p>
                        UBS har yili iqtidorli talabalarni qo‘llab-quvvatlash maqsadida bir necha miliard so‘mlik grantlar e’lon qilib kelmoqda. O‘qishga kirishdagrant kundguzgi ta’lim uchun joriy.....
                    </p>
                    <div onClick={() => navigate("../garants/1")} className={cls.profileAbout__box_descr_edit}>
                        Taxrirlash
                        {/*<i className={"fas fa-arrow-right"}/>*/}
                    </div>
                </div>
            </div>

            <div className={cls.profileAbout__box}>
                <div className={cls.profileAbout__box_gallery}>
                    <h2>Galereya</h2>
                    <div onClick={() => navigate("../gallery/1")} className={cls.profileAbout__box_descr_edit}>
                        Taxrirlash
                        {/*<i className={"fas fa-arrow-right"}/>*/}
                    </div>
                </div>
            </div>








        </div>
    );
};

