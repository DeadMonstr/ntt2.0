import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, useHttp} from "../../../../shared/api/base";


export const fetchOrganizationTypesFilter = createAsyncThunk(
    "organizationTypes/fetchOrganizationTypes",
    async () => {
        const {request} = useHttp()


        return await request(`${API_URL}organizations/organization_type/get/list/`, "GET", null, headers())
    }
)


export const fetchOrganizationTypesCards = createAsyncThunk(
    "organizationTypes/fetchOrganizationTypesCards",
    async ({id, region,currentPage,pageSize}) => {
        const {request} = useHttp()
        return await request(
            `${API_URL}organizations/organization/get/filter_for_type/?offset=${(currentPage-1)*pageSize}&limit=${pageSize}${id ? `&organization_type=${id}&` : "?"}${region ? `region=${region}` : ""}`,
            "GET",
            null,
            headers()
        )
    }
)
