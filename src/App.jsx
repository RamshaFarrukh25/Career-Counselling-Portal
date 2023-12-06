import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./assets/styles/Global.module.css"


import BlogCards from './pages/BlogCards'
import Hero from './pages/Hero'
import Header from './layouts/Header'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header/>} /> 
          <Route path="/hero" element={<Hero/>}/>
           <Route path="/blogCards" element={<BlogCards/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
