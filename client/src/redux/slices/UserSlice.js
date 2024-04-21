import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
    let token =localStorage.getItem('userToken')
    let headers = {
        Authorization: `Bearer ${token}`
    }
    let {data}= await axios('https://dalilalhafr.com/api/auth/getUsers', { headers  })
    return data;
})

let UserSlice = createSlice({
    name: "user",
    initialState: { usersList: [], loading: false },
    extraReducers: (bulider) => {
        bulider.addCase(getAllUsers.pending, (state) => {
            state.loading = true
        })
        bulider.addCase(getAllUsers.fulfilled, (state, action) => {
            let { data } = action.payload
            state.usersList = data
            state.loading = false

        })
    }
})
export let userReduser = UserSlice.reducer
