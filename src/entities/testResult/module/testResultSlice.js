import {createSlice} from "@reduxjs/toolkit";
import {fetchTestResults} from "./testResultThunk";

const initialState = {
    data: [],
    loading: false,
    error: undefined
}

const testResultSlice = createSlice({
    name: "testResultSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchTestResults.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchTestResults.fulfilled, (state, action) => {
                state.data = action.payload.results
                state.loading = false
                state.error = undefined
            })
            .addCase(fetchTestResults.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
})

export default testResultSlice.reducer

