import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, useHttp} from "../../../shared/api/base";


export const fetchOrganizationList = createAsyncThunk(
    "settingsSlice/fetchOrganizationList",
    async () => {
        const {request} = useHttp()

        return await request(`${API_URL}organizations/organization_type/get/list/`, "GET", null, headers())
    }
)


export const fetchOrganizationTypeList = createAsyncThunk(
    "settingsSlice/fetchOrganizationTypeList",
    async ({id, currentPage, pageSize}) => {
        const {request} = useHttp()

        return await request(`${API_URL}organization_fields/get/organization-fields/${id}/?offset=${(currentPage - 1) * 9}&limit=${pageSize}`, "GET", null, headers())
    }
)


export const fetchOrganizationTypeDegree = createAsyncThunk(
    "settingsSlice/fetchOrganizationTypeDegree",
    ({id, currentPage, pageSize}) => {
        const {request} = useHttp()

        return request(`${API_URL}organization-degrees/organization-degree/get/list/${id}/?offset=${(currentPage - 1) * 9}&limit=${pageSize}`, "GET", null, headers())
    }
)