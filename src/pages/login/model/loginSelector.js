export const getUserId = (state) =>
    state.loginSlice.userId
export const getUserRefreshLoading = (state) =>
    state.loginSlice.loading

export const getUserFetchError = (state) =>
    state.loginSlice.error