import React from 'react';
import Header from './Components/Header';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ManageDashboard from './Pages/ManageDashboard';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage" element={<ManageDashboard />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;