import {createSlice} from "@reduxjs/toolkit";
import {createTest, fetchOrganizationFields, fetchTestProfile} from "./createTestThunk";

const initialState = {
    data: [],
    fields: [],
    profile: {},
    loading: false,
    error: false
}

const createTestSlice = createSlice({
    name: "createTestSlice",
    initialState,
    reducers: {
        addQuestion: (state, action) => {
            state.profile.blocks = [
                ...state.profile.blocks,
                action.payload.blocks[action.payload.blocks.length - 1]
            ]
        },
        deleteQuestion: (state, action) => {
            state.profile.blocks = state.profile.blocks
                .filter(item => item.id !== action.payload)
        },
        changeQuestion: (state, action) => {
            state.profile.blocks = state.profile.blocks
                .map(item => item.id === action.payload.id ? action.payload : item)
        },
        deleteVariant: (state, action) => {
            state.profile.blocks = state.profile.blocks
                .map(item => {
                    if (item.id === action.payload.questionId) {
                        return {
                            ...item,
                            questions: item.questions
                                .filter(inner => inner.id !== action.payload.variantId)
                        }
                    } else return item
                })
        }
    },
    extraReducers: builder =>
        builder
            .addCase(createTest.pending, (state) => {
                state.loading = true
                state.errpr = false
            })
            .addCase(createTest.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
                state.errpr = false
            })
            .addCase(createTest.rejected, (state) => {
                state.loading = false
                state.errpr = true
            })
            .addCase(fetchOrganizationFields.pending, (state) => {
                state.loading = true
                state.errpr = false
            })
            .addCase(fetchOrganizationFields.fulfilled, (state, action) => {
                state.fields = action.payload
                state.loading = false
                state.errpr = false
            })
            .addCase(fetchOrganizationFields.rejected, (state) => {
                state.loading = false
                state.errpr = true
            })
            .addCase(fetchTestProfile.pending, (state) => {
                state.loading = true
                state.errpr = false
            })
            .addCase(fetchTestProfile.fulfilled, (state, action) => {
                state.profile = action.payload
                state.loading = false
                state.errpr = false
            })
            .addCase(fetchTestProfile.rejected, (state) => {
                state.loading = false
                state.errpr = true
            })
})

export default createTestSlice.reducer
export const {
    addQuestion,
    changeQuestion,
    deleteQuestion,
    deleteVariant
} = createTestSlice.actions
