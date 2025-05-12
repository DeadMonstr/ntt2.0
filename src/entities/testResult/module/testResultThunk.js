import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, useHttp} from "shared/api/base";

export const fetchTestResults = createAsyncThunk(
    "testResultSlice/fetchTestResults",
    () => {
        const {request} = useHttp()
        return request(`${API_URL}test/test/get/test_result_list/`, "GET", null, headers())
    }
)