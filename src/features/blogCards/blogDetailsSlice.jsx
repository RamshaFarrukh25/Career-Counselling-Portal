import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios';

const initialState = {
  blogDetailsData:''
}

// API THAT GETS BLOGS DATA
const apiUrl = "http://127.0.0.1:8000/blogDetails"

export const blogDetails = createAsyncThunk('blogDetailsSlice/blogDetails', async (id) => {
    try {
      const response = await axios.post(apiUrl,{'id':id});
      return response.data;
    } 
    catch (error) {
      throw error;
    }
});


const blogDetailsSlice = createSlice({
    name: "blogCards",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
      builder
          .addCase(blogDetails.pending, (state) => {
              //console.log("pending")
          })
          .addCase(blogDetails.fulfilled, (state, action) => {
              //console.log("recieved")
              state.blogDetailsData = action.payload.blogDetails
          })
          .addCase(blogDetails.rejected, (state) => {
              //console.log("rejected")
          });
    },
});
export default blogDetailsSlice.reducer