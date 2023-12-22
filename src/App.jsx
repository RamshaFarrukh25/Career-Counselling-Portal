import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./assets/styles/Global.module.css"

import Signup from "./pages/Signup"
import SignupSuccess from './pages/SignupSuccess'
import Login from "./pages/Login"
import Layout from './layouts/Layout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import BlogDetail from "./pages/BlogDetail"



export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>} > 
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="signupSuccess" element={<SignupSuccess />} />
           </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="blogDetail" element={<BlogDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
