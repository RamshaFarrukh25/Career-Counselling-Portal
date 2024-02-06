import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
  rows: [],
  selectedRow: null
}

// API THAT GETS ALL USERS 'U' & 'B'
const apiUrl = "http://127.0.0.1:8000/getUsers";

export const getUsers = createAsyncThunk('userReportSlice/getUsers', async() =>{
  try{
      const response = await axios.get(apiUrl);
      return response.data;
  }
  catch (error){
      throw error;
  }
});

// API THAT DELETES  A SINGLE USER BY ID
const  deleteUserUrl = "http://127.0.0.1:8000/deleteUser"

export const  deleteUser = createAsyncThunk("userReportSlice/deleteUser",async(selectedRow)=>{
  try{
      const response = await axios.post(deleteUserUrl, selectedRow)
      return response.data;
  }
  catch (error){
      throw error;
  }
});

const UserReportSlice = createSlice({
    name: "userReport",
    initialState,
    reducers: {
      handleDeleteRow: (state) => {
        if (state.selectedRow !== null) {
          const updatedRows = state.rows.filter((row) => row.id !== state.selectedRow);
          state.rows = updatedRows;
          state.selectedRow = null;
        }
      },
      setSelectedRow: (state, action) => {
        state.selectedRow = action.payload;
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getUsers.pending, (state) => {
            console.log("users data pending");
          })
          .addCase(getUsers.fulfilled, (state,action) => {
            console.log("users data recieved")
            state.rows = action.payload.usersList
          })
          .addCase(getUsers.rejected, (state) => {
            console.log("users data rejected");
          })
          .addCase(deleteUser.pending, (state) => {
            console.log("delete request pending");
          })
          .addCase(deleteUser.fulfilled, (state,action) => {
            console.log("delete request recieved");
          })
          .addCase(deleteUser.rejected, (state) => {
            console.log("delete request rejected");
          })
    },
})

export const { setSelectedRow, handleDeleteRow } = UserReportSlice.actions;
export default UserReportSlice.reducer;