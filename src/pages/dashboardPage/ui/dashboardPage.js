import {Dashboard} from "../../../entities/dashboard";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import cls from "./dashboardPage.module.sass"
import {fetchDashboardData} from "../model/thunk/dashboardThunk";
import {dashboardSelector} from "../model/selectors/dashboardSelector";



export const DashboardPage = () => {
    const response = useSelector(dashboardSelector)

    console.log(response)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDashboardData())
    }, [])


    return (
        <div className={cls.dashboard_main}>

            <Dashboard data={response}/>
        </div>
    );
};

