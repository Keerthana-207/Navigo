import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import PlanTrip from './pages/dashboard/PlanTripPage'
import BudgetPage from './pages/dashboard/BudgetPage'
import Budget from './pages/dashboard/Budget'
import CreateAccount from './pages/dashboard/Register'
import Login from './pages/dashboard/NavigoLogin'
import LandingPage from './pages/public/LandingPage'


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
    </Routes>
    </>
  )
}

export default App
