import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getAllCategorys = createAsyncThunk('category/getAllCategorys', async () => {
    
    let token =localStorage.getItem('userToken')
    let headers = {
        Authorization: `Bearer ${token}`
    }
    let {data}= await axios('https://dalilalhafr.com/api/cats/getCats', { headers  })
    return data;
})

let CategorySlice = createSlice({
    name: "category",
    initialState: { CategorysList: [], loading: false },
    extraReducers: (bulider) => {
        bulider.addCase(getAllCategorys.pending, (state) => {
            state.loading = true
        })
        bulider.addCase(getAllCategorys.fulfilled, (state, action) => {
            let { data } = action.payload
            state.CategorysList = data
            state.loading = false

        })
    }
})
export let CategoryReduser = CategorySlice.reducer
