import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import ContactUs from '../src/pages/ContactUs';
import Service from '../src/pages/Service';
import Innvista from './innvista/Innvista';
import './App.css'

function App() {

  return (
    <>
      {/* <Nav /> */}
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/contactUs" element={<ContactUs />} />
  <Route path="/service" element={<Service/>} />
  <Route path="/innvista" element={<Innvista />} />

</Routes>
    </>
  )
}

export default App
