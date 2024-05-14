
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminPage from './admin';
import ManageCustomer from './admin-functions/ManageCustomer';
import ManageDriver from './admin-functions/ManageDriver';
import ManageVehicles from './admin-functions/ManageVehicles';
import Feedbacks from './admin-functions/Feedbacks';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/admin' element={<AdminPage/>} />
        <Route path='/manage-customer' element={<ManageCustomer/>} />
        <Route path='/manage-driver' element={<ManageDriver/>} />
        <Route path='/manage-vehicles' element={<ManageVehicles/>} />
        <Route path='/feedbacks' element={<Feedbacks/>} />
      </Routes>

    </Router>
  );
}

export default App;