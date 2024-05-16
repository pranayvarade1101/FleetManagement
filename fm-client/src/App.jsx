import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PageHome from './myComponents/home/PageHome/PageHome';
import BusHome from './myComponents/home/BusHome/BusHome';
import AboutUs from './myComponents/about/AboutUs';
import AdminPage from './myComponents/admin/admin';
import ManageCustomer from './myComponents/admin/admin-functions/ManageCustomer';
import ManageDriver from './myComponents/admin/admin-functions/ManageDriver';
import ManageVehicles from './myComponents/admin/admin-functions/ManageVehicles';
import ManageRoutes from './myComponents/admin/admin-functions/ManageRoutes';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PageHome/>} />
        <Route path='/home' element={<BusHome/>} />
        <Route path='/about-us' element={<AboutUs/>} />
        <Route path='/admin' element={<AdminPage/>} />
        <Route path='/manage-customer' element={<ManageCustomer/>} />
        <Route path='/manage-driver' element={<ManageDriver/>} />
        <Route path='/manage-vehicles' element={<ManageVehicles/>} />
        <Route path='/manage-routes' element={<ManageRoutes/>} />
      </Routes>
    </Router>
  );
}

export default App;