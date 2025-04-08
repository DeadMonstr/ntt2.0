import {configureStore} from "@reduxjs/toolkit";

import {languageSwitcherSlice} from "features/languageSwitcher";
import {seasonSwitcherSlice} from "features/seasonSwitcher";
import {applicationProfileSlice} from "entities/applicationProfile";
import {applicationSlice} from "pages/applicationPage";
import {organizationsSlice} from "features/organizations";
import {settingsSlice} from "entities/settings";
import {organizationProfileItemSlice, organizationSlice} from "../entities/organizationProfileItem";
import {loginSlice} from "../pages/login";
import {userProfileSlice} from "../entities/userProfile";
import {OrganizationProfileSlice} from "entities/organizationProfile";
import {oftenUsedSlice} from "entities/oftenUsed";
import {organizationTypesSlice} from "../features/organizationTypes";
import {dashboardSlice} from "../pages/dashboardPage";
import {alertSlice} from "../features/alert";
import {homeNewsSlice} from "entities/home";
import {subjectsTests} from "entities/subjectsTests";
import homeSlice from "entities/home/model/slice/homeSlice";
import {createTestSlice} from "pages/createTest";
import {notificationSlice} from "entities/notification";
import {menuBarSlice} from "widgets/menuBar";


const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}


export const store = configureStore({
    reducer: {
        alertSlice,

        languageSwitcherSlice,
        seasonSwitcherSlice,
        applicationProfileSlice,
        applicationSlice,
        organizationsSlice,
        settingsSlice,
        organizationProfileItemSlice,
        loginSlice,
        userProfileSlice,
        OrganizationProfileSlice,
        oftenUsedSlice,
        organizationTypesSlice,
        dashboardSlice,
        homeNewsSlice,
        subjectsTests,
        homeSlice,
        createTestSlice,
        notificationSlice,
        menuBarSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            stringMiddleware
        ),
    devTools: process.env.NODE_ENV !== "production",
})
