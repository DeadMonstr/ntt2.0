import {createSlice} from "@reduxjs/toolkit";
import {fetchDashboardData} from '../thunk/dashboardThunk'


const initialState ={
    dashboard: [],
    loading: false
}


export const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {state.loading = true})
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.dashboard = action.payload
                state.loading = false
            })
            .addCase(fetchDashboardData.rejected, (state) => {state.loading = false
            })
    }
})

export default dashboardSlice.reducer