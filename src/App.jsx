import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./assets/styles/Global.module.css"

import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Layout from './layouts/Layout'
import Home from "./pages/Home"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>} > 
            <Route index element={<Home />}/>
            
           </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
