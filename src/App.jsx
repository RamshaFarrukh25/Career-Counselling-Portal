import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./assets/styles/Global.module.css"
import Signup from "./pages/Signup"
import SignupSuccess from './pages/SignupSuccess'
import Login from "./pages/Login"
import BlogDetail from './pages/BlogDetail'
import AskCounsellor from './pages/AskCounsellor'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import OfferCounselling from "./pages/OfferCounselling"
import CareerGPT from './pages/CareerGPT/CareerGPT'
import AuthenticateUser from './layouts/AuthenticateUser'
import AuthenticateCounsellor from './layouts/AuthenticateCounsellor'
import AuthenticateAdmin from './layouts/AuthenticateAdmin'
import Chat from './pages/Chat'
//Admin Dashboard
import AdminLayout from './dashboards/admin/layouts/Layout'
import  DashBoard  from './dashboards/admin/pages/Index'
import  ApproveBlogs  from './dashboards/admin/pages/ApproveBlogs'
import ApproveCounsellors  from './dashboards/admin/pages/ApproveCounsellors'
import AdminProfile  from './dashboards/admin/pages/Profile'
import UserReport from './dashboards/admin/pages/UserReport'
import CounsellorsReport from "./dashboards/admin/pages/CounsellorReport"
import ApproveReviews from './dashboards/admin/pages/ApproveReviews'
//Counsellor Dashboard
import Counsellor from './dashboards/counsellor/Counsellor'
import Dashboard from './dashboards/counsellor/Dashboard'
import CounsellorProfile from './dashboards/counsellor/Profile'
import AddBlog from './dashboards/counsellor/AddBlog'
import ShowBlogs from './dashboards/counsellor/ShowBlogs'
import Settings from './dashboards/counsellor/Settings'
import CounsellorChat from './dashboards/counsellor/CounsellorChat'



export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>} > 
            <Route index element={<Home />} />
            <Route path=":id" element={<BlogDetail />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="signupSuccess" element={<SignupSuccess />} />
            <Route path="OfferCounselling" element={<OfferCounselling />} />
            <Route path="askCounsellor" element={<AskCounsellor/>}/>
            <Route path="chat" element = {<Chat/>}/>

            <Route element={<AuthenticateUser />} >
              <Route path="careerGPT" element={<CareerGPT />} />
            </Route>

            <Route path="login" element={<Login />} />  
            <Route path="signup" element={<Signup />} />
            <Route path="blogDetail" element={<BlogDetail />} />
          </Route>

          {/* Admin DashBoard Routing  */}
          <Route element={<AuthenticateAdmin />}>
            <Route path="admin" element={<AdminLayout/>}>
            <Route path="dashboard" element={<DashBoard/>} />
            <Route path="approveCounsellors" element={<ApproveCounsellors/>} />
            <Route path="approveBlogs" element={<ApproveBlogs/>} />
            <Route path="profile" element={<AdminProfile/>} />
            <Route path="userReport" element={<UserReport/>}></Route>
            <Route path="counsellorsReport" element={<CounsellorsReport/>}></Route>
            <Route path="approveReviews" element={<ApproveReviews/>}/>
            </Route>
          </Route>

          {/* Counsellor DashBoard Routing  */}
          <Route element={<AuthenticateCounsellor />}>
            <Route path="counsellor" element={<Counsellor />}>
              <Route index element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<CounsellorProfile />} />
              <Route path="addBlog" element={<AddBlog />} />
              <Route path="addBlog/:id" element={<AddBlog />} />
              <Route path="showBlogs" element={<ShowBlogs />}/>
              <Route path="showBlogs/:id" element={<BlogDetail />}/>
              <Route path='counsellorChat' element= {< CounsellorChat/>}/>
            </Route>
          </Route>
        </Routes>  
      </BrowserRouter>
    </>
  )
}
