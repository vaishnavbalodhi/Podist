import { createSlice } from "@reduxjs/toolkit";

const podcastSlice = createSlice({
    name: "podcast",
    initialState: {
        podcasts: [],
    },
    reducers: {
        setPodcast: (state, action) => {
            state.podcasts = action.payload;
        },
        // clearPodcast: (state) => {
        //     state.user = null;
        // },
    },
});

export const { setPodcast } = podcastSlice.actions;
export default podcastSlice.reducer;