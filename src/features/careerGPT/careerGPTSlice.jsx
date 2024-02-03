import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    messages: ""
}

export const storeHistory = createAsyncThunk('careerGPTSlice/storeHistory', async(messages) => {
    try{
        const response = await axios.post("http://127.0.0.1:8000/storeCareerGPTHistory", messages)
        return response.data
    }catch(error){
        throw error
    }
})


const careerGPTSlice = createSlice({
    name: 'careerGPT',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(storeHistory.pending , (state) => {
                console.log("Storing History Pending")
            })
            .addCase(storeHistory.fulfilled, (state, action) => {
                console.log("Storing History fulfilled")
            })
            .addCase(storeHistory.rejected, (state, action) => {
                console.log("Storing History Rejected")
            })
    }
})

export default careerGPTSlice.reducer