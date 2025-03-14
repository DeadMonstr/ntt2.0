import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, useHttp} from "shared/api/base";

export const fetchSubjectsTest = createAsyncThunk(
    "subjectsTestsSlice/fetchSubjectsTest",
    () => {
        const {request} = useHttp()
        return request(`${API_URL}`, "GET", null, headers())
    }
)
