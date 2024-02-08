import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loginForm: {
        email: "",
        password: ""
    },
    isLogin:null,
    role:'',
    user_id:'',
    user_name: '',
    user_email: ''
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
        logOut:(state)=>{
          state.isLogin=null
          state.role=''
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loginUser.pending, (state) => {
            console.log("pending");
          })
          .addCase(loginUser.fulfilled, (state,action) => {
            state.isLogin= action.payload.isLogin
            state.role=action.payload.role
            state.user_id=action.payload.user_id
            state.user_name=action.payload.user_name
            state.user_email=action.payload.user_email
          })
          .addCase(loginUser.rejected, (state) => {
            console.log("rejected");
          });
    },
})


export const{handleChange, handleSubmit,logOut} = loginSlice.actions
export default loginSlice.reducer