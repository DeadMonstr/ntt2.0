import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, useHttp} from "shared/api/base";

export const fetchRegionsData = createAsyncThunk(
    "oftenUsedSlice/fetchRegionsData",
    () => {
        const {request} = useHttp()
        return request(`${API_URL}region/get/`, "GET", null, headers())
    }
)

export const fetchEducationLanguage = createAsyncThunk(
    "oftenUsedSlice/fetchEducationLanguage",
    () => {
        const {request} = useHttp()
        return request(`${API_URL}education_language/get/`, "GET", null,)
    }
)


export const fetchAcademicYear = createAsyncThunk(
    "oftenUsedSlice/fetchAcademicYear",
    () => {
        const {request} = useHttp()
        return request(`${API_URL}students/acedemic_year/`, "GET", null, headers())
    }
)


export const fetchShifts = createAsyncThunk(
    "oftenUsedSlice/fetchShifts",
    () => {
        const {request} = useHttp()
        return request(`${API_URL}students/shift/`, "GET", null, headers())
    }
)

