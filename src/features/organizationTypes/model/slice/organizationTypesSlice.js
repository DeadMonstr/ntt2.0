import {createSlice} from "@reduxjs/toolkit";
import React from "react";
import {fetchOrganizationTypesCards, fetchOrganizationTypesFilter} from "../thunk/organizationTypesThunk";


const initialState = {
    loading: false,
    error: null,
    filter: [],
    cards: []
}


const organizationTypesSlice = createSlice({
    name: "organizationTypesSlice",
    initialState,
    reducers: {
        addOrganization: (state, action) => {
            state.cards.results = [action.payload, ...state.cards.results]
        },
        onDeleteOrganization: (state, action) => {
            state.cards.results = state.cards.results.filter(item => item.id !== action.payload)
        },
        onEditOrganization: (state, action) => {
            state.cards.results = state.cards.results.map(item => {
                if (item.id === action.payload.id) {
                    return {...item, ...action.payload.data}
                }
                return item
            })
        },
    },
    extraReducers: builder =>
        builder
            .addCase(fetchOrganizationTypesFilter.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrganizationTypesFilter.fulfilled, (state, action) => {
                state.filter = action.payload.results
                state.loading = false
                console.log(action.payload)
                state.error = null
            })
            .addCase(fetchOrganizationTypesFilter.rejected, state => {
                state.loading = false
                state.error = true
            })


            .addCase(fetchOrganizationTypesCards.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrganizationTypesCards.fulfilled, (state, action) => {
                state.cards = action.payload
                state.loading = false
                console.log(action.payload)
                state.error = null
            })
            .addCase(fetchOrganizationTypesCards.rejected, state => {
                state.loading = false
                state.error = true
            })
})
export const {addOrganization, onDeleteOrganization, onEditOrganization} = organizationTypesSlice.actions
export default organizationTypesSlice.reducer