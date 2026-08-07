import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import PlanTrip from './pages/dashboard/PlanTripPage'


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/plan-trip' element={<PlanTrip />} />
    </Routes>
    </>
  )
}

export default App
