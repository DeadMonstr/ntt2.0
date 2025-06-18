import cls from "../applicationProfile.module.sass"
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {applicationProfileSelectors} from "entities/applicationProfile/model/selectors/applicationProfileSelectors";
import {useEffect, useState} from "react";

export const ApplicationProfileHeader = () => {
    const navigate = useNavigate()

    const data = useSelector(applicationProfileSelectors)

    const [formattedDate, setFormattedDate] = useState("")

    useEffect(() => {
        console.log(data?.date, "data?.date")
        if (data?.date) {
            const [year, month, day] = data?.date?.split("-");
            setFormattedDate(`${day}-${month}-${year}`);
        }
    }, [data?.date])

    return (
        <div className={`${cls.application__header} ${cls.application__box}`}>
            <div onClick={() => navigate(-1)}>
                <i className="fas fa-arrow-left"/>
            </div>
            <div>
                <h2>Ariza topshirilgan sana: {formattedDate}</h2>
            </div>
        </div>
    );
};

