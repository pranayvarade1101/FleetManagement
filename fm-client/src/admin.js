import React from 'react';
import { Link } from 'react-router-dom';

import "./admin.css"

function AdminButton({ to, children }) {
  return (
    <button className="btn">
      <Link to={to}>{children}</Link>
    </button>
  );
}

function AdminPage() {
  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <div className="btn-container">
        <AdminButton to="/manage-customer">Manage Customer</AdminButton>
        <AdminButton to="/manage-driver">Manage Drivers</AdminButton>
        <AdminButton to="/manage-vehicles">Manage Vehicles</AdminButton>
        <AdminButton to="/feedbacks">Feedback</AdminButton>
      </div>
    </div>
  );
}

export default AdminPage;