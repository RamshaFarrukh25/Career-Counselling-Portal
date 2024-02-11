import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    offerCounsellorForm:{
        // first Form states
        name: "",
        email: "",
        password: "",
        phoneNo:"",
        gender:"",
        cnic:"",
        
        // second Form states
        qualification:"M.Phil",
        fieldOfStudy:"",

        // third Form states
        workingExperience: [
            {
                institute: "",
                startingYear: "",
                endingYear: "",
            }
        ]
    },
    stepCount:0,
    errorMsg:"",
    showModel:false,

    role:'',
    isEmailExist: null,
    otp: '',
    isLoading: null,

    isOTPModal: false
}

// API THAT CHECK UNIQUENESS OF COUNSELLOR'S EMAIL
export const checkCounsellorEmail = createAsyncThunk('offerCounselling/checkCounsellorEmail', 
    async(email) => {
        try{
            const response = await axios.post('http://127.0.0.1:8000/checkCounsellorEmail', {'email': email})
            return response.data
        }
        catch(error){
            throw error
        }
})

// API THAT SENDS OTP TO USER EMAIL
const apiUrl = "http://127.0.0.1:8000/sendOTP"
export const sendOTP = createAsyncThunk('offerCounselling/sendOTP', async (email) => {
    try {
      const response = await axios.post(apiUrl, {'email':email} );
      return response.data;
    } 
    catch (error) {
      throw error;
    }
});

// API THAT REGISTER COUNSELLOR
//It is the case when there is no need to send OTP, as user is already exist in the DB with the role='U'
export const registerCounsellor = createAsyncThunk('offerCounselling/registerCounsellor',
    async (data) => {
        try{
            const response = await axios.post(
                'http://127.0.0.1:8000/registerCounsellor',
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
})

//API THAT SEND VERIFICATION EMAIL TO COUNSELLOR
export const sendVerificationEmail = createAsyncThunk('offerCounselling/sendVerificationEmail',
    async(data) => {
        try{
            const response = await axios.post(
                'http://127.0.0.1:8000/sendVerificationEmail',
                data
            )
            return response.data
        }
        catch(error){
            throw error
        }
})

const offerCounsellingSlice = createSlice({
    name:'offerCounselling',
    initialState,
    reducers: {
        handleChange: (state,{payload})=>{
            state.offerCounsellorForm= {
                ...state.offerCounsellorForm,
                [payload.name]:payload.value
            }
        },
        setCount: (state,{payload})=>{
            state.stepCount= payload.value
        },
        resetCount: (state)=>{
            state.stepCount= 0
        },
        ErrorMsg:(state,{payload})=>{
            console.log(payload.msg)
            state.errorMsg = payload.msg   
        },
        handleModelChange:(state)=>{
            state.showModel = !state.showModel
        },
        addWorkingExperience: (state) => {
            return {
              ...state,
              offerCounsellorForm: {
                ...state.offerCounsellorForm,
                workingExperience: [
                  ...state.offerCounsellorForm.workingExperience,
                  {
                    institute: "",
                    startingYear: "",
                    endingYear: "",
                  }
                ]
              }
            };
        },          
        removeWorkingExperience: (state, { payload }) => {
            state.offerCounsellorForm.workingExperience.splice(payload.index, 1)
        },
        updateWorkingExperience: (state, { payload }) => {
            const { index, name, value} = payload;
            state.offerCounsellorForm.workingExperience[index][name] = value;
        },
        openOTPModal: (state) => {
            state.isOTPModal = true
        }        
        
    },
    extraReducers: (builder) => {
        builder 
            .addCase(checkCounsellorEmail.pending, (state) =>{
                //console.log("Pending")
            })
            .addCase(checkCounsellorEmail.fulfilled, (state, action) => {
                //console.log("fulfilled")
                state.role = action.payload.role
                state.isEmailExist = action.payload.isExist
            })
            .addCase(checkCounsellorEmail.rejected, (state, action) => {
                //console.log("Rejected")
            })
            .addCase(sendOTP.pending, (state) => {
                //console.log("pending otp ");
                state.isLoading = true
            })
            .addCase(sendOTP.fulfilled, (state, action) => {
                //console.log("otp received");
                state.isLoading = false
                state.otp = action.payload.otp;
            })
            .addCase(sendOTP.rejected, (state, action) => {
                //console.log("rejected otp");
            })
            .addCase(registerCounsellor.pending, (state) => {
                //console.log("Register Counsellor Pending ");
                state.isLoading = true;
            })
            .addCase(registerCounsellor.fulfilled, (state, action) => {
                //console.log("Register Counsellor fulfilled");
                state.isLoading = false;
            })
            .addCase(registerCounsellor.rejected, (state, action) => {
                //console.log("Register Counsellor Rejected");
                state.isLoading = false;
            })
            .addCase(sendVerificationEmail.pending, (state) => {
                //console.log("Verification Email Pending")
                state.isLoading = true;
            })
            .addCase(sendVerificationEmail.fulfilled, (state, action) => {
                //console.log("Verification Email Fulffilled")
                state.isLoading = false;
            })
            .addCase(sendVerificationEmail.rejected, (state, action) => {
                //console.log("Verification Email Rejected")
                state.isLoading = false;
            })
        }
})

export const{handleChange, handleSubmit, setCount, ErrorMsg,
    resetCount, handleModelChange, addWorkingExperience,
    removeWorkingExperience, updateWorkingExperience, openOTPModal} = offerCounsellingSlice.actions
export default offerCounsellingSlice.reducer