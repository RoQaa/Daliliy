import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getProfleData = createAsyncThunk('profile/getProfleData', async () => {
    
    let token =localStorage.getItem('userToken')
    let headers = {
        Authorization: `Bearer ${token}`
    }
    let { data } = await axios(`https://dalilalhafr.com/api/auth/profilePage`, { headers })
    return data;
})

let ProfileSlice = createSlice({
    name: "profile",
    initialState: { ProfileList: [], loading: false },
    extraReducers: (bulider) => {
        bulider.addCase(getProfleData.pending, (state) => {
            state.loading = true
        })
        bulider.addCase(getProfleData.fulfilled, (state, action) => {
            let { data } = action.payload
            state.ProfileList = data
            state.loading = false

        })
    }
})
export let ProfileReduser = ProfileSlice.reducer
