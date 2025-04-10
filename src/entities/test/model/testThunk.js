import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, useHttp} from "shared/api/base";

export const fetchTestList = createAsyncThunk(
    "testSlice/fetchTestList",
    () => {
        const {request} = useHttp()
        // return request(`${API_URL}test/test/get/test_list/?subject=1&field=13`, "GET", null, headers())
        return request(`${API_URL}test/test/get/test_list/`, "GET", null, headers())
    }
)