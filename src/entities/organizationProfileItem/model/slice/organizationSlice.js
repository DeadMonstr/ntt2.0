import {createSlice} from "@reduxjs/toolkit";


import logo from "shared/assets/logo/logo.png"


const initialState = {
    loading: false,
    error: null,
    data: [
        {name : "University of Business and Science" , id: 1 , img: logo , location: "Namangan v."},
        {name : "University of Business and Science" , id: 1 , img: logo , location: "Namangan v."},
        {name : "University of Business and Science" , id: 1 , img: logo , location: "Namangan v."},
        {name : "University of Business and Science" , id: 1 , img: logo , location: "Namangan v."},
        {name : "aaaaaaaaaaaaaa" , id: 1 , img: logo , location: "Namangan v."},
    ]
}


const organizationSlice = createSlice({
    name: "organizationSlice",
    initialState,
    reducers: {},
    extraReducers: builder => {
    }
})

export default organizationSlice.reducer