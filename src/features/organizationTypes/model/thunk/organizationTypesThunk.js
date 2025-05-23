import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, ParamUrl, ParamUrls, useHttp} from "../../../../shared/api/base";


export const fetchOrganizationTypesFilter = createAsyncThunk(
    "organizationTypes/fetchOrganizationTypes",
    async () => {
        const {request} = useHttp()


        return await request(`${API_URL}organizations/organization_type/get/list/`, "GET", null, headers())
    }
)


export const fetchOrganizationTypesCards = createAsyncThunk(
    "organizationTypes/fetchOrganizationTypesCards",
    async ({organization_type, region, offset, limit, district}) => {
        const {request} = useHttp()
        return await request(
            `${API_URL}organizations/organization/get/filter_for_type/?${ParamUrls({
                organization_type,
                region,
                offset,
                limit,
                district
            })}`,
            "GET",
            null,
            headers()
        )
    }
)
