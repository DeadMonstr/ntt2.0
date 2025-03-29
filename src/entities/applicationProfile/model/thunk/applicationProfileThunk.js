import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, useHttp} from "shared/api/base";


export const fetchApplicationProfileData = createAsyncThunk(
    "applicationProfileSlice/fetchApplicationProfileData",
    async ({id}) => {
        const {request} = useHttp()
        return request(`${API_URL}students/student_request/${id}`,"GET", null )
    }
)

export const fetchApplicationStatus = createAsyncThunk(
    "applicationProfileSlice/fetchApplicationStatus",
    ({id}) => {
        const {request} = useHttp()
        return request(`${API_URL}students/student_requests/profile/${id}`, "GET", null, headers())
    }
)

