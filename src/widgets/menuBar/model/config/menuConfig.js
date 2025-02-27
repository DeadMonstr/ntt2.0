
import {ROLES} from "shared/const/roles";
import { ReactComponent as Dashboard } from  "shared/assets/images/Vector.svg" ;
import  { ReactComponent as Applications }   from "shared/assets/images/Vector-1.svg";
import  { ReactComponent as CourseApplications }   from "shared/assets/images/Vector-2.svg";
import { ReactComponent as Settings }   from "shared/assets/images/Vector-3.svg";

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
        to: "courseApplications",
        label: "Kurs arizalari",
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


]
