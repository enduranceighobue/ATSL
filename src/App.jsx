import { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home'
import ContactUs from '../src/pages/ContactUs';
import Service from '../src/pages/Service';
import ProductDetail from './pages/ProductDetail';
import Careers from './pages/Careers';
import WhatsAppFloat from './components/WhatsAppFloat';
import './App.css'

function ScrollManager() {
  const location = useLocation();
  const { hash, key } = location;

  useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (!hash) {
        window.scrollTo(0, 0);
        return;
      }

      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo(0, 0);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash, key]);

  return null;
}

function App() {

  return (
    <>
      <ScrollManager />
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
