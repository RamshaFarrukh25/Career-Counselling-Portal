import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./assets/styles/Global.module.css"

// Import Pages
//import Hero from './pages/Hero'
import BlogCards from './pages/BlogCards'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BlogCards/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
