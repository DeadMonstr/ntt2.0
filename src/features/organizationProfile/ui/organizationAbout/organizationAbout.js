
import cls from "../organizationProfile.module.sass";
import {Input} from "../../../../shared/ui/input";
import {OrganizationProfileAbout} from "../../../../entities/organizationProfileItem";
import {useNavigate} from "react-router";
import {Direction} from "../direction/direction";


export const OrganizationAbout = () => {


    return (
        <div className={cls.organizations}>
            <div className={cls.organizations__header}>
                <h2>Ma’lumot</h2>
                <div className={cls.filter}>
                    <div className={cls.filter__search}>
                        <Input
                            // value={search}
                            // onChange={(e) => setSearch(e.target.value)}
                            extraClass={cls.filter__input}
                            placeholder="Search..."
                        />
                        <i className="fas fa-search"/>
                    </div>
                    <div
                        className={cls.filter__settings}>
                        <i className="fas fa-sliders-h"/>
                    </div>
                </div>
            </div>


            <OrganizationProfileAbout/>

            <div className={cls.directions}>
                <h2>Yo'nalishlar</h2>
                <AddProfile/>
            </div>


            <Direction/>



        </div>
    );
};



export const AddProfile = () => {

    const navigate = useNavigate()

    return(
        <div className={cls.addProfile} onClick={() => navigate("../addDirections")}>
            Yangi yo’nalish qo’shish <i className={"fa fa-plus"}/>
        </div>
    )
}