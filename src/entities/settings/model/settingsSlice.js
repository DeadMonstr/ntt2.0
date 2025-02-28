import {createSlice} from "@reduxjs/toolkit";
import {fetchOrganizationList, fetchOrganizationTypeDegree, fetchOrganizationTypeList} from "./settingsThunk";


const initialState = {

    list: [],

    direction: [],
    degree: [],
    loading: false,
    error: null,
}
const settingsSlice = createSlice({
    name: 'settingsSlice',
    initialState,
    reducers: {
        onAddHeaderItem: (state, action) => {
            state.list = [...state.list, action.payload]
        },
        onEditHeaderItem: (state, action) => {
            console.log(action.payload)
            state.list = state.list.map(item => item.id === action.payload.id ? {
                ...item,
                name: action.payload.data
            } : item)
        },
        onDeleteHeaderItem: (state, action) => {
            console.log(action.payload)
            state.list = state.list.filter(item => item.id !== action.payload)
        },


        onAddDirection: (state, action) => {
            state.direction.results = [...state.direction.results, action.payload]
        },

        onEditDirection: (state, action) => {
            console.log(action.payload)
            state.direction.results = state.direction.results.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        name: action.payload.res.name,
                        desc: action.payload.res.desc
                    }
                }
                return item
            })
        },
        onDeleteDirection: (state, action) => {

            state.direction.results = state.direction.results.filter(item => item.id !== action.payload)

        },


        onAddDegree: (state, action) => {
            state.degree.results = [...state.degree.results, action.payload]
        },

        onEditDegree: (state, action) => {
            state.degree.results = state.degree.results.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        name: action.payload.data.name,
                        description: action.payload.data.description
                    }
                }
                return item
            })
        },
        onDeleteDegree: (state, action) => {

            state.degree.results = state.degree.results.filter(item => item.id !== action.payload)

        },


    },
    extraReducers: builder =>
        builder
            .addCase(fetchOrganizationList.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrganizationList.fulfilled, (state, action) => {
                state.list = action.payload.results
                state.loading = false
                state.error = null
            })
            .addCase(fetchOrganizationList.rejected, (state, action) => {
                state.loading = false
                state.error = true
            })


            .addCase(fetchOrganizationTypeList.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrganizationTypeList.fulfilled, (state, action) => {
                state.direction = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchOrganizationTypeList.rejected, (state, action) => {
                state.loading = false
                state.error = true
            })


            .addCase(fetchOrganizationTypeDegree.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrganizationTypeDegree.fulfilled, (state, action) => {
                state.degree = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchOrganizationTypeDegree.rejected, (state, action) => {
                state.loading = false
                state.error = true
            })


})

export const {
    onEditHeaderItem,
    onAddHeaderItem,
    onDeleteHeaderItem,
    onAddDirection,
    onEditDirection,
    onDeleteDirection,
    onAddDegree,
    onEditDegree,
    onDeleteDegree
} = settingsSlice.actions

export default settingsSlice.reducer
