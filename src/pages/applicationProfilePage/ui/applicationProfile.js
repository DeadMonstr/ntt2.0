import {
    ApplicationProfileHeader,
    ApplicationProfileInfo,
    ApplicationProfileInfoDocument,
    ApplicationProfileInfoEducation,
    ApplicationProfileUserDocument,
    fetchApplicationProfileData
} from "entities/applicationProfile";
import cls from "./application.module.sass"
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {applicationProfileSelectors} from "entities/applicationProfile";
import {useParams} from "react-router";

export const ApplicationProfile = ({getId}) => {
    const {id} = useParams()
    console.log(id, 'dsdds')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchApplicationProfileData({id}))
    },[dispatch])



    return (
        <div className={cls.application}>
            <ApplicationProfileHeader/>
            <ApplicationProfileInfo/>
            <ApplicationProfileInfoDocument/>
            <ApplicationProfileUserDocument/>
            <ApplicationProfileInfoEducation/>
        </div>
    );
};

