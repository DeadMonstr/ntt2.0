import {createSlice} from "@reduxjs/toolkit";
import {fetchUserProfileData} from "./userProfileThunk";


const initialState = {
    userData: null,
    userImage: null,
    userJob: null,
    userOrganizationName: null,
    userOrganizationId: null,
    loading: false,
    error: null,
}

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.userData = action.payload
        },
        updateUserImage: (state, action) => {
            state.userImage = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(fetchUserProfileData.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserProfileData.fulfilled, (state, action) => {



                state.userData = action.payload
                state.userBranchId = action.payload?.branch?.id
                state.userJob = action.payload?.role
                state.userOrganizationName = action.payload?.organization_name
                state.userOrganizationId = action.payload?.organization_id
                localStorage.setItem("organization_id", action.payload?.organization_id)
                localStorage.setItem("role", action.payload?.role)

                localStorage.setItem("phone", action.payload.phone)

                // state.userSystemId = action.payload.user.branch.location.system.id
                state.loading = false
                state.error = null
            })
            .addCase(fetchUserProfileData.rejected, (state, action) => {
                state.loading = false
                state.error = "error"
            })

})

export const {updateUser, updateUserImage} = userProfileSlice.actions
export default userProfileSlice.reducer
