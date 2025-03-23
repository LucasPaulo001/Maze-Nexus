import './App.css'
import Login from './pages/login_register/login/Login'
import Register from './pages/login_register/register/Register'
import Home from './pages/home/Home'
import Auth from './pages/auth/Auth'
import Navbar from './components/navbar/Navbar'
import About from './pages/about/About'
import NotFound from './components/not_found/NotFound'
import Footer from './components/footer/Footer'

//Config react router
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/verify/:token' element={<Auth />} />
          <Route path='/login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
