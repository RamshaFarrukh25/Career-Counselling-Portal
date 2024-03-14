import { Co2Sharp } from "@mui/icons-material"
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    addBlog:{
        title:'',
        author_name:'',
        description:'',
        area_of_field:'',
        cover_image: ''
    },
    errorMsg: "",
    user_email:""
}

// API THAT GETS BLOGS DATA
const apiUrl = "http://127.0.0.1:8000/blogDetails"
export const getBlogDetails = createAsyncThunk('blogDetailsSlice/blogDetails', async (id) => {
    try {
      const response = await axios.post(apiUrl,{'id':id});
      return response.data;
    } 
    catch (error) {
      throw error;
    }
})

// API THAT ADD BLOG
export const addBlogData = createAsyncThunk('addBlogSlice/addBlog',
    async (data) => {
      try{
          const response = await axios.post(
              'http://127.0.0.1:8000/addBlog',
              data,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
          );
          return response.data
  } catch(error) {
      throw error
  }
});


// API THAT EDIT BLOG
export const editBlogData = createAsyncThunk('addBlogSlice/editBlog',
    async(data) => {
      try{
        const response = await axios.post(
            'http://127.0.0.1:8000/editBlog',
            data,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
        )
        return response.data
      } catch(error) {
        throw error 
}})


const addBlogSlice = createSlice({
    name: 'addBlogSlice',
    initialState,
    reducers: {
        handleChange: (state, {payload}) => {
            state.addBlog = {
                ...state.addBlog,
                [payload.name]: payload.value
            }
        },
        setDescription:(state,{payload}) =>{
            state.addBlog.description= payload.description
        },
        clearForm: (state) => {
          state.addBlog = {
            title: "",
            description: "",
            area_of_field: "",
          };
          state.isChanged = null;
          state.errorMsg = ""
        },
        showErrorMsg: (state, {payload}) => {
          state.errorMsg = payload.error
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(addBlogData.pending, (state) => {
            //console.log("add Blog pending");
          })
          .addCase(addBlogData.fulfilled, (state,action) => {
              //console.log("add Blog accepted");
          })
          .addCase(addBlogData.rejected, (state, action) => {
              //console.log("add Blog rejected");
          })
          .addCase(getBlogDetails.pending, (state) => {
            //console.log("getBlogDetails pending")
          })
          .addCase(getBlogDetails.fulfilled, (state, action) => {
            //console.log("getBlogDetails fulfilled")
            //console.log("Data", action.payload.blogDetails)
            state.addBlog.title = action.payload.blogDetails.title
            state.addBlog.area_of_field = action.payload.blogDetails.area_of_field
            state.addBlog.description = action.payload.blogDetails.description
            state.addBlog.cover_image = action.payload.blogDetails.cover_image
            state.user_email = action.payload.user_email
          })
          .addCase(getBlogDetails.rejected, (state, action) => {
            //console.log("getBlogDetails rejected")
          })
          .addCase(editBlogData.pending, (state) => {
            //console.log("editBlogData pending")
          })
          .addCase(editBlogData.fulfilled, (state, action) => {
            console.log("editBlogData fulfilled")
           
          })
          .addCase(editBlogData.rejected, (state, action) => {
            //console.log("editBlogData rejected")
          })
    },
})

export default addBlogSlice.reducer
export const {handleChange, setDescription, clearForm, showErrorMsg} = addBlogSlice.actions