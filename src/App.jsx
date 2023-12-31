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
import AdminLayout from './dashboards/admin/layouts/Layout'
import  DashBoard  from './dashboards/admin/pages/Index'
import  ApproveBlogs  from './dashboards/admin/pages/ApproveBlogs'
import ApproveCounsellors  from './dashboards/admin/pages/ApproveCounsellors'
import Profile  from './dashboards/admin/pages/Profile'
import UserReport from './dashboards/admin/pages/UserReport'
import ApproveReviews from './dashboards/admin/pages/ApproveReviews'



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

          
          {/* Admin DashBoard Routing  */}
          <Route path='/admin' element={<AdminLayout/>}>
           <Route path="dashboard" element={<DashBoard/>} />
           <Route path="approveCounsellors" element={<ApproveCounsellors/>} />
           <Route path="approveBlogs" element={<ApproveBlogs/>} />
           <Route path="profile" element={<Profile/>} />
           <Route path="userReport" element={<UserReport/>}></Route>
           <Route path="approveReviews" element={<ApproveReviews/>}/>
           
           </Route>

        </Routes>
      
      </BrowserRouter>
    </>
  )
}
