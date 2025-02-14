import {createSlice} from "@reduxjs/toolkit";
import {fetchApplicationData, fetchApplicationFiltersData} from "../thunk/applicationThunk";

const initialState = {
    requests: [],

    types: [],
    degrees: [],
    fields: [],
    shifts: [],
    languages: [],

    search: "",
    type: "",
    degree: "",
    field: "",
    shift: "",
    language: "",


    loading: false
}

export const applicationSlice = createSlice({
    name: 'applicationSlice',
    initialState,
    reducers: {
        setSearch: (state,action) => {
            state.search = action.payload
        },

        setType: (state,action) => {
            state.type = action.payload
        },
        setDegree: (state,action) => {
            state.degree = action.payload
        },
        setField: (state,action) => {
            state.field = action.payload
        },
        setShift: (state,action) => {
            state.shift = action.payload
        },
        setLanguage: (state,action) => {
            state.language = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchApplicationData.pending, (state) => {state.loading = true})
            .addCase(fetchApplicationData.fulfilled, (state, action) => {
                state.requests = action.payload
                state.loading = false
            })
            .addCase(fetchApplicationData.rejected, (state) => {
                state.loading = false;
            })

            .addCase(fetchApplicationFiltersData.pending, (state) => {state.loading = true})
            .addCase(fetchApplicationFiltersData.fulfilled, (state, action) => {
                if (action.payload.types) state.types = action?.payload?.types
                state.degrees = action.payload.degrees
                state.fields = action.payload.fields
                state.shifts = action.payload.shifts
                state.languages = action.payload.languages
                state.loading = false
            })
            .addCase(fetchApplicationFiltersData.rejected, (state) => {
                state.loading = false;
            })

    }
})


export default applicationSlice.reducer

export const {
    setSearch,
    setType,
    setDegree,
    setField,
    setShift,
    setLanguage
}  = applicationSlice.actions
