import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loginForm: {
        email: "",
        password: ""
    }
}

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
        handleSubmit: (state) => {
            console.log(state.loginForm)
        }
    }
})


export const{handleChange, handleSubmit} = loginSlice.actions
export default loginSlice.reducer