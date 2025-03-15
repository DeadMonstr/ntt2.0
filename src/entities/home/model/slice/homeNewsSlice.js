import {createSlice} from "@reduxjs/toolkit";
import {fetchNews, fetchProfileItem} from "entities/home/model/thunk/newsThunk";

const initialState = {
    loading: false,
    error: false,
    data: [],
    profileItem: [
        {
            id: 1,
            name: "Filologiya va tillarni o’qitish: xitoy tili",
            lang: "Uz",
            shift: "Kunduzgi",
            requirements: "Yunalishlarga mos",
            pay_sum: "200000",
            about: "Tadbirkorlik yoki biznes (inglizcha: business– „bandlik“), deb har qanday qonuniy tijorat faoliyatiga aytiladi. Tadbirkorlik bilan shugʻullanuvchi shaxs tadbirkor, "
        },
        {
            id: 1,
            name: "Filologiya va tillarni o’qitish: xitoy tili",
            lang: "Uz",
            shift: "Kunduzgi",
            requirements: "Yunalishlarga mos",
            pay_sum: "200000",
            about: "Tadbirkorlik yoki biznes (inglizcha: business– „bandlik“), deb har qanday qonuniy tijorat faoliyatiga aytiladi. Tadbirkorlik bilan shugʻullanuvchi shaxs tadbirkor, "
        },
        {
            id: 1,
            name: "Filologiya va tillarni o’qitish: xitoy tili",
            lang: "Uz",
            shift: "Kunduzgi",
            requirements: "Yunalishlarga mos",
            pay_sum: "200000",
            about: "Tadbirkorlik yoki biznes (inglizcha: business– „bandlik“), deb har qanday qonuniy tijorat faoliyatiga aytiladi. Tadbirkorlik bilan shugʻullanuvchi shaxs tadbirkor, "
        },
        // {
        //     id: 1,
        //     name: "Filologiya va tillarni o’qitish: xitoy tili",
        //     lang: "Uz",
        //     shift: "Kunduzgi",
        //     requirements: "Yunalishlarga mos",
        //     pay_sum: "200000",
        //     about: "Tadbirkorlik yoki biznes (inglizcha: business– „bandlik“), deb har qanday qonuniy tijorat faoliyatiga aytiladi. Tadbirkorlik bilan shugʻullanuvchi shaxs tadbirkor, "
        // },
    ]

}


const homeNewsSlice = createSlice({
    name: "homeNewsSlice",
    initialState,
    reducers: {
        onAddHomeNews: (state, action) => {
            state.data.results = [...state.data.results, action.payload]
        },
        onEditHomeNews: (state, action) => {
            state.data.results = state.data.results.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload.data
                }
                return item
            })
        },
        onDeleteHomeNews: (state, action) => {
            state.data.results = state.data.results.filter(item => item.id !== action.payload)
        }
    },
    extraReducers: builder =>
        builder
            .addCase(fetchNews.pending, state => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = false
            })
            .addCase(fetchNews.rejected, state => {
                state.error = true
                state.loading = false
            })

            .addCase(fetchProfileItem.pending, state => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchProfileItem.fulfilled, (state, action) => {
                state.loading = false
                state.profileItem = action.payload
                localStorage.setItem("visitorId", action?.payload?.visitor_id)
                state.error = false
            })
            .addCase(fetchProfileItem.rejected, state => {
                state.error = true
                state.loading = false
            })

})

export const {onAddHomeNews, onEditHomeNews, onDeleteHomeNews} = homeNewsSlice.actions
export default homeNewsSlice.reducer