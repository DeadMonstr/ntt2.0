
import {createSlice} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import {userRefreshData} from "./loginThunk";
// import {useNavigate} from "react-router";
//
// import {fetchLoginUser, userRefreshData} from "./loginThunk";

const initialState ={
    userId: null,
    username: "",
    password: "",
    role: null,
    loading: false,
    error: null
}

export const loginSlice =createSlice({
    name: "loginSlice",
    initialState,
    reducers: {
        getUserData: (state, action) => {
            sessionStorage.setItem('token', action.payload.access);
            sessionStorage.setItem('refresh_token', action.payload.refresh);
            if (action.payload.access) {
                const decodedToken = jwtDecode(action.payload.access);
                state.userId = decodedToken.user_id; // Bu yerda user_id ni olasiz
                const oldUserId  = localStorage.getItem('user_id');
                console.log(oldUserId, decodedToken.user_id, "hellllllllo")
                localStorage.setItem('user_id', decodedToken.user_id);
            }
            state.loading = false
            state.error = null
        },
        userRefresh: (state, action) => {
            sessionStorage.setItem('token', action.payload.access);
            if (action.payload.access) {
                const decodedToken = jwtDecode(action.payload.access);
                state.userId = decodedToken.user_id; // Bu yerda user_id ni olasiz
            }
            state.loading = false
            state.error = null
        },
        exit: (state) => {
            state.userId = null
            sessionStorage.clear()
        }
    },
    extraReducers: builder =>
        builder
            .addCase(userRefreshData.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(userRefreshData.fulfilled, (state, action) => {
                sessionStorage.setItem('token', action.payload.access);
                if (action.payload.access) {
                    const decodedToken = jwtDecode(action.payload.access);
                    state.userId = decodedToken.user_id; // Bu yerda user_id ni olasiz
                }
                state.loading = false
                state.error = null
            })
            .addCase(userRefreshData.rejected, (state, action) => {
                state.loading = false
                state.error = "error"
            })
})
export default loginSlice.reducer
export const {getUserData, userRefresh, exit} = loginSlice.actions
