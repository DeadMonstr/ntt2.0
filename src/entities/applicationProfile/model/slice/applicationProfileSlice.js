import {createSlice} from "@reduxjs/toolkit";
import {fetchApplicationProfileData} from "../thunk/applicationProfileThunk";

const initialState = {
    data: {},
    loading: false
}

export const applicationProfileSlice = createSlice({
    name: 'applicationProfileSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchApplicationProfileData.pending, (state) => {state.loading = true})
            .addCase(fetchApplicationProfileData.fulfilled, (state, action) => {
                console.log(action.payload)
                state.data = action.payload
                state.loading = false
            })
            .addCase(fetchApplicationProfileData.rejected, (state) => {
                state.loading = false;
            })





    }
})
export default applicationProfileSlice.reducer