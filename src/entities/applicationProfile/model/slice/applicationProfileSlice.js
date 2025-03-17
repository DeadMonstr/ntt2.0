import {createSlice} from "@reduxjs/toolkit";
import {fetchApplicationProfileData, fetchApplicationStatus} from "../thunk/applicationProfileThunk";

const initialState = {
    data: {},
    status: undefined,
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
            .addCase(fetchApplicationStatus.pending, (state) => {state.loading = true})
            .addCase(fetchApplicationStatus.fulfilled, (state, action) => {
                console.log(action.payload, "action.payload")
                state.status = action.payload.request_status.request_status
                state.loading = false
            })
            .addCase(fetchApplicationStatus.rejected, (state) => {
                state.loading = false;
            })




    }
})
export default applicationProfileSlice.reducer