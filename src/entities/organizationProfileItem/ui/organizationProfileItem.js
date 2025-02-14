import cls from "./organizationProfileItem.module.sass"
import {useNavigate} from "react-router";


export const OrganizationProfileItem = ({data}) => {
    const navigate = useNavigate()


    const renderData = () => {

        return data.map(item => (
            <div className={cls.profile__box} >
                <img src={item.img} alt=""/>

                <div className={(cls.profile__box_basic)}>
                    <h2>
                        {item.name}

                    </h2>
                    <div className={cls.profile__box_info}>

                        <div>
                            {item.location}
                        </div>

                        <div onClick={() => navigate(`organizationAbout/${item.id}`)}>
                            Ma’lumot <i className={"fas fa-arrow-right"}/>
                        </div>
                    </div>

                </div>
            </div>
        ))
    }

    return (
        <div className={cls.profile}>


            {renderData()}
        </div>
    );
};

