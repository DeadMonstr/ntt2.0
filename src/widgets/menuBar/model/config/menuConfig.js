
import {ROLES} from "shared/const/roles";
import { ReactComponent as Dashboard } from  "shared/assets/images/Vector.svg" ;
import  { ReactComponent as Applications }   from "shared/assets/images/Vector-1.svg";
import  { ReactComponent as CourseApplications }   from "shared/assets/images/Vector-2.svg";
import { ReactComponent as Settings }   from "shared/assets/images/Vector-3.svg";
import { ReactComponent as News }   from "shared/assets/icons/fluent_news-16-regular.svg";

export const menuConfig = [
    {
        to: "dashboard",
        label: "Dashboard",
        icon: <Dashboard/>,
        roles: [ROLES.admin , ROLES.organization_admin]
    },
    {
        to: "applications",
        label: "Arizalar",
        icon: <Applications/>,
        roles: [ROLES.admin , ROLES.organization_admin]
    },
    {
        to: "organizationTypes",
        label: "Organizations",
        icon: <CourseApplications/>,
        roles: [ROLES.admin]
    },
    {
        to: "settings",
        label: "Sozlamalar",
        icon: <Settings/>,
        back: true,
        roles: [ROLES.admin]
    },
    {
        to: "subjectsTests",
        label: "Fan Testlari",
        icon: <Settings/>,
        back: true,
        roles: [ROLES.admin]
    },
    {
        to: "news",
        label: "Yangiliklar",
        icon: <News/>,
        back: true,
        roles: [ROLES.admin]
    },


]
