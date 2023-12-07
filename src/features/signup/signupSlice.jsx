import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  signupForm: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  passwordMatch: ""
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
    handleSubmit: (state) => {
      if(state.passwordMatch == "passwordError"){
        return
      }
      console.log(state.signupForm.email)
    },
    clearForm: (state) => {
      if(state.passwordMatch == "passwordMatch"){
        state.signupForm = {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        } 
      }  
    },
    matchPasswords: (state) => {
      if(state.signupForm.password !== state.signupForm.confirmPassword){
        state.passwordMatch = "passwordError"
      } else {
        state.passwordMatch = "passwordMatch"
      }
    }
  }
})

export const { handleChange, handleSubmit, clearForm, matchPasswords } = signupSlice.actions
export default signupSlice.reducer
