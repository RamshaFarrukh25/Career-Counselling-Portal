import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
axios.defaults.withCredentials = true;

const initialState = {
    user_id: null,
    email: null,
    role: null,
    is_exist: null,
    isLoading: true
}

export const authenticate = createAsyncThunk('authenticate/getSessionData', async() => {
    try{
        const response = await axios.get("http://127.0.0.1:8000/getSessionData")
        return response.data
    } catch(error){
        throw error
    }
})

export const logout = createAsyncThunk('authenticate/deleteSessionData', async() => {
    try{
        const response = await axios.get("http://127.0.0.1:8000/deleteSessionData")
        return response.data
    } catch(error){
        throw error
    }
})

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticate.pending, (state) => {
                //console.log("authenticate pending")
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                //console.log("authenticate fulfilled")
                state.user_id = action.payload.user_id
                state.email = action.payload.email
                state.is_exist = action.payload.is_exist
                state.role = action.payload.role
                //console.log("user_id: ", state.user_id)
                //console.log("Email: ", state.email)
                //console.log("is_exist: ", state.is_exist)
            })
            .addCase(authenticate.rejected, (state, action) => {
                //console.log("authenticate rejected")
            })
            .addCase(logout.pending, (state) => {
                //console.log("logout pending")
            })
            .addCase(logout.fulfilled, (state, action) => {
                //console.log("logout fulfilled")
                state.user_id = null
                state.email = null
                state.role = null
                state.is_exist = null
            })
            .addCase(logout.rejected, (state, action) => {
                //console.log("logout rejected")
            })
    }
})


export const { setLoading } = authenticationSlice.actions
export default authenticationSlice.reducer