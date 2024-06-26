// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/login/Login';
import Home from './pages/Home'
const App = () => {
  return (
  
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={localStorage.getItem('userId') ? <Home /> : <Navigate to="/" />} />
        </Routes>
      </Router>
  );
};

export default App;
