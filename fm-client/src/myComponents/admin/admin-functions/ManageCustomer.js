import React, { useState, useEffect } from 'react';
import "./admin-functions.css"
import axios from 'axios';

function ManageCustomer() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    fname: '',
    lname: '',
    email: '',
    pwd: '',
    phNo: '',
    addr: '',
    cid: '',
    type: 'customer' });
  const [formIsValid, setFormIsValid] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    axios.get('http://localhost:8080/api/Users')
      .then(response => {
        const parsedData = response.data.map(user => ({ ...user }));
        setUsers(parsedData.filter(user => user.type === 'customer'));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const nextCid = parseInt(users.reduce((max, user) => user.cid > max ? user.cid : max, 0)) + 1;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      try {
        const response = await axios.post('http://localhost:8080/api/Users', {
          ...newUser,
          address: newUser.addr,
          cid: nextCid ,
          email: newUser.email,
          name: newUser.fname + ' ' + newUser.lname,
          password: newUser.pwd,
          phNo: newUser.phNo ,
          type: 'customer'
        });
        setUsers(prevUsers => [...prevUsers, response.data]);
        setNewUser({
          fname: '',
          lname: '',
          email: '',
          pwd: '',
          phNo: '',
          addr: '',
          cid: nextCid,
          type: 'customer'
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
    setFormIsValid(event.target.form.checkValidity());
  };

  const handlePasswordBlur = () => {
    setShowPasswordRules(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='main-container'>
      <div class="container left">
      <h1>CUSTOMERS</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage).map((user) => (
              <tr key={user._id}>
                <td>{user.cid}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>{user.phNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            &lt;
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>
      </div>
      <div class="container right">
        <form onSubmit={handleSubmit} noValidate>
          <h3>Add New Customer</h3>
          <div class="form-line">
            <input type='text' placeholder='First Name' name='fname' value={newUser.fname} onChange={handleInputChange} required />
            <input type='text' placeholder='Last Name' name='lname' value={newUser.lname} onChange={handleInputChange} required />
          </div>
          <div class="form-line">
            <input type="tel" placeholder='Phone Number' name='phNo' pattern="[0-9]{10}" value={newUser.phNo} onChange={handleInputChange} required />
            <input type="text" placeholder='Address' name='addr' value={newUser.addr} onChange={handleInputChange} required />
          </div>
          <div class="form-line">
            <input type="email" placeholder='Email' name='email' value={newUser.email} onChange={handleInputChange} required />
            <input type="password" placeholder='Password' name='pwd' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number, one lowercase and one uppercase letter, and at least 8 characters" value={newUser.pwd} onChange={handleInputChange} required onFocus={() => setShowPasswordRules(true)} onBlur={handlePasswordBlur} />
          </div>
          <div class="form-line">
            {showPasswordRules && (
              <p className="pwd-rules">Must contain at least one number, one lowercase and one uppercase letter, and be at least 8 characters long.</p>
            )}
          </div>
          <div class="form-line-2">
            <label name="cid">Customer ID:</label>
            <input type="text" placeholder={nextCid} name='cid' value={nextCid} onChange={handleInputChange} readOnly required />
          </div>
          <button type="submit" disabled={!formIsValid}><span>Add Customer</span></button>
        </form>
      </div>
    </div>
  );
}

export default ManageCustomer;