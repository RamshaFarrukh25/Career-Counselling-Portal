import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios';

const initialState = {
    seconds: 59,
    otp: ['', '', '', ''],
    validate: false,
    enteredOTP:'',
    errorMsg:false,
}

// API THAT Registers User
const apiUrl = "http://127.0.0.1:8000/registerUser";
export const registerUser = createAsyncThunk('otpSlice/registerUser', async (signupData) => {
    try {
      const response = await axios.post(apiUrl, {'signupData':signupData} );
      return response.data;
    } 
    catch (error) {
      throw error;
    }
});


const otpSlice = createSlice({
    name: 'otp',
    initialState,
    reducers: {
        decrementSeconds: (state) => {
            state.seconds -= 1
        },
        handleChange: (state, {payload}) => {
            state.otp[payload.name] = payload.value
        },
        displayError:(state)=>{
            state.errorMsg= true
        },
        setOtp : (state,{payload}) => {
            state.enteredOTP = payload
        },
        setValidate : (state) => {
            state.validate = !state.validate
        },
        clearForm: (state) => {
            state.seconds = 59,
            state.otp = ['', '', '', ''],
            state.validate = null
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            console.log("pending");
          })
          .addCase(registerUser.fulfilled, (state) => {
            console.log("registered successfully");
          })
          .addCase(registerUser.rejected, (state) => {
            console.log("rejected");
          });
    },
})


export const{ decrementSeconds, handleChange, setOtp,setValidate, clearForm,displayError } = otpSlice.actions
export default otpSlice.reducer