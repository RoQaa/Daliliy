import { CategoryReduser } from "./slices/CategorySlice.js";
import { ItemReduser } from "./slices/ItemsSlice.js";
import { ProfileReduser } from "./slices/ProfileSlice.js";
import { userReduser } from "./slices/UserSlice.js"
import { configureStore } from "@reduxjs/toolkit";




export let store = configureStore({
    reducer: {
        userReduser,
        CategoryReduser,
        ItemReduser,
        ProfileReduser
    }
})