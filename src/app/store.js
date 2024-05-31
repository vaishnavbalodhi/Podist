import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user/userSlice";
import podcastReducer from "../feature/podcast/podcastSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        podcast: podcastReducer,
    },
});