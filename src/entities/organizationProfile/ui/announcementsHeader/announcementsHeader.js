import React, {memo, useEffect, useState} from 'react';
import classNames from "classnames";

import cls from "./announcementsHeader.module.sass";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrganizationProfileDegrees} from "entities/organizationProfile/model/thunk/organizationProfileThunk";
import {
    getOrganizationProfileData,
    getOrganizationProfileDegrees,
    updateSelectedDegree
} from "entities/organizationProfile";
import {
    getOrganizationProfileSelectedDegree
} from "entities/organizationProfile/model/selector/organizationProfileSelector";



const typesData = [
    "Bakalavr","Jeki",
]



export const AnnouncementsHeader = memo(({userRole,setIsChange}) => {



    const selectedDegree  = useSelector(getOrganizationProfileSelectedDegree)
    const degrees  = useSelector(getOrganizationProfileDegrees)


    const org = useSelector(getOrganizationProfileData)



    const dispatch = useDispatch()

    useEffect(() => {
        if (org?.id)
        dispatch(fetchOrganizationProfileDegrees(org.organization_type.id))
    },[org])

    useEffect(() => {
        if (degrees.length) {
            dispatch(updateSelectedDegree(degrees[0].id))
        }
    },[degrees])
    
    
    
    const onChangeType = (item) => {

        dispatch(updateSelectedDegree(item))
    }



    const onNavigate = () => {
        setIsChange(true)
    }



    return (
        <div className={cls.announcementsHeader}>
            <h1 className={cls.announcementsHeader__title}>E’lonlar</h1>
            <div className={cls.announcementsHeader__icon}>
                {userRole&&<i
                    onClick={onNavigate}
                    className={classNames(
                        "fas fa-plus",
                        cls.announcementsHeader__inner
                    )}
                />}
            </div>
            <div className={cls.announcementsHeader__menu}>
                {
                    degrees.map(item => {
                        return (
                            <h2
                                onClick={() => onChangeType(item.id)}
                                className={classNames({[cls.active]: selectedDegree === item.id})}
                            >
                                {item.name}
                            </h2>
                        )
                    })
                }

            </div>
        </div>
    );
})
