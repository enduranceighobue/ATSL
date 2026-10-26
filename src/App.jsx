import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import ContactUs from '../src/pages/ContactUs';
import Service from '../src/pages/Service';
import ProductDetail from './pages/ProductDetail';
import Careers from './pages/Careers';
import WhatsAppFloat from './components/WhatsAppFloat';
import './App.css'

function App() {

  return (
    <>
      {/* <Nav /> */}
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/contactUs" element={<ContactUs />} />
  <Route path="/service" element={<Service/>} />
  <Route path="/careers" element={<Careers />} />
  <Route path="/innvista" element={<ProductDetail slug="innvista" />} />
  <Route path="/ploginn" element={<ProductDetail slug="ploginn" />} />
  <Route path="/stafpay" element={<ProductDetail slug="stafpay" />} />

</Routes>
      <WhatsAppFloat />
    </>
  )
}

export default App
