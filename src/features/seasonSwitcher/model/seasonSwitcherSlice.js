import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    season: null,
    loading: false,
    error: null
}

const seasonSwitcherSlice = createSlice({
    name: "seasonSwitcherSlice",
    initialState,
    reducers: {
        fetchCurrentSeason: (state, action) => {
            state.season = action.payload
            state.loading = false
            state.error = null
        }
    }
})

export default seasonSwitcherSlice.reducer
export const {fetchCurrentSeason} = seasonSwitcherSlice.actions