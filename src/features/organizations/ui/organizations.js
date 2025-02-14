import cls from "./organization.module.sass";
import { OrganizationsPage } from "entities/organizations";
import { useSelector } from "react-redux";
import { getOrganizationsData } from "../model/selector/organizationsSelector";
import { Input } from "../../../shared/ui/input";
import { useMemo, useState } from "react";
import {useNavigate} from "react-router";

export const Organizations = () => {
    const organizationData = useSelector(getOrganizationsData)

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
                <h2>Organizations</h2>
                <div className={cls.filter}>
                    <div className={cls.filter__search}>
                        <Input
                            value={search} // Bind value to search
                            onChange={(e) => setSearch(e.target.value)}
                            extraClass={cls.filter__input}
                            placeholder="Search..."
                        />
                        <i className="fas fa-search" />
                    </div>
                    <div className={cls.filter__settings}>
                        <i className="fas fa-sliders-h" />
                    </div>
                </div>
            </div>
            <OrganizationsPage organizationData={searchedUsers} />
        </div>
    );
};
