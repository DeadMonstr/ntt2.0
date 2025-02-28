import {createSlice} from "@reduxjs/toolkit";
import {fetchAcademicYear, fetchEducationLanguage, fetchRegionsData, fetchShifts} from "../thunk/oftenUsedThunk";

const initialState = {
    regions: null,
    educationLanguages: [],
    academicYears: [],
    shifts: [],
    loading: null,
    error: null
}

const oftenUsedSlice = createSlice({
    name: "oftenUsedSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchRegionsData.pending, (state) => {
                state.loading = "regionLoading"
                state.error = null
            })
            .addCase(fetchRegionsData.fulfilled, (state, action) => {
                state.regions = action.payload.results
                state.loading = "regionSuccess"
                state.error = null
            })
            .addCase(fetchRegionsData.rejected, (state) => {
                state.loading = null
                state.error = "error"
            })
            .addCase(fetchEducationLanguage.pending, (state) => {
                state.loading = "regionLoading"
                state.error = null
            })
            .addCase(fetchEducationLanguage.fulfilled, (state, action) => {
                state.educationLanguages = action.payload?.results
                state.loading = "regionSuccess"
                state.error = null
            })
            .addCase(fetchEducationLanguage.rejected, (state) => {
                state.loading = null
                state.error = "error"
            })

            .addCase(fetchAcademicYear.pending, (state) => {
                state.loading = "academicYearLoading"
                state.error = null
            })
            .addCase(fetchAcademicYear.fulfilled, (state, action) => {
                state.academicYears = action.payload?.results
                state.loading = "academicYearSuccess"
                state.error = null
            })
            .addCase(fetchAcademicYear.rejected, (state) => {
                state.loading = null
                state.error = "error"
            })

            .addCase(fetchShifts.pending, (state) => {
                state.loading = "shiftsLoading"
                state.error = null
            })
            .addCase(fetchShifts.fulfilled, (state, action) => {
                state.shifts = action.payload?.results
                state.loading = "shiftsSuccess"
                state.error = null
            })
            .addCase(fetchShifts.rejected, (state) => {
                state.loading = null
                state.error = "error"
            })
})

export default oftenUsedSlice.reducer
