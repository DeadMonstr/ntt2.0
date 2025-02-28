import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userRefreshData} from "../../../pages/login/model/loginThunk";
import {DefaultPageLoader} from "../../../shared/ui/defaultLoader";
import {Navigate, Outlet} from "react-router";
import {getUserFetchError, getUserRefreshLoading} from "../../../pages/login/model/loginSelector";

export const RequireAuth = () => {

    const dispatch = useDispatch()
    const refresh_token = sessionStorage.getItem("refresh_token")
    const refreshLoading = useSelector(getUserRefreshLoading)
    const error = useSelector(getUserFetchError)


    useEffect(() => {
        dispatch(userRefreshData({refresh: refresh_token}))
    },[])

    if (refreshLoading) {
        return <DefaultPageLoader/>
    } else if (error) {
        return <Navigate to={"/login"}/>
    } else return <Outlet/>
}
