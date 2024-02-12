import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    selectedBlog: null,
    deleteConfirmationOpen: false,
    rows: null
}

export const getCounsellorBlogs = createAsyncThunk('showBlogsSlice/getCounsellorBlogs', async() => {
    try{
        const response = await axios.get("http://127.0.0.1:8000/getCounsellorBlogs")
        return response.data
    } catch(error){
        throw error
    }
})


export const deleteBlog = createAsyncThunk('showBlogsSlice/deleteBlog', async(id) => {
    try{
        const response = await axios.delete(`http://127.0.0.1:8000/deleteBlog/${id}`)
        return response.data
    } catch(error) {
        throw error
    }
})


const showBlogsSlice = createSlice({
    name: 'showBlogs',
    initialState,
    reducers:{
        handleDeleteBlog: (state, {payload}) => {
            state.selectedBlog = payload.data
            state.deleteConfirmationOpen = true
        },
        handleCancelDelete: (state) => {
            state.deleteConfirmationOpen = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCounsellorBlogs.pending, (state) => {
                //console.log("getCounsellorBlogs pending")
            })
            .addCase(getCounsellorBlogs.fulfilled, (state, action) => {
                //console.log("getCounsellorBlogs fulfilled")
                state.rows = action.payload.blogs
            })
            .addCase(getCounsellorBlogs.rejected, (state, action) => {
                //console.log("getCounsellorBlogs Rejected")
            })
            .addCase(deleteBlog.pending, (state) => {
                //console.log("deleteBlog pending")
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                //console.log("deleteBlog fulfilled")
                const updatedRows = state.rows.filter((row) => row.id !== state.selectedBlog.id);
                state.rows = updatedRows
                state.selectedBlog = null
                state.deleteConfirmationOpen = false
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                //console.log("delete blog rejected")
            })
    }
})


export const {handleDeleteBlog, handleCancelDelete} = showBlogsSlice.actions
export default showBlogsSlice.reducer