import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notificationData:[]
}

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers:{
        setNotificationData:(state, {payload})=>{
            state.notificationData = payload.data;
        },
    },
})

export default headerSlice.reducer
export const {setNotificationData} = headerSlice.actions