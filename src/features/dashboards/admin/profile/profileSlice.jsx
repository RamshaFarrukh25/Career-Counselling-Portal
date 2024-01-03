import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  profileForm: {
    name: "Admin",
    email: "Admin@gmail.com",
    password: "",
    confirmPassword: "",
  },
  passwordMatch: ""
}

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
    handleSubmit: (state) => {
      if(state.passwordMatch == "passwordError"){
        return
      }
      console.log(state.profileForm.email)
    },
    clearForm: (state) => {
      if(state.passwordMatch == "passwordMatch"){
        state.profileForm = {
          name: "Admin",
          email: "Admin@gmail.com",
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
  }
})

export const { handleChange, handleSubmit, clearForm, matchPasswords } = ProfileSlice.actions
export default ProfileSlice.reducer
