import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, headersImg, headersView, useHttp} from "shared/api/base";

export const fetchNews = createAsyncThunk(
    "homeSlice/fetchNews",
    async () => {
        const {request} = useHttp()
       return await request(`${API_URL}organizations/news/`, "GET", null, headers())
})

export const fetchProfileItem = createAsyncThunk(
    "homeSlice/fetchProfileItem",
    async (id) => {
        const {request} = useHttp()
        console.log(headers() , "header")

        return await request(`${API_URL}organizations/news/${id}`, "GET" , null, headersView())

    })