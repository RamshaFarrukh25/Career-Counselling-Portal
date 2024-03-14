import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loginForm: {
        email: "",
        password: ""
    },
    isLogin: null,
}


// API that Checks Login Credentials
const apiUrl = "http://127.0.0.1:8000/loginUser";
export const loginUser = createAsyncThunk('loginSlice/loginUser', async ({email,password}) => {
    try {
      const response = await axios.post(apiUrl, {email,password} );
      return response.data;
    } 
    catch (error) {
      throw error;
    }
});


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        handleChange: (state, {payload}) => {
            state.loginForm = {
                ...state.loginForm,
                [payload.name]: payload.value
            }
        },
        clearForm: (state) => {
          state.loginForm = {
            email: "",
            password: ""
          }
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loginUser.pending, (state) => {
            console.log("login pending");
          })
          .addCase(loginUser.fulfilled, (state,action) => {
            console.log("Login fulfilled")
            state.isLogin= action.payload.isLogin
            console.log(state.isLogin)
          })
          .addCase(loginUser.rejected, (state) => {
            console.log("login rejected");
          });
    },
})


export const{handleChange, clearForm } = loginSlice.actions
export default loginSlice.reducer