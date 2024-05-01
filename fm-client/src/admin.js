import React from 'react';

import "./admin.css"

function AdminPage() {
  return (
    <div className="admin-page">
        <h1>Admin Dashboard</h1>
            <div className="btn-container">
                <button className="btn">
                    <a href='/manage-customer'>
                        Manage Customer
                    </a>
                </button>
                <button className="btn">
                    <a href='/manage-driver'>
                        Manage Driver
                    </a>
                </button>
                <button className="btn">
                    <a href='/manage-vehicles'>
                        Manage Vehicles
                    </a>
                </button>
                <button className="btn">
                    <a href='/feedbacks'>
                        Feedbacks
                    </a>
                </button>
            </div>
        </div>
    );
}

export default AdminPage;