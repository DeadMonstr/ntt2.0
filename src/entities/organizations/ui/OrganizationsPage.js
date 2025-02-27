import cls from "./organization.module.sass"
import {useNavigate} from "react-router";


export const OrganizationsPage = ({organizationData}) => {
    const navigate = useNavigate()
    const renderData = () => {
        return organizationData.map(item =>(
            <divc onClick={() => navigate(`organizationProfile/${item.id}`)} className={cls.organizations__box}>
                {item.name}
                {/*<div className={cls.organizations__box_icon}>*/}
                {/*    <i className={"fas fa-chevron-right "}/>*/}
                {/*</div>*/}
            </divc>
        ))
    }

    return (
        <div className={cls.organizations}>


            {renderData()}
        </div>
    );
};

