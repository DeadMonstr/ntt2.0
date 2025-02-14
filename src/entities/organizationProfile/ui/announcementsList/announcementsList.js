import {memo, useEffect, useState} from 'react';

import {AnnouncementsItem} from "../announcementsItem/announcementsItem";

import cls from "./announcementsList.module.sass";
import {useDispatch, useSelector} from "react-redux";
import {
    getOrganizationProfileAnnouncements, getOrganizationProfileSelectedDegree
} from "entities/organizationProfile/model/selector/organizationProfileSelector";
import {fetchOrganizationProfileAnnouncements} from "entities/organizationProfile/model/thunk/organizationProfileThunk";
import {useParams} from "react-router";

export const AnnouncementsList = memo(({userRole,setIsChange,seasonId}) => {

    const listAnn = useSelector(getOrganizationProfileAnnouncements)
    const selectedDegree  = useSelector(getOrganizationProfileSelectedDegree)

    const {id} = useParams()




    const dispatch= useDispatch()

    useEffect(() => {
        if (id && seasonId && selectedDegree) {
            dispatch(fetchOrganizationProfileAnnouncements({id, seasonId,selectedDegree}))
        }
    },[id,seasonId,selectedDegree])






    return (
        <div className={cls.announcements}>
            {
                listAnn.map(item => {
                    return (
                        <AnnouncementsItem item={item} onChange={setIsChange} userRole={userRole}/>
                    )
                })
            }

        </div>
    );
})
