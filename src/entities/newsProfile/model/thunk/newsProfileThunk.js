import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, useHttp} from "shared/api/base";

export const fetchNewsProfileData = createAsyncThunk(
    "newsProfileSlice/fetchNewsProfileData",
    async (id) => {
        const {request} = useHttp()
        return await request(`${API_URL}organizations/news/${id}`, "GET", null, headers())
    }
)



