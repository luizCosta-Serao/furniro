import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Routes>

        </Routes>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
