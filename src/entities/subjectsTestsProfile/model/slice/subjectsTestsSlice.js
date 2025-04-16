import {createSlice} from "@reduxjs/toolkit";
import {fetchSubjectsTest} from "entities/subjectsTests/model/thunk/subjectsTestsThunk";



const initialState = {
    tests: [],
    loading: null,
    error: null
}





const subjectsTestsSlice = createSlice({
    name: "subjectsTestsSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchSubjectsTest.pending, (state) => {
                state.loading = "regionLoading"
                state.error = null
            })
            .addCase(fetchSubjectsTest.fulfilled, (state, action) => {
                state.tests = action.payload.results
                state.loading = "regionSuccess"
                state.error = null
            })
            .addCase(fetchSubjectsTest.rejected, (state) => {
                state.loading = null
                state.error = "error"
            })

})


export default subjectsTestsSlice.reducer
