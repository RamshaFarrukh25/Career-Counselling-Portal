import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios';

const initialState = {
  signupForm: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  passwordMatch: "",
  isSignup: false,
  otp:'',
  isEmailExist:null
}

// API THAT SENDS OTP TO USER EMAIL
const apiUrl = "http://127.0.0.1:8000/sendOTP";


export const getOTP = createAsyncThunk('signupSlice/sendOTP', async (email) => {
    try {
      const response = await axios.post(apiUrl, {'email':email} );
      return response.data;
    } 
    catch (error) {
      throw error;
    }
});

// API THAT CHECK USER EMAIL
const apiURL = "http://127.0.0.1:8000/checkEmail";


export const checkEmail = createAsyncThunk('signupSlice/checkEmail', async (email) => {
    try {
      const response = await axios.post(apiURL, {'email':email} );
      return response.data;
    } 
    catch (error) {
      throw error;
    }
});

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      state.signupForm = {
        ...state.signupForm,
        [payload.name]: payload.value
      }
    },
    matchPasswords: (state) => {
      if (state.signupForm.password !== state.signupForm.confirmPassword) {
        state.passwordMatch = "passwordError";
      } else {
        state.passwordMatch = "passwordMatch";
      }
    },
    handleSignup: (state) => {
      if (state.passwordMatch !== "passwordMatch") {
        state.isSignup = false;
        return;
      } else {
        state.isSignup = true;
      }
    },
    clearForm: (state) => {
      state.signupForm = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
      state.passwordMatch = "";
      state.isSignup = false;
      state.otp = '';
      state.isEmailExist = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOTP.pending, (state) => {
        console.log("pending otp ");
      })
      .addCase(getOTP.fulfilled, (state, action) => {
        console.log("otp received");
        state.otp = action.payload.otp;
      })
      .addCase(getOTP.rejected, (state, action) => {
        console.log("rejected otp");
      })
      .addCase(checkEmail.pending, (state) => {
        console.log("pending checking unique email");
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        console.log("email uniquenesss checked");
        state.isEmailExist = action.payload.isExist;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        console.log("rejected email uniqueness");
      });
  },
});


export const { handleChange, matchPasswords, handleSignup, clearForm} = signupSlice.actions
export default signupSlice.reducer
