import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    language: "uz",
    loading: false,
    error: null
}

const languageSwitcherSlice = createSlice({
    name: "languageSwitcherSlice",
    initialState,
    reducers: {
        fetchCurrentLanguage: (state, action) => {
            state.language = action.payload
            state.loading = false
            state.error = null
        }
    }
})

export default languageSwitcherSlice.reducer
export const {fetchCurrentLanguage} = languageSwitcherSlice.actions

