import {memo} from 'react';
import classNames from "classnames";

import cls from "./announcementsItem.module.sass";
import image from "shared/assets/images/Ellipse 118.png";
import image1 from "shared/assets/icons/languages.png";
import image2 from "shared/assets/icons/type.png";
import image3 from "shared/assets/icons/prime_dollar.png";
import image4 from "shared/assets/icons/star.png";
import {useSelector} from "react-redux";
import {getOrganizationProfileData} from "entities/organizationProfile/model/selector/organizationProfileSelector";

export const AnnouncementsItem = memo(({userRole, onChange, item}) => {

    const data = useSelector(getOrganizationProfileData)
    return (
        <div className={cls.announcementsItem}>
            {userRole &&
                <i
                    onClick={() => onChange(item)}
                    className={classNames(
                        "fas fa-pen",
                        cls.announcementsItem__icon
                    )}
                />}
            <div className={cls.announcementsItem__header}>
                <img className={cls.announcementsItem__ava} src={`${data?.img ? data?.img : image}`} alt=""/>
                <h2 className={cls.announcementsItem__title}>
                    {item.field.name}
                </h2>
            </div>
            <div className={cls.announcementsItem__infoMenu}>
                <div className={cls.info}>
                    <div className={cls.info__header}>
                        <div className={cls.info__icon}>
                            <img src={image3} alt=""/>
                        </div>
                        <p className={cls.info__subTitle}>Ta’lim tili</p>
                    </div>
                    <div className={cls.info__item}>
                        {item.education_language?.map((lang, index, arr) => (
                            <h3 key={index} className={cls.info__title}>
                                {lang.name}{index < arr.length - 1 ? '\\' : ''}
                            </h3>
                        ))}
                    </div>

                </div>
                {/*<div className={cls.info}>*/}
                {/*    <div className={cls.info__header}>*/}
                {/*        <div className={cls.info__icon}>*/}
                {/*            <img src={image3} alt=""/>*/}
                {/*        </div>*/}
                {/*        <p className={cls.info__subTitle}>Ta’lim turi</p>*/}
                {/*    </div>*/}
                {/*    <h3 className={cls.info__title}>{item.degree.name}</h3>*/}

                {/*</div>*/}
                <div className={cls.info}>
                    <div className={cls.info__header}>
                        <div className={cls.info__icon}>
                            <img src={image3} alt=""/>
                        </div>
                        <p className={cls.info__subTitle}>Ta’lim shakli</p>
                    </div>
                    <div className={cls.info__item}>
                        {item.shift?.map((lang, index, arr) => (
                            <h3 key={index} className={cls.info__title}>
                                {lang.name}{index < arr.length - 1 ? '\\' : ''}
                            </h3>
                        ))}
                    </div>

                </div>
                <div className={cls.info}>
                    <div className={cls.info__header}>
                        <div className={cls.info__icon}>
                            <img src={image3} alt=""/>
                        </div>
                        <p className={cls.info__subTitle}>Kontrakt to'lovi</p>
                    </div>
                    <h3 className={cls.info__title}>{item.price}</h3>

                </div>
                <div className={cls.info}>
                    <div className={cls.info__header}>
                        <div className={cls.info__icon}>
                            <img src={image3} alt=""/>
                        </div>
                        <p className={cls.info__subTitle}>Qabul muddati</p>
                    </div>
                    <h3 className={cls.info__title}>{item.start_date} - {item.expire_date}</h3>
                </div>
            </div>
            <div className={cls.announcementsItem__text}>
                <div className={cls.header}>
                    <div className={cls.header__garant}>
                        <i
                            className={classNames(
                                "fas fa-thumbs-up",
                                cls.header__like
                            )}
                        />
                        <p className={cls.header__title}>Grant mavjud</p>
                    </div>
                    <div className={cls.header__up}>
                        <i className={"fas fa-arrow-up"}/>
                    </div>
                </div>

                <h2>Ma'lumot</h2>
                <div className={cls.text}>
                    <div dangerouslySetInnerHTML={{__html: item.desc.toString().substring(0, 300)}}></div>
                    <span>...</span>
                </div>

                <br/>
                <br/>
                <h2>Talablar</h2>
                <div className={cls.text}>
                    <div dangerouslySetInnerHTML={{__html: item?.requirements?.toString()?.substring(0, 300)}}></div>
                    <span>...</span>
                </div>
            </div>
        </div>
    )
})
