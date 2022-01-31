import React, { useState, useEffect } from 'react'
import './scss/App.scss'

// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import Header from './components/Header'
import BookingSection from './components/BookingSection'
import Benefits from './components/Benefits'
import TopRoutes from './components/TopRoutes'
import International from './components/International'
import Why from './components/Why'
import Rates from './components/Rates'
import Footer from './components/Footer'
import 'react-loading-skeleton/dist/skeleton.css'
// Pages
import CabsScreen from './components/CabsScreen'
import DashboardScreen from './components/DashboardScreen'
import Login from './components/login'
import LoginPage from './components/LoginPage'
import SignUp from './components/SignUp'
import ChangePassword from './components/ChangePassword'
import Aboutus from './components/Aboutus'
import LocalSight from './components/LocalSight'
import Checkout from './components/Checkout'
import { jssPreset } from '@material-ui/core'
import Destination from './Pages/Destinations/destination'
import SightSeeing from './Pages/SightSeeing/SightSeeing'

function App() {
  const [token, setToken] = useState('')

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <>
                <BookingSection />
                <Benefits />
                <TopRoutes />
                <International />
                <Why />
                <Rates />
                <Footer />
              </>
            }
          ></Route>
          <Route path='/aboutus' element={<Aboutus />}></Route>
          <Route path='/cabs' element={<CabsScreen />}></Route>
          <Route path='/local-sight-seeing/:package' element={<LocalSight />}></Route>
          <Route path='/changepsd' element={<ChangePassword />}></Route>

          <Route path='/dashboard/*' element={<DashboardScreen />}></Route>

          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/activities' element={<Destination />}></Route>
          <Route
            path='/sights/:location'
            element={<SightSeeing />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App