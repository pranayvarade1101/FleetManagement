import React from 'react';
import { Link } from 'react-router-dom';

import "./admin.css"

function AdminPage() {
  return (
    <div className="admin-page">
      <div className="heading">
        <h1>ADMIN DASHBOARD</h1>
      </div>
      <div className="btn-container">
        <div className='btn-row'>
          <Link className='btn' to="/manage-customer">Manage Customers</Link>
          <Link className='btn' to="/manage-driver">Manage Drivers</Link>
        </div>
        <div className='btn-row'>
          <Link className='btn' to="/manage-vehicles">Manage Vehicles</Link>
          <Link className='btn' to="/feedbacks">Feedback</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;