import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Login from './pages/login_register/login/Login'
import Register from './pages/login_register/register/Register'
import Home from './pages/home/Home'
import Auth from './pages/auth/Auth'
import Navbar from './components/navbar/Navbar'
import About from './pages/about/About'
import NotFound from './components/not_found/NotFound'
import Footer from './components/footer/Footer'
import PrivateRoute from './routes/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'
import { PostProvider } from './contexts/PostsContext'
import Profile from './pages/profile/Profile'
import { ProfileProvider } from './contexts/ProfileContext'

//Config react router
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'


function App() {

  return (
    <>
    <AuthProvider>
      <PostProvider>
        <ProfileProvider>
          <ThemeProvider>
            <BrowserRouter>
                <Navbar />
                <div className='containerBody'>
                  <Routes>
                    <Route path='/verify/:token' element={<Auth />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/Register' element={<Register />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/profile/:userId' element={<Profile />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path='/'
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    } />
                  </Routes>
                </div>
                <Footer />
            </BrowserRouter>
          </ThemeProvider>
        </ProfileProvider>
      </PostProvider>
    </AuthProvider>
    </>
  )
}

export default App
