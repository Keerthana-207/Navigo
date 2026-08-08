import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import PlanTrip from './pages/dashboard/PlanTripPage'
import Budget from './pages/dashboard/Budget'
import CreateAccount from './pages/dashboard/Register'
import Login from './pages/dashboard/NavigoLogin'
import LandingPage from './pages/public/LandingPage'
import ItineraryPlanner from './pages/dashboard/Itinerary'
import MyTrips from './pages/dashboard/MyTrips'
import Profile from './pages/dashboard/Profile'
import PackingChecklist from './pages/dashboard/PackingChecklist'
import Weather from './pages/dashboard/Weather'



function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/plan-trip' element={<PlanTrip />} />
      <Route path='/budget' element={<Budget />} />
      <Route path='/register' element={<CreateAccount />} />
      <Route path='/login' element={<Login />} />
      <Route path="/itinerary/:tripId" element={<ItineraryPlanner />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/packing-list' element={<PackingChecklist />} />
      <Route path='/my-trips' element={<MyTrips />} />
      <Route path='/weather' element={<Weather />} />
    </Routes>
    </>
  )
}

export default App
