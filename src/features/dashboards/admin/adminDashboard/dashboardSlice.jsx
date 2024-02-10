import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  userCount: 0,
  blogsCount: 0,
  counsellorsCount: 0,
  reviewsCount: 0,
};

export const fetchUserCount = createAsyncThunk("dashboard/fetchUserCount", async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/getUsersCount");
    return response.data.users_count;
  } catch (error) {
    throw error;
  }
});

export const fetchBlogsCount = createAsyncThunk("dashboard/fetchBlogsCount", async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/getBlogsCount");
    return response.data.blog_count;
  } catch (error) {
    throw error;
  }
});

export const fetchCounsellorsCount = createAsyncThunk("dashboard/fetchCounsellorsCount", async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/getCounsellorsCount");
    return response.data.counsellor_count;
  } catch (error) {
    throw error;
  }
});

export const fetchReviewsCount = createAsyncThunk("dashboard/fetchReviewsCount", async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/getReviewsCount");
    return response.data.review_count;
  } catch (error) {
    throw error;
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCount.fulfilled, (state, action) => {
        state.userCount = action.payload;
      })
      .addCase(fetchBlogsCount.fulfilled, (state, action) => {
        state.blogsCount = action.payload;
      })
      .addCase(fetchCounsellorsCount.fulfilled, (state, action) => {
        state.counsellorsCount = action.payload;
      })
      .addCase(fetchReviewsCount.fulfilled, (state, action) => {
        state.reviewsCount = action.payload;
      })
  },
});

export default dashboardSlice.reducer;
