import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./assets/styles/Global.module.css"

// Import Pages
import Hero from './pages/Hero'
import Header from './layouts/Header'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header/>} /> 
          <Route path="/hero" element={<Hero/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
