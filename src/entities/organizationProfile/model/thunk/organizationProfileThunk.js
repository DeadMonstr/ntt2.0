import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, ParamUrls, useHttp} from "shared/api/base";

export const fetchOrganizationProfileData =
    createAsyncThunk(
        "OrganizationProfileSlice/fetchOrganizationProfileData",
        (id) => {
            const {request} = useHttp()
            return request(`${API_URL}organizations/organization/get/${id}/`)
        }
    )

export const fetchOrganizationProfileGallery =
    createAsyncThunk(
        "OrganizationProfileSlice/fetchOrganizationProfileGallery",
        ({id}) => {
            const {request} = useHttp()
            return request(`${API_URL}organizations/organization_gallery/get/?organization_id=${id}`)
        }
    )

export const fetchOrganizationProfileAnnouncements =
    createAsyncThunk(
        "OrganizationProfileSlice/fetchOrganizationProfileAnnouncements",
        ({id,seasonId,selectedDegree}) => {
            const {request} = useHttp()
            return request(`${API_URL}organizations/organization_landing_page/get/?organization_id=${id}&year_id=${seasonId}&degree_id=${selectedDegree}`)
        }
    )

export const fetchOrganizationProfileApplications =
    createAsyncThunk(
        "OrganizationProfileSlice/fetchOrganizationProfileApplications",
        (data) => {
            const {request} = useHttp()
            return request(`${API_URL}students/student_request_list/?${ParamUrls(data)}`)
        }
    )

export const fetchOrganizationProfileReadMore =
    createAsyncThunk(
        "OrganizationProfileSlice/fetchOrganizationProfileReadMore",
        ({id}) => {
            const {request} = useHttp()
            return request(`${API_URL}organizations/organization_advantage/get/${id}/`)
        }
    )

export const fetchOrganizationProfileAdmin =
    createAsyncThunk(
        "OrganizationProfileSlice/fetchOrganizationProfileAdmin",
        ({id}) => {
            const {request} = useHttp()
            return request(`${API_URL}organizations/organization_user/get/${id}/`)
        }
    )

export const fetchOrganizationProfileDegrees =
    createAsyncThunk(
        "OrganizationProfileSlice/fetchOrganizationProfileDegrees",
        (id) => {
            const {request} = useHttp()
            return request(`${API_URL}organization-degrees/organization-degree/get/list/${id}`)
        }
    )

export const fetchOrganizationProfileFields =
    createAsyncThunk(
        "OrganizationProfileSlice/fetchOrganizationProfileFields",
        (id) => {
            const {request} = useHttp()
            return request(`${API_URL}organization_fields/get/organization-fields/${id}`)
        }
    )


export const fetchOrganizationProfileShifts =
    createAsyncThunk(
        "OrganizationProfileSlice/fetchOrganizationProfileShifts",
        (id) => {
            const {request} = useHttp()
            return request(`${API_URL}students/shift/list/${id}/`)
        }
    )

export const trueAnnouncementsDelete =
    createAsyncThunk(
        "OrganizationProfileSlice/trueAnnouncementsDelete",
        ({id}) => {
            const {request} = useHttp()
            return request(`${API_URL}organizations/organization_landing_page/crud/delete/${id}/`, "DELETE")
        }
    )

export const falseAnnouncementsDelete =
    createAsyncThunk(
        "OrganizationProfileSlice/falseAnnouncementsDelete",
        ({id}) => {
            const {request} = useHttp()
            return request(`${API_URL}organizations/organization_landing_page/crud/delete/${id}/`, "DELETE")
        }
    )


