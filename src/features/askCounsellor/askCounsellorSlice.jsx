import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    topCounsellorsList:''
}

// API that GETS TOP Counsellors
const apiUrl = "http://127.0.0.1:8000/getTopCounsellors";
export const getTopCounsellors = createAsyncThunk('askCounsellorSlice/getTopCounsellors', async () => {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } 
    catch (error) {
      throw error;
    }
});


const askCounsellorSlice = createSlice({
    name: 'askCounsellor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getTopCounsellors.pending, (state) => {
            console.log("pending");
          })
          .addCase(getTopCounsellors.fulfilled, (state,action) => {
            console.log("accepted");
            state.topCounsellorsList = action.payload.top_counsellors
            console.log(state.topCounsellorsList)
          })
          .addCase(getTopCounsellors.rejected, (state) => {
            console.log("rejected");
          });
    },
})

export default askCounsellorSlice.reducer