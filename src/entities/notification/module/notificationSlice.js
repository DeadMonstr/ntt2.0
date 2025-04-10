import {createSlice} from "@reduxjs/toolkit";

import {fetchNotificationData, fetchNotificationProfile} from "entities/notification/module/notificationThunk";

const initialState = {
    data: [
        {id: 1 , name: "university" , descr: "aszfsdkfjasdfjd asfdsjfjlads fjdf"},
        {id: 2 , name: "university" , descr: "aszfsdkfjasdfjd asfdsjfjlads fjdf"},
        {id: 3 , name: "university" , descr: "aszfsdkfjasdfjd asfdsjfjlads fjdf"},

    ],
    loading: false,
    error: undefined,
    profileItem: []
}

const notificationSlice = createSlice({
    name: "notificationSlice",
    initialState,
    reducers: {
        onAddMsg: (state , action )=>{
            console.log(action.payload)
            state.profileItem.results = [...state.profileItem.results , action.payload]
    }

    },
    extraReducers: builder =>
        builder
            .addCase(fetchNotificationData.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchNotificationData.fulfilled, (state, action) => {
                state.data = action.payload.results
                state.loading = false
                state.error = undefined
            })
            .addCase(fetchNotificationData.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })


            .addCase(fetchNotificationProfile.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchNotificationProfile.fulfilled, (state, action) => {
                state.profileItem = action.payload
                state.loading = false
                state.error = undefined
            })
            .addCase(fetchNotificationProfile.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
})

export const {onAddMsg} = notificationSlice.actions
export default notificationSlice.reducer

