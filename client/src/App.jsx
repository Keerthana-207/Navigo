import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import PlanTrip from './pages/dashboard/PlanTripPage'
import BudgetPage from './pages/dashboard/BudgetPage'
import Budget from './pages/dashboard/Budget'


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/plan-trip' element={<PlanTrip />} />
      <Route path='/budget' element={<Budget />} />
    </Routes>
    </>
  )
}

export default App
