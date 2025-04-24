import {memo, useCallback} from 'react';
import classNames from "classnames";
import {useSelector} from "react-redux";

import {getOrganizationProfileGallery} from "../../model/selector/organizationProfileSelector";

import cls from "./organizationProfileGallery.module.sass";
import image from "shared/assets/images/Rectangle 640.png";

export const OrganizationProfileGallery = memo(({userRole, setChangedImage, isAdd}) => {

    const data = useSelector(getOrganizationProfileGallery)


    const renderImages = useCallback(() => {
        return data?.map((item, index) => {
            return (
                <div
                    key={index}
                    className={cls.images__item}
                >
                    {userRole && <div
                        className={cls.images__edit}
                        onClick={() => setChangedImage(item)}
                    >
                        <i className={classNames("fas fa-pen", cls.images__editIcon)}/>
                    </div>}
                    <img src={item?.file?.url ?? image} alt=""/>
                </div>
            )
        })
    }, [setChangedImage, data])

    return (
        <div
            className={classNames(
                cls.images, {
                    [cls.notActive]: !data?.length
                }
            )}
        >
            {renderImages()}

        </div>
    );
})
