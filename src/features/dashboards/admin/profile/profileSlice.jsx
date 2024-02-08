import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';

// existing admin password : BotGuided@456
const initialState = {
  profileForm: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  passwordMatch: "",
  isSave: null
}

// API THAT GETS ADMIN PROFILE DATA
const getApi = "http://127.0.0.1:8000/getAdminProfile"

export const getAdminProfile = createAsyncThunk('profileSlice/getAdminProfile', async () => {
  try {
    const response = await axios.get(getApi);
    return response.data;
  } 
  catch (error) {
    throw error;
  }
});

// API THAT UPDATES PROFILE DATA
const putApi = "http://127.0.0.1:8000/updateAdminProfile";


export const updateAdminProfile = createAsyncThunk('profileSlice/updateAdminProfile', async (profileForm) => {
    try{
      const response = await axios.put(putApi, profileForm);
      return response.data;
    } 
    catch (error) {
      throw error;
    }
});

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      state.profileForm = {
        ...state.profileForm,
        [payload.name]: payload.value
      }
    },
    clearForm: (state) => {
      if(state.passwordMatch == "passwordMatch"){
        state.profileForm = {
          name: state.profileForm.name,
          email: state.profileForm.email,
          password: "",
          confirmPassword: "",
        } 
      }  
    },
    matchPasswords: (state) => {
      if(state.profileForm.password !== state.profileForm.confirmPassword){
        state.passwordMatch = "passwordError"
      } else {
        state.passwordMatch = "passwordMatch"
      }
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(getAdminProfile.pending, (state) => {
            console.log("pending")
        })
        .addCase(getAdminProfile.fulfilled, (state, action) => {
            console.log("recieved")
            state.profileForm.name = action.payload.profileData.name
            state.profileForm.email = action.payload.profileData.email
        })
        .addCase(getAdminProfile.rejected, (state) => {
            console.log("rejected")
        })
        .addCase(updateAdminProfile.pending, (state) => {
          console.log("update Admin Profile pending");
        })
        .addCase(updateAdminProfile.fulfilled, (state) => {
          console.log("Admin Profile updated successfully");
          state.isSave = true
        })
        .addCase(updateAdminProfile.rejected, (state) => {
          console.log("update Admin Profile rejected");
          state.isSave = false
        });
  },
})

export const { handleChange, clearForm, matchPasswords } = ProfileSlice.actions
export default ProfileSlice.reducer
