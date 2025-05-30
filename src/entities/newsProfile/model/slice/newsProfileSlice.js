import {createSlice} from "@reduxjs/toolkit";

import {fetchNewsProfileData} from "entities/newsProfile/model/thunk/newsProfileThunk";

const initialState = {
    data: {},
    loading: false,
    error: undefined,
}

const newsProfileSlice = createSlice({
    name: "newsProfileSlice",
    initialState,
    reducers: {
        onChangeBlock: (state, action) => {


            const isHave = state.data.blocks.find(item => item.id === action.payload.id)

            if (isHave) {
                state.data.blocks = state.data.blocks.map(item => {
                    if (item.id === action.payload.id) {
                        return action.payload
                    }
                    return item
                })
            } else {
                state.data.blocks = [...state.data.blocks, action.payload]
            }

        },
        onDeleteBlock: (state, action) => {
            state.data.blocks = state.data.blocks.filter(item => item.id !== action.payload)
        },
        onChangeData: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(fetchNewsProfileData.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchNewsProfileData.fulfilled, (state, action) => {
                state.data = action.payload
                state.data.blocks = action.payload.blocks?.map((item, index) => {
                    if (item.type_block === "text") {
                        return {
                            news: item.news,
                            id: item.id,
                            index: index,
                            text: item.desc_json.text,
                            editorState: item.desc_json.editorState,
                            type: "text",
                            completed: true
                        }
                    } else if (item.type_block === "image") {
                        return {
                            news: item.news,
                            id: item.id,
                            index: index,
                            img: item.img_url,
                            type: "image",
                            completed: true
                        }
                    }
                })

                state.loading = false
                state.error = undefined
            })
            .addCase(fetchNewsProfileData.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })


})

export const {
    onChangeBlock,
    onDeleteBlock,
    onChangeData
} = newsProfileSlice.actions
export default newsProfileSlice.reducer

