import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Route, Routes} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/NotFoundPage'
import EpicyclePage from './pages/EpicyclePage'

function App() {
 return(
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/epicycle" element={<EpicyclePage/>}/>
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
 )
}

export default App
