import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./assets/styles/Global.module.css"

import Hero from './pages/Hero'
import Header from './layouts/Header'
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import BlogCards from './pages/BlogCards'
import BlogDetail from './pages/BlogDetail'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header/>} /> 
          <Route path="/hero" element={<Hero/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogCards" element={<BlogCards/>}/>
          <Route path="/blogDetail" element={<BlogDetail/>}/>
           
        </Routes>
      </BrowserRouter>
    </>
  )
}
