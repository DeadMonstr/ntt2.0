import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    AnnouncementsHeader,
    fetchOrganizationProfileData,
    OrganizationProfileApplications,
    OrganizationProfileHeader,
} from "entities/organizationProfile";
import {
    OrganizationProfileAnnouncementsModal,
    OrganizationProfileGalleryModal,
    OrganizationProfileInfoModal,
    OrganizationProfileReadMoreModal,
    OrganizationProfileInfoAbout,
    OrganizationProfileGrants
} from "features/organizationProfile";

import cls from "./organizationProfilePage.module.sass";
import {useParams} from "react-router";
import {getSeasonSwitcherData} from "features/seasonSwitcher";
import {getUserJob} from "entities/userProfile";
import classNames from "classnames";

export const OrganizationProfilePage = () => {

    const {id} = useParams()

    const dispatch = useDispatch()
    const currentSeason = useSelector(getSeasonSwitcherData)
    const userRole = localStorage.getItem("role")

    const [activeLink, setActiveLink] = useState("")

    useEffect(() => {
        dispatch(fetchOrganizationProfileData(id))
    }, [])

    const [addActiveModal, setAddActiveModal] = useState(false)

    const [isChange, setIsChange] = useState(false)
    const [isChangeGarants, setIsChangeGarants] = useState(false)
    const [isChangeAbout, setIsChangeAbout] = useState(false)
    const onNavigate = () => {
        setIsChange(true)
    }
    const onChange = () => {
        if (activeLink === "Grantlar") {
            setIsChangeGarants(state => !state)
        } else {
            setIsChangeAbout(state => !state)
        }
    }

    return (
        <div className={cls.organization}>
            <OrganizationProfileHeader setActive={setActiveLink}/>

            <div className={cls.announcementsHeader}>
                <h1>{activeLink}</h1>
                <RenderHeaderIcon onChange={onChange} isChangeGarants={isChangeGarants} activeLink={activeLink} setAddActiveModal={setAddActiveModal} isChangeAbout={isChangeAbout} userRole={userRole} onNavigate={onNavigate}/>

            </div>
            <div className={cls.organization__container}>
                <div className={cls.left}>
                    <OrganizationProfileInfoModal
                        userRole={userRole === "organization"}
                    />
                </div>
                <div className={cls.right}>
                    {activeLink === "Haqida" &&
                        <OrganizationProfileInfoAbout userRole={userRole === "organization"} isChange={isChangeAbout}
                                                      setIsChange={setIsChangeAbout}/>}
                    {activeLink === "Grantlar" &&
                        <OrganizationProfileGrants userRole={userRole === "organization"} isChange={isChangeGarants}
                                                   setIsChange={setIsChangeGarants}/>}
                    {activeLink === "E’lonlar" &&
                        <OrganizationProfileAnnouncementsModal seasonId={currentSeason?.id}
                                                               userRole={userRole === "organization"}
                                                               isChange={isChange} setIsChange={setIsChange}/>}
                    {activeLink === "Gallereya" &&
                        <OrganizationProfileGalleryModal userRole={userRole === "organization"}
                                                         setAddActiveModal={setAddActiveModal}
                                                         addActiveModal={addActiveModal}/>}
                    {activeLink === "Arizalar" &&
                        <OrganizationProfileApplications/>}
                </div>
            </div>
        </div>
    );
}
const RenderHeaderIcon =({
    activeLink,
    userRole,
    onNavigate,
    onChange,
    setAddActiveModal,
    isChangeGarants,
    isChangeAbout,
}) => {
    switch (activeLink) {
        case "E’lonlar":
            if (userRole === "organization") {
                return (
                    <div className={cls.announcementsHeader__icon}>
                        <i
                            onClick={onNavigate}
                            className={classNames("fas fa-plus", cls.announcementsHeader__inner)}
                        />
                    </div>
                );
            }
            break;

        case "Gallereya":
            if (userRole === "organization") {
                return (
                    <div
                        onClick={() => setAddActiveModal(true)}
                        className={cls.announcementsHeader__icon}
                    >
                        <i className={classNames("fas fa-plus", cls.announcementsHeader__inner)} />
                    </div>
                );
            }
            break;

        case "Grantlar":
            if (userRole === "organization") {
                return (
                    <div className={cls.announcementsHeader__icon} onClick={onChange}>
                        <i
                            className={classNames(
                                "fas fa-plus" ,
                                cls.announcementsHeader__inner
                            )}
                        />
                    </div>
                );
            }
            break;

        case "Haqida":
            if (userRole === "organization") {
                return (
                    <div className={cls.announcementsHeader__icon} onClick={onChange}>
                        <i
                            className={classNames(
                                isChangeAbout ? "fas fa-times" : "fas fa-pen",
                                cls.announcementsHeader__inner
                            )}
                        />
                    </div>
                );
            }
            break;

        default:
            return null;
    }
}
