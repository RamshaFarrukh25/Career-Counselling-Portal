import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [
    { id: 1, name: 'John Doe', email: 'johndoe1@gmail' },
    { id: 2, name: 'Jane Smith',  email: 'johndoe1@gmail.com' },
    { id: 3, name: 'Bob Johnson',  email: 'johndoe1@gmail.com' },
    { id: 4, name: 'John Doe',  email: 'johndoe1@gmail.com' },
    { id: 5, name: 'Jane Smith',  email: 'johndoe1@gmail.com' },
    { id: 6, name: 'Bob Johnson',  email: 'johndoe1@gmail.com' },
    { id: 7, name: 'John Doe',  email: 'johndoe1@gmail.com' },
    { id: 8, name: 'Jane Smith',  email: 'johndoe1@gmail.com' },
    { id: 9, name: 'Bob Johnson',  email: 'johndoe1@gmail.com' },
    { id: 10, name: 'John Doe',  email: 'johndoe1@gmail.com' }
  ],
  selectedRow: null
}


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
    }
})

export const { handleDeleteRow, setSelectedRow } = UserReportSlice.actions;
export default UserReportSlice.reducer;