import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
  settings: {
    name: "",
    profilePic: "",
    email: "",
    phoneNo:"",
    password: "",
    confirmPassword: "",
  },
  passwordMatch: "",
  isLoading: null
}

export const getCounsellorSettings = createAsyncThunk('settingsSlice/getCounsellorSettings', async() => {
    try{
        const response = await axios.get("http://127.0.0.1:8000/getCounsellorSettings")
        return response.data
    } catch (error) {
        throw error
    }
})

export const updateCounsellorSettings = createAsyncThunk('settingsSlice/updateCounsellorSettings', async(data) => {
    try{
        const response = await axios.post(
            'http://127.0.0.1:8000/updateCounsellorSettings',
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
    }   
})

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      state.settings = {
        ...state.settings,
        [payload.name]: payload.value
      }
    },
    clearForm: (state) => {
      state.settings = {         
        password: "",
        confirmPassword: "",
      } 
      state.passwordMatch= ""
      state.isLoading = null
    },
    matchPasswords: (state) => {
      if(state.settings.password !== state.settings.confirmPassword){
        state.passwordMatch = "passwordError"
      } else {
        state.passwordMatch = "passwordMatch"
      }
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(getCounsellorSettings.pending, (state) => {
            //console.log("getCounsellorSettings pending")
        })
        .addCase(getCounsellorSettings.fulfilled, (state, action) => {
            //console.log("getCounsellorSettings fulfilled")
            state.settings.name = action.payload.counsellorData.name
            state.settings.profilePic = action.payload.counsellorData.profile_pic
            state.settings.email = action.payload.counsellorData.email
            state.settings.phoneNo = action.payload.counsellorData.phone_no
        })
        .addCase(getCounsellorSettings.rejected, (state, action) => {
            //console.log("getCounsellorSettings rejected")
        })
        .addCase(updateCounsellorSettings.pending, (state) => {
            //console.log("updateCounsellorSettings pending")
            state.isLoading = true 
        })
        .addCase(updateCounsellorSettings.fulfilled, (state, action) => {
            //console.log("updateCounsellorSettings fulfilled")
            state.isLoading = false
        })
        .addCase(updateCounsellorSettings.rejected, (state, action) => {
            //console.log("updateCounsellorSettings rejected")
        })
  }
})

export const { handleChange, clearForm, matchPasswords } = settingsSlice.actions
export default settingsSlice.reducer
