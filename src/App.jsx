import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./assets/styles/Global.module.css"

// Import Pages
import Hero from './pages/Hero'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
