import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
  rows: [],
  selectedBlog: null,
  deleteConfirmationOpen: false,
  rejectionReason: '',
  approvalReason: ''
}

// API THAT GETS ALL UNAPPROVED BLOGS
const apiUrl = "http://127.0.0.1:8000/getUnapprovedBlogs";

export const getUnapprovedBlogs = createAsyncThunk('approveBlogsSlice/getUnapprovedBlogs', async() =>{
  try{
      const response = await axios.get(apiUrl);
      return response.data;
  }
  catch (error){
      throw error;
  }
});

// API THAT DELETES BLOG
const apiDel = "http://127.0.0.1:8000/rejectBlog";

export const rejectBlog = createAsyncThunk('approveBlogsSlice/rejectBlog', async({blog_id, counsellor_email}) =>{
  try{
      const response = await axios.post(apiDel, {blog_id, counsellor_email})
      return response.data;
  }
  catch (error){
      throw error;
  }
});

// API THAT  APPROVES A BLOG
const apiApprove = "http://127.0.0.1:8000/approveBlog";

export const approveBlog = createAsyncThunk('approveBlogSlice/approveBlog', async({blog_id}) =>{
  try{
    const response = await axios.put(apiApprove, {blog_id})
    return response.data;
  }
  catch(error) {
    throw error;
  }
});

const ApproveBlogsSlice = createSlice({
    name: "approveBlogs",
    initialState,
    reducers: {
        setRejectionReason: (state, action) => {
            state.rejectionReason = action.payload;
            console.log(state.rejectionReason)
        },
        handleChange: (state, {payload}) => {
          state.rejectionReason= {
              ...state.rejectionReason,
              [payload.name]: payload.value
          }
        },
        setSelectedBlog: (state, action) => {
          state.selectedBlog = action.payload;
        },
        handleConfirmDelete: (state) => {
          if (state.selectedBlog !== null) {
              const updatedRows = state.rows.filter((row) => row.id !== state.selectedBlog);
              state.rows = updatedRows;
              state.selectedBlog = null;
          }
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getUnapprovedBlogs.pending, (state) => {
            //console.log("blogs data pending");
          })
          .addCase(getUnapprovedBlogs.fulfilled, (state,action) => {
            //console.log("blogs data recieved")
            state.rows = action.payload.unapprovedBlogs
          })
          .addCase(getUnapprovedBlogs.rejected, (state) => {
            //console.log("blogs data rejected");
          })
          .addCase(rejectBlog.pending, (state) => {
            // console.log("reject blog pending");
          })
          .addCase(rejectBlog.fulfilled, (state) => {
            // console.log("reject blog recieved")
          })
          .addCase(rejectBlog.rejected, (state) => {
            // console.log("reject blog rejected");
          })
          .addCase(approveBlog.pending, (state) => {
            console.log("approve blog pending");
          })
          .addCase(approveBlog.fulfilled, (state) => {
            console.log("approve blog recieved")
          })
          .addCase(approveBlog.rejected, (state) => {
            console.log("approve blog rejected");
          })
    },
})

export const { setRejectionReason, handleChange, setSelectedBlog, handleConfirmDelete } = ApproveBlogsSlice.actions;
export default ApproveBlogsSlice.reducer;