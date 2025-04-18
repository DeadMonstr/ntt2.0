import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, ParamUrl, ParamUrls, useHttp} from "shared/api/base";

export const fetchTestList = createAsyncThunk(
    "testSlice/fetchTestList",
    ({subject, field}) => {
        const {request} = useHttp()
        return request(`${API_URL}test/test/get/test_list/?${ParamUrls({subject, field})}`, "GET", null, headers())
        // return request(`${API_URL}test/test/get/test_list/`, "GET", null, headers())
    }
)