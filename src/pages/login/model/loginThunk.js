import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, useHttp} from "shared/api/base";

export const userRefreshData = createAsyncThunk(
    "loginSlice/userRefreshData",
    async (refresh) => {
        const {request} = useHttp()
        return await request(`${API_URL}token/refresh/`, "POST", JSON.stringify(refresh))
    }
)