import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  signupForm: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  passwordMatch: "",
  isSignup: false
}

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
      if(state.signupForm.password !== state.signupForm.confirmPassword){
        state.passwordMatch = "passwordError"
      } else {
        state.passwordMatch = "passwordMatch"
      }
    },
    handleSignup: (state) => {
      if(state.passwordMatch !== "passwordMatch"){
        state.isSignup = false
        return
      }else {
        state.isSignup = true
      }
    },
    clearForm: (state) => {
      state.signupForm = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }
      state.passwordMatch = ""
      state.isSignup = false
    }
  }
})

export const { handleChange, matchPasswords, handleSignup, clearForm } = signupSlice.actions
export default signupSlice.reducer
