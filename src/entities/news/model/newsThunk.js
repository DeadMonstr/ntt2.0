import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, headersImg, headersView, ParamUrls, useHttp} from "shared/api/base";

export const fetchNews = createAsyncThunk(
    "homeSlice/fetchNews",
    async ({organization_id, offset, limit}) => {
        console.log(organization_id, "organization_id")
        const {request} = useHttp()
       return await request(`${API_URL}organizations/news_list/?${ParamUrls({organization_id, offset, limit})}`, "GET", null, headers())
})

export const fetchProfileItem = createAsyncThunk(
    "homeSlice/fetchProfileItem",
    async (id) => {
        const {request} = useHttp()

        return await request(`${API_URL}organizations/news/${id}`, "GET" , null, headersView())

    })