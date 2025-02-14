import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, ParamUrl, useHttp} from "../../../../shared/api/base";

export const fetchDashboardData = createAsyncThunk(
    "dashboardSlice/fetchDashboardData",
    async () => {
        const {request} = useHttp()
        return request(`${API_URL}students/student-request-dashboard`,"GET", null )
    }
)