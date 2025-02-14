import cls from "../applicationProfile.module.sass";
import {useSelector} from "react-redux";
import {applicationProfileSelectors} from "entities/applicationProfile/model/selectors/applicationProfileSelectors";


export const ApplicationProfileInfoDocument = () => {

    const data = useSelector(applicationProfileSelectors)



    return (
        <div className={`${cls.application__info} ${cls.application__box}`}>
            <h1>Ariza ma’lumotlari</h1>
            <div className={cls.application__info_wrapper}>
                <ul className={cls.application__info_infos}>
                    <li>Yo'nalish nomi <span>Matematika</span></li>
                    <li>Daraja <span>{data?.degree}</span></li>
                    <li>Ta'lim turi  <span>{data?.shift}</span></li>
                    <li>Ta'lim tili  <span>{data?.language}</span></li>
                </ul>
            </div>
        </div>
    );
};

