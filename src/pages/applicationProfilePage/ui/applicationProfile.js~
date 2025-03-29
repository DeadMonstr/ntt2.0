import {

    ApplicationProfileInfo,

    fetchApplicationProfileData
} from "entities/applicationProfile";
import cls from "./application.module.sass"
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {applicationProfileSelectors} from "entities/applicationProfile";
import {useParams} from "react-router";

export const ApplicationProfile = () => {
    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchApplicationProfileData({id}))
    }, [dispatch])

    const data = useSelector(applicationProfileSelectors)





    return (
        <div className={cls.application}>
            <h2>Ariza beruvchi</h2>

            <ApplicationProfileInfo data={data}/>

        </div>
    );
};

