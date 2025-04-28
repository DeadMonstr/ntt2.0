import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, useHttp} from "shared/api/base";



export const fetchMenuSettingsTypes = createAsyncThunk(
    "menuBar/fetchMenuSettingsTypes",
    async () => {
        const {request} = useHttp()
        return request(`${API_URL}organizations/organization_type/get/list/`,"GET", null )
    }
)