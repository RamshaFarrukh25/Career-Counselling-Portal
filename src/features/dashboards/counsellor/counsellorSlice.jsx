import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    name: "",
    email: "",
    profilePic: "",
    notificationData:[]
}

export const getCounsellorData = createAsyncThunk('counsellorSlice/getCounsellorData', async() => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/getCounsellorData")
        return response.data
    } catch(error){
        throw error
    }
})

const counsellorSlice = createSlice({
    name: 'counsellor',
    initialState,
    reducers:{
        setNotificationData:(state,{payload})=>{
            state.notificationData = payload.data;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCounsellorData.pending, (state) => {
                //console.log("getCounsellorData Pending")
            })
            .addCase(getCounsellorData.fulfilled, (state, action) => {
                //console.log("getCounsellorData fulfilled")
                state.name = action.payload.counsellorData.name
                state.email = action.payload.counsellorData.email
                state.profilePic = action.payload.counsellorData.profile_pic
            })
            .addCase(getCounsellorData.rejected, (state, action) => {
                //console.log("getCounsellorData Rejected")
            })
    }
})

export default counsellorSlice.reducer
export const {setNotificationData} = counsellorSlice.actions