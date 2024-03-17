import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    counsellorsData:null,
    comments:'',
}

// API THAT GETS ALL Counsellors
const apiUrl = "http://127.0.0.1:8000/getCounsellorsData";

export const getCounsellors = createAsyncThunk('approveCounsellorsSlice/getCounsellorsData', async() =>{
  try{
      const response = await axios.get(apiUrl);
      return response.data;
  }
  catch (error){
      throw error;
  }
});

export const deleteCounsellor = createAsyncThunk('approveCounsellorsSlice/deleteCounsellor', async(payload) => {
  const { email, comments } = payload;
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/deleteCounsellor/${email}/${comments}`);
    return response.data;
  } catch(error) {
    throw error;
  }
});


export const approveCounsellor = createAsyncThunk('approveCounsellorsSlice/approveCounsellor', async(payload) => {
  const { email, comments } = payload;
  try {
    const response = await axios.get(`http://127.0.0.1:8000/approveCounsellor/${email}/${comments}`);
    return response.data;
  } catch(error) {
    throw error;
  }
});

const approveCounsellorsSlice = createSlice({
    name: "approveCounsellors",
    initialState,
    reducers: {
      handleChange: (state, {payload}) => {
        state.comments = payload.value;
    },
    clearReason: (state) => {
      state.comments=""
    }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getCounsellors.pending, (state) => {
            //console.log("counsellors data pending");
          })
          .addCase(getCounsellors.fulfilled, (state,action) => {
            //console.log("counsellors data recieved")
            state.counsellorsData = action.payload.counsellorsData
            //console.log(state.counsellorsData)
          })
          .addCase(getCounsellors.rejected, (state) => {
            //console.log("counsellors data rejected");
          })
          .addCase(deleteCounsellor.pending, (state) => {
            //console.log("counsellor deletion pending");
          })
          .addCase(deleteCounsellor.fulfilled, (state,action) => {
            //console.log("counsellor deleted successfully")
          })
          .addCase(deleteCounsellor.rejected, (state) => {
            //console.log("counsellor deletion rejected");
          })

          .addCase(approveCounsellor.pending, (state) => {
            console.log("counsellor approval pending");
          })
          .addCase(approveCounsellor.fulfilled, (state,action) => {
            console.log("counsellor approved successfully")
          })
          .addCase(approveCounsellor.rejected, (state) => {
            console.log("counsellor approval rejected");
          })
    },
})

export const {handleChange,clearReason} = approveCounsellorsSlice.actions
export default approveCounsellorsSlice.reducer;