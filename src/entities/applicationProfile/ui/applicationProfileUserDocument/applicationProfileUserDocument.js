import cls from "../applicationProfile.module.sass";

import defImage from "../../../../shared/assets/images/Rectangle 89.svg"
import {useSelector} from "react-redux";
import {applicationProfileSelectors} from "entities/applicationProfile/model/selectors/applicationProfileSelectors";
export const ApplicationProfileUserDocument = () => {

    const data = useSelector(applicationProfileSelectors)




    return (
        <div className={`${cls.application__info} ${cls.application__box}`}>
            <h1>Pasport ma'lumotlari</h1>
            <div className={cls.application__info_wrapper}>
                <ul className={cls.application__info_infos}>
                    <li>Passport seriya raqami <span>{data?.passport_seria}</span></li>
                    <li>Tug'ilgan joyi <span>{data?.born_address}</span></li>
                    <li>Tug'ilgan sanasi <span>{data?.born_date}</span></li>
                    <li>Jinsi <span>{data?.sex}</span></li>
                    <li>Identifikatsiya pin (️JSHSHIR) <span>{data?.indefikatsiya_pin}</span></li>
                </ul>
                <ul className={cls.application__info_infos}>
                    <li>Passport nusxasi
                        <div className={cls.application__info_infos_images}>

                            <img src={defImage} alt=""/>
                            <img src={defImage} alt=""/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

