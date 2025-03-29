import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, headersImg, headersView, useHttp} from "shared/api/base";

export const fetchHomeItem = createAsyncThunk(
    "homeSlice/fetchHomeItem",
    async () => {
        const {request} = useHttp()
        return await request(`${API_URL}organizations/organization_landing_page/get/`, "GET", null, headers())
    })

