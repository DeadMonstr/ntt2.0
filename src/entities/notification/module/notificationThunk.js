import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, useHttp} from "shared/api/base";

export const fetchNotificationData = createAsyncThunk(
    "notification/fetchNotificationData",
    async (id) => {
        const {request} = useHttp()
        return await request(`${API_URL}students/student_requests/list/?organization=${id}`, "GET", null, headers())
    }
)


export const fetchNotificationProfile = createAsyncThunk(
    "notification/fetchNotificationProfile",
    async ({id  ,orgId}) => {
        const {request} = useHttp()
        return await request(`${API_URL}students/notification/get_organization/?type=student&student_id=${id}&organization_id=${orgId}`, "GET", null, headers())
    }
)
