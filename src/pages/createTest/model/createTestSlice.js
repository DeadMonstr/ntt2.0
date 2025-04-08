import {createSlice} from "@reduxjs/toolkit";
import {createTest} from "./createTestThunk";

const initialState = {
    data: [],
    loading: false,
    error: false
}

const createTestSlice = createSlice({
    name: "createTestSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(createTest.pending, (state) => {
                state.loading = true
                state.errpr = false
            })
            .addCase(createTest.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
                state.errpr = false
            })
            .addCase(createTest.rejected, (state) => {
                state.loading = false
                state.errpr = true
            })
})

export default createTestSlice.reducer
export const {} = createTestSlice.actions
