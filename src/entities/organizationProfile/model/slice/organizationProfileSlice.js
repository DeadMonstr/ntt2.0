import {createSlice} from "@reduxjs/toolkit";
import {
    fetchOrganizationProfileAdmin,
    fetchOrganizationProfileAnnouncements,
    fetchOrganizationProfileApplications,
    fetchOrganizationProfileData,
    fetchOrganizationProfileDegrees, fetchOrganizationProfileFields,
    fetchOrganizationProfileGallery,
    fetchOrganizationProfileReadMore, fetchOrganizationProfileShifts, trueAnnouncementsDelete
} from "../thunk/organizationProfileThunk";

const initialState = {
    data: null,
    gallery: null,
    applications: null,
    announcements: [],
    readMore: null,
    userData: null,
    userDataImage: null,
    degrees: [],
    fields: [],
    shifts: [],
    loading: false,
    error: null,

    selectedDegree: null,
}

const OrganizationProfileSlice = createSlice({
    name: "OrganizationProfileSlice",
    initialState,
    reducers: {
        updateData: (state, action) => {
            state.data = action.payload
        },
        updateReadMore: (state, action) => {
            state.readMore = action.payload
        },
        addGallery: (state, action) => {
            state.gallery = [...state.gallery, action.payload]
        },
        updateGallery: (state, action) => {
            state.gallery = state.gallery.map(
                item => item.id === action.payload.id
                    ? {
                        id: item.id,
                        file: action.payload,
                        organization: item.organization
                    }
                    : item
            )
        },
        deleteUserData: (state) => {
            state.userData = null
        },
        createUserData: (state, action) => {
            state.userData = action.payload
        },
        deleteAnnouncements: (state, action) => {
            if (action.payload.type) {
                state.announcementsTrue =
                    state.announcementsTrue.filter(item => item.id !== action.payload.id)
            } else {
                state.announcementsFalse =
                    state.announcementsFalse.filter(item => item.id !== action.payload.id)
            }
        },
        getOrganizationImage: (state, action) => {
            state.userDataImage = action.payload
        },
        updateSelectedDegree: (state, action) => {
            state.selectedDegree = action.payload
        },
    },
    extraReducers: builder =>
        builder
            .addCase(fetchOrganizationProfileData.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrganizationProfileData.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchOrganizationProfileData.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(fetchOrganizationProfileGallery.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrganizationProfileGallery.fulfilled, (state, action) => {
                state.gallery = action.payload?.results
                state.loading = false
                state.error = null
            })
            .addCase(fetchOrganizationProfileGallery.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(fetchOrganizationProfileApplications.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrganizationProfileApplications.fulfilled, (state, action) => {
                state.applications = action.payload?.results
                state.loading = false
                state.error = null
            })
            .addCase(fetchOrganizationProfileApplications.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(fetchOrganizationProfileReadMore.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrganizationProfileReadMore.fulfilled, (state, action) => {
                state.readMore = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchOrganizationProfileReadMore.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(fetchOrganizationProfileAnnouncements.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrganizationProfileAnnouncements.fulfilled, (state, action) => {
                state.announcements = action.payload?.results
                state.loading = false
                state.error = null
            })
            .addCase(fetchOrganizationProfileAnnouncements.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(fetchOrganizationProfileAdmin.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrganizationProfileAdmin.fulfilled, (state, action) => {
                state.userData = action.payload?.results[0]
                state.userDataImage = action.payload?.results[0]?.user?.file
                state.loading = false
                state.error = null
            })
            .addCase(fetchOrganizationProfileAdmin.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(fetchOrganizationProfileDegrees.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrganizationProfileDegrees.fulfilled, (state, action) => {
                state.degrees = action.payload?.results
                state.loading = false
                state.error = null
            })
            .addCase(fetchOrganizationProfileDegrees.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })

            .addCase(fetchOrganizationProfileFields.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrganizationProfileFields.fulfilled, (state, action) => {
                state.fields = action.payload?.results
                state.loading = false
                state.error = null
            })
            .addCase(fetchOrganizationProfileFields.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })

            .addCase(fetchOrganizationProfileShifts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrganizationProfileShifts.fulfilled, (state, action) => {
                state.shifts = action.payload?.results
                state.loading = false
                state.error = null
            })
            .addCase(fetchOrganizationProfileShifts.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
})


export const {
    updateData,
    updateReadMore,
    addGallery,
    updateGallery,
    deleteUserData,
    createUserData,
    deleteAnnouncements,
    getOrganizationImage,
    updateSelectedDegree
} = OrganizationProfileSlice.actions
export default OrganizationProfileSlice.reducer
