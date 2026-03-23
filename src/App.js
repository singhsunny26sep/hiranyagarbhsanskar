import React, { useEffect } from 'react'
import Dashboard from './pages/Dashboard';
import Prenatal from './pages/Prenatal';
import Nutrition from './pages/Nutrition';
import Wellness from './pages/Wellness';
import Profile from './pages/Profile';
import Product from './pages/Product';
import Download from './pages/Download';
import Gallery from './pages/Gallery';
import VideoLectures from './pages/VideoLectures';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DataDeletion from './pages/DataDeletion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
<>
<BrowserRouter>
  <ScrollToTop />
<Routes>
   <Route path='/' element={<Dashboard/>}/>
   <Route path='/prenatal' element={<Prenatal/>}/>
   <Route path='/nutrition' element={<Nutrition/>}/>
   <Route path='/wellness' element={<Wellness/>}/>
   <Route path='/profile' element={<Login/>}/>
   <Route path='/product' element={<Product/>}/>
   <Route path='/contact' element={<Contact/>}/>
   <Route path='/download' element={<Download/>}/>
   <Route path='/gallery' element={<Gallery/>}/>
   <Route path='/video-lectures' element={<VideoLectures/>}/>
   <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
   <Route path='/data-deletion' element={<DataDeletion/>}/>
   <Route path='*' element={<NotFound/>}/>
 </Routes>
</BrowserRouter>
</>
  )
}
