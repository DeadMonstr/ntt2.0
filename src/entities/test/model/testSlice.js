import {createSlice} from "@reduxjs/toolkit";
import {fetchTestList} from "entities/test/model/testThunk";

const initialState = {
    data: [],
    loading: false,
    error: false
}

const testSlice = createSlice({
    name: "testSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchTestList.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchTestList.fulfilled, (state, action) => {
                state.data = action.payload.results
                state.loading = false
                state.error = false
            })
            .addCase(fetchTestList.rejected, (state) => {
                state.loading = false
                state.error = true
            })
})

export default testSlice.reducer
export const {} = testSlice.actions
