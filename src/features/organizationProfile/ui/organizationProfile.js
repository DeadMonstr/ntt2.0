import cls from "./organizationProfile.module.sass";
import {Input} from "../../../shared/ui/input";
import {useSelector} from "react-redux";
import {
    getOrganizationProfileData
} from "../../../entities/organizationProfileItem/model/selector/organizationSelector";
import {OrganizationProfileItem} from "../../../entities/organizationProfileItem";
import {useMemo, useState} from "react";
import {useNavigate} from "react-router";


export const OrganizationProfile = () => {
    const organizationData = useSelector(getOrganizationProfileData)
    const [search, setSearch] = useState("");

    const searchedUsers = useMemo(() => {
        if (!search) return organizationData;
        return organizationData.filter(item =>
            item?.name?.toLowerCase()?.includes(search.toLowerCase())
        );
    }, [organizationData, search]);



    return (
        <div className={cls.organizations}>
            <div className={cls.organizations__header}>
                <h2>Tashkilotlar</h2>
                <div className={cls.filter}>
                    <div className={cls.filter__search}>
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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

            <OrganizationProfileItem data={searchedUsers}/>
        </div>
    );
};

