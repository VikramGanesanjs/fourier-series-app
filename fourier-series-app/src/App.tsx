import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Route, Routes} from 'react-router-dom'
import './App.css'
import ExplanationPage from './pages/ExplanationPage'
import ErrorPage from './pages/NotFoundPage'
import EpicyclePage from './pages/EpicyclePage'

function App() {
 return(
    <Routes>
      <Route path="/" element={<EpicyclePage/>} />
      <Route path="/about" element={<ExplanationPage/>}/>
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
 )
}

export default App
