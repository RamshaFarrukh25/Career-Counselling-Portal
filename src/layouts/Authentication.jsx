import {useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"


export default function Authentication(){
    const {isLogin} = useSelector((store) => store.login)
    
    console.log(isLogin)

    if(!isLogin){
        return <Navigate to="login" />
    }
    return <Outlet />
}