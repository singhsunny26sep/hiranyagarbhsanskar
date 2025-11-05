import React from 'react'
import Dashboard from './pages/Dashboard';
import Prenatal from './pages/Prenatal';
import Nutrition from './pages/Nutrition';
import Wellness from './pages/Wellness';
import Profile from './pages/Profile';
import Product from './pages/Product';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
<>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Dashboard/>}/>
  <Route path='/prenatal' element={<Prenatal/>}/>
  <Route path='/nutrition' element={<Nutrition/>}/>
  <Route path='/wellness' element={<Wellness/>}/>
  <Route path='/profile' element={<Profile/>}/>
  <Route path='/product' element={<Product/>}/>
</Routes>
</BrowserRouter>
</>
  )
}
