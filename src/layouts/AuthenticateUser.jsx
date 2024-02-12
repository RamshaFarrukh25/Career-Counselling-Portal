import {useDispatch, useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
import { authenticate, setLoading } from "../features/authentication/authenticationSlice"
import React from "react"

export default function AuthenticateUser(){
    const dispatch = useDispatch()
    const {is_exist, role, isLoading} = useSelector((store) => store.authentication)
   
    React.useEffect(() => {
        async function fetchAuthentication() {
            await dispatch(authenticate())
            dispatch(setLoading())
        }
        fetchAuthentication()
    }, [])

    if(isLoading) {
        return <div>Loading....</div>
    }

    if(!is_exist){
        return <Navigate to="login" />
    }

    return <Outlet />
}