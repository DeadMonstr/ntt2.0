import cls from "../applicationProfile.module.sass"
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {applicationProfileSelectors} from "entities/applicationProfile/model/selectors/applicationProfileSelectors";

export const ApplicationProfileHeader = () => {
    const navigate = useNavigate()

    const data = useSelector(applicationProfileSelectors)


    return (
        <div className={`${cls.application__header} ${cls.application__box}`}>
            <div onClick={() => navigate(-1)}>
                <i className="fas fa-arrow-left"/>
            </div>
            <div>
                <h2>Ariza topshirilgan sana: {data?.date}</h2>
            </div>
        </div>
    );
};

