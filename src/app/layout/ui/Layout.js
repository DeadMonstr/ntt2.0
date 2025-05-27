import React, {useEffect, useState} from 'react';
import {isMobile} from "react-device-detect";

import cls from "./Layout.module.sass"
import {Header} from "widgets/header";
import {MenuBar} from "widgets/menuBar/ui/MenuBar";
import {Outlet, useNavigate} from "react-router";

import {useDispatch, useSelector} from "react-redux";
import {fetchUserProfileData} from "entities/userProfile/model/userProfileThunk";

import {Alert} from "features/alert";





export const Layout = ({back}) => {

    const userId = localStorage.getItem("user_id")
    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserProfileData(userId))
        }
    }, [userId])

    return (
        <>
            <Alert/>
            <div className={cls.layout}>
                {!isMobile &&
                    <MenuBar/>
                }
                <main>


                    <Header/>

                    <div className={cls.page}>



                        {/*<Button onClick={() => navigate(-1)}>*/}
                        {/*    <i className={"fa fa-arrow-left"}/>*/}
                        {/*    Back*/}
                        {/*</Button>*/}


                        <Outlet/>
                    </div>

                </main>


            </div>
            {isMobile &&
                <MenuBar/>
            }
        </>
    );
};



