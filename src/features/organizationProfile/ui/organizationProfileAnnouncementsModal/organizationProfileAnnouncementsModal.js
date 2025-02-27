import {memo, useEffect, useState} from 'react';

import {
    AnnouncementsHeader,
    AnnouncementsList
} from "entities/organizationProfile";


import cls from "./organizationProfileAnnouncementsModal.module.sass";

import {
    OrganizationAccouncementsForm
} from "../organizationAccouncementsForm/organizationAccouncementsForm";

export const OrganizationProfileAnnouncementsModal = memo(({seasonId,userRole}) => {

    const [isChange, setIsChange] = useState(false)
    const [changedItem,setChangedItem] = useState(null)



    useEffect(() => {
        if (!isChange) {
            setChangedItem(null)
        }
    },[isChange])

    const onChangedItem = (item) => {
        setIsChange(true)
        setChangedItem(item)
    }


    return (
        <div className={cls.announcements}>
            {
                isChange ? <OrganizationAccouncementsForm changedItem={changedItem} setIsChange={setIsChange}/>
                    :
                <div className={cls.announcements__content}>
                    <AnnouncementsHeader userRole={userRole} setIsChange={setIsChange}/>
                    <AnnouncementsList userRole={userRole} seasonId={seasonId} setIsChange={onChangedItem}/>
                </div>
            }
        </div>
    );
})



