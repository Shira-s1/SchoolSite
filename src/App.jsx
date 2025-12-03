import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import About from './pages/About/About'
import Bookstore from './pages/Bookstore/Bookstore'
import Activities from './pages/Activities/Activities'
import Contact from './pages/Contact/Contact'
import CartPage from './pages/Cart/CartPage'

export default function App(){
  return (
    <div>
      <header className="header">
        <div className="container">
          <NavBar />
        </div>
      </header>
      <main className="container" style={{paddingTop:20}}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/bookstore/*" element={<Bookstore />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  )
}
