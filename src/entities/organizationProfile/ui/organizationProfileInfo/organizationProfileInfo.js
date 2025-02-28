import React, {memo, useState} from 'react';
import classNames from "classnames";
import {useSelector} from "react-redux";

import {Input} from "shared/ui/input";
import {
    getOrganizationProfileData,
    getOrganizationProfileUserData, getOrganizationProfileUserImageData
} from "../../model/selector/organizationProfileSelector";

import cls from "./organizationProfileInfo.module.sass";
import image from "shared/assets/images/photo_2024-02-08_12-55-08_hATlV6P_pdyLCyK 1.png";

export const OrganizationProfileInfo = memo(({userRole, setActive, isAdd, isDel}) => {

    const data = useSelector(getOrganizationProfileData)
    const userProfile = useSelector(getOrganizationProfileUserData)
    const userProfileImage = useSelector(getOrganizationProfileUserImageData)

    console.log(data?.locations)
    return (
        <div className={cls.info}>
            {userRole && userProfile?.id && (
                <>
                    <i
                        className={classNames(
                            "fas fa-pen",
                            cls.info__icon
                        )}
                        onClick={() => isAdd("change")}
                    />
                    <i
                        className={classNames(
                            "fas fa-trash",
                            cls.info__icon,
                            cls.info__delIcon
                        )}
                        onClick={() => isDel(true)}
                    />
                </>
            )}
            <div
                className={cls.info__header}
            >
                {
                    userProfile?.id
                        ? <>
                            <img
                                className={cls.info__ava}
                                src={userProfileImage?.url}
                                alt=""
                            />
                            <div className={cls.info__user}>
                                <h2>{userProfile?.user?.name} {userProfile?.user?.surname}</h2>
                                <p>{userProfile?.user?.phone}</p>
                            </div>
                        </>
                        : <div
                            onClick={() => isAdd("add")}
                            className={cls.isActive}
                        >
                            <i
                                className={classNames(
                                    "fas fa-plus",
                                    cls.info__addIcon
                                )}
                            />
                        </div>
                }
            </div>
            <div className={cls.info__container}>
                <img className={cls.info__image} src={data?.img} alt=""/>
                {userRole && <i
                    className={classNames(
                        "fas fa-pen",
                        cls.iconSub
                    )}
                    onClick={() => setActive(true)}
                />}
                <div className={cls.info__form}>
                    <Input
                        value={data?.name}
                        extraClass={cls.info__input}
                        placeholder={"Name"}
                        disabled
                    />
                    <Input
                        value={data?.organization_type?.name}
                        extraClass={cls.info__input}
                        placeholder={"Organazition type"}
                        disabled
                    />
                    <Input
                        value={data?.region?.name}
                        extraClass={cls.info__input}
                        placeholder={"Region"}
                        disabled
                    />
                    {/*<Input*/}
                    {/*    value={data?.locations}*/}
                    {/*    extraClass={cls.info__input}*/}
                    {/*    placeholder={"Location"}*/}
                    {/*    disabled*/}
                    {/*/>*/}

                    <div className={cls.info__locations} dangerouslySetInnerHTML={{__html: data?.locations}}>

                    </div>

                </div>
            </div>
        </div>
    );
})