import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ManageDashboard from './Pages/ManageDashboard';
import { Button } from "flowbite-react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <BrowserRouter>
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Dashboard searchTerm={searchTerm} />} />
          <Route path="/manage" element={<ManageDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;