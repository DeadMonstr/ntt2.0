import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, useHttp} from "shared/api/base";


export const fetchApplicationProfileData = createAsyncThunk(
    "applicationProfileSlice/fetchApplicationProfileData",
    async ({id}) => {
        const {request} = useHttp()
        return request(`${API_URL}students/student_request/${id}`,"GET", null )
    }
)

