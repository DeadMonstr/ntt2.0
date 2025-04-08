import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, useHttp} from "shared/api/base";

export const createTest = createAsyncThunk(
    "createTestSlice/createTest",
    (data) => {
        const {request} = useHttp()
        return request(`${API_URL}test/test/crud/create/`, "POST", JSON.stringify(data))
    }
)

export const createQuestion = createAsyncThunk(
    "createTestSlice/createQuestion",
    ({id,data}) => {
        const {request} = useHttp()
        return request(`${API_URL}test/test/crud/update/${id}/`, "PATCH", JSON.stringify(data))
    }
)


