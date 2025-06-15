// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MemberList from './pages/MemberList';
import MainLayout from './layout/MainLayout';
import AllMembers from './pages/AllMembers';
import ExpiredMembers from './pages/ExpiredMembers';
import Payment from './components/Payment'


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/list" element={<MemberList />} />
          <Route path='/all-members' element={<AllMembers />} />
          <Route path='/ex-members' element={<ExpiredMembers />} />
          <Route path='/pay' element={<Payment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
