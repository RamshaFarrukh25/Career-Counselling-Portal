import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios';

const initialState = {
  blogsDataList:'',
}

// API THAT GETS BLOGS DATA
const apiUrl = "http://127.0.0.1:8000/fetchBlogsData"

export const fetchBlogsData = createAsyncThunk('blogCardsSlice/fetchBlogsData', async () => {
    try {
      const response = await axios.get(apiUrl);
      //console.log(response.data)
      return response.data;
    } 
    catch (error) {
      throw error;
    }
});


const blogCardsSlice = createSlice({
    name: "blogCards",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
      builder
          .addCase(fetchBlogsData.pending, (state) => {
              //console.log("pending")
          })
          .addCase(fetchBlogsData.fulfilled, (state, action) => {
              //console.log("recieved")
              state.blogsDataList= action.payload.blogsData
          })
          .addCase(fetchBlogsData.rejected, (state, action) => {
              //console.log("rejected")
          });
    },
});
export default blogCardsSlice.reducer