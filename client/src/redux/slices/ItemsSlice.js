import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export let getAllItems = createAsyncThunk('item/getAllItems', async () => {
    let token = localStorage.getItem('userToken')
    let headers = {
        Authorization: `Bearer ${token}`
    }
    let res = await axios.get('https://dalilalhafr.com/api/items/getAllitems', { headers }).catch((err)=>{
        return err
    })
    return res;
})
export let getOneItem = createAsyncThunk('item/getOneItem', async (id) => {
    let token = localStorage.getItem('userToken')
    let headers = {
        Authorization: `Bearer ${token}`
    }
    let { data } = await axios(`https://dalilalhafr.com/api/items/getSpecificItem/${id}`, { headers })
    return data;
})

let ItemSlice = createSlice({
    name: "item",
    initialState: { ItemsList: [], OneItemData: {}, loading: false, authError: false, authErrorMsg: null },
    extraReducers: (bulider) => {
        bulider.addCase(getAllItems.pending, (state) => {
            state.loading = true
        })
        bulider.addCase(getAllItems.fulfilled, (state, action) => {

            console.log(action);
            if(action?.payload?.response?.status == 401){
              state.authError=true
              state.authErrorMsg=action?.payload?.response?.data?.message
            }else{
                state.ItemsList=action?.payload?.data?.data
            }
            state.loading = false
        })
        

        bulider.addCase(getOneItem.pending, (state) => {
            state.loading = true
        })
        bulider.addCase(getOneItem.fulfilled, (state, action) => {
            let { data } = action.payload
            state.OneItemData = data
            state.loading = false

        })
    }
})
export let ItemReduser = ItemSlice.reducer

