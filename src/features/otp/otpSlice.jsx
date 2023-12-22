import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    seconds: 59,
    otp: ['', '', '', ''],
    validate: null
}

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
        validateOTP : (state) => {
            state.validate = true
            //In case validation is true
        },
        clearForm: (state) => {
            state.seconds = 59,
            state.otp = ['', '', '', ''],
            state.validate = null
        }
    }
})


export const{ decrementSeconds, handleChange, validateOTP, clearForm } = otpSlice.actions
export default otpSlice.reducer