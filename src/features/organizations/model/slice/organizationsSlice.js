import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    data: [
        {name: "Maktabgacha ta’lim tashkilotlari", id: 1},
        {name: "Maktablar", id: 2},
        {name: "Professional ta’lim tashkilotlari", id: 3},
        {name: "Oliy ta’lim tashkilotlari", id: 4},
    ]
}


const organizationsSlice = createSlice({
    name: "organizations",
    initialState,
    reducers: {},
    extraReducers: builder => {
    }
})


export default organizationsSlice.reducer