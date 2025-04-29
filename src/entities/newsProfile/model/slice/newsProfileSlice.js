import {createSlice} from "@reduxjs/toolkit";

import {fetchNewsProfileData} from "entities/newsProfile/model/thunk/newsProfileThunk";

const initialState = {
    data: {},
    loading: false,
    error: undefined,
}

const newsProfileSlice = createSlice({
    name: "newsProfileSlice",
    initialState,
    reducers: {


    },
    extraReducers: builder =>
        builder
            .addCase(fetchNewsProfileData.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchNewsProfileData.fulfilled, (state, action) => {
                state.data = action.payload.results
                state.loading = false
                state.error = undefined
            })
            .addCase(fetchNewsProfileData.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })


})

export const {} = newsProfileSlice.actions
export default newsProfileSlice.reducer

