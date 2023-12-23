import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./assets/styles/Global.module.css"

import Hero from './pages/Hero'
import Header from './layouts/Header'
import Signup from "./pages/Signup"
import SignupSuccess from './pages/SignupSuccess'
import Login from "./pages/Login"
import BlogCards from './pages/BlogCards'
import BlogDetail from './pages/BlogDetail'
import AskCounsellor from './pages/AskCounsellor'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import OfferCounselling from "./pages/OfferCounselling"


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
          <Route path="/askCounsellor" element={<AskCounsellor/>}/>
           

          <Route path="/" element={<Layout/>} > 
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="signupSuccess" element={<SignupSuccess />} />
           </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="blogDetail" element={<BlogDetail />} />
          <Route path="OfferCounselling" element={<OfferCounselling />} />
          <Route path="askCounsellor" element={<AskCounsellor/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
