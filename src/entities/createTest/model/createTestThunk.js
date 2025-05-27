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
    ({id, data}) => {
        const {request} = useHttp()
        return request(`${API_URL}test/test/crud/update/${id}/`, "PATCH", JSON.stringify(data))
    }
)

export const fetchOrganizationFields = createAsyncThunk(
    "createTestSlice/fetchOrganizationFields",
    ({id}) => {
        const {request} = useHttp()
        return request(`${API_URL}organizations/organization_fields/get/organization-fields2/${id}/`, "GET")
    }
)

export const fetchTestProfile = createAsyncThunk(
    "createTestSlice/fetchTestProfile",
    ({id}) => {
        const {request} = useHttp()
        return request(`${API_URL}test/test/get/test_retrieve/${id}/`, "GET")
    }
)


