import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Aboutus from './pages/Aboutus';
import Signin from './pages/signin';
import Profile from './pages/profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/about-us' element={<Aboutus />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route element={<PrivateRoute />}>
          < Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}
