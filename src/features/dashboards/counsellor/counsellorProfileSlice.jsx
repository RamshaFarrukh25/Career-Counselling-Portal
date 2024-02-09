import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    counsellorProfileData:''
}



export const getCounsellorProfileData = createAsyncThunk('counsellorProfileSlice/getCounsellorProfileData', async (user_id) => {
    try {
        //console.log(user_id)
        const response = await axios.get(`http://127.0.0.1:8000/getCounsellorProfileData/${user_id}`);
        return response.data;
    } 
    catch (error) {
      throw error;
    }
});

const counsellorProfileSlice = createSlice({
    name: 'counsellorProfileSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getCounsellorProfileData.pending, (state) => {
            //console.log("pending");
          })
          .addCase(getCounsellorProfileData.fulfilled, (state,action) => {
            //console.log("accepted");
            state.counsellorProfileData = action.payload.counsellor_profile_data
            console.log(state.counsellorProfileData)
          })
          .addCase(getCounsellorProfileData.rejected, (state) => {
            //console.log("rejected");
          });
    },
})

export default counsellorProfileSlice.reducer