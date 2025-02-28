import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, useHttp} from "../../../shared/api/base";

export const fetchUserProfileData = createAsyncThunk(
    "userProfile/fetchUserProfileData",
    async (id) => {
        const {request} = useHttp()
        return await request(`${API_URL}users/user/get/${id}/`, "GET", null, headers())
    }
)
