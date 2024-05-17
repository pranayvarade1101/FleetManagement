import React, { useState, useEffect } from 'react';
import "./admin-functions.css"
import axios from 'axios';

function ManageDriver() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    fname: '',
    lname: '',
    email: '',
    pwd: '',
    addr: '',
    did: '',
    phNo: '',
    salary: '',
    vid: '',
    type: 'driver' });
  const [showForm, setShowForm] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    axios.get('http://localhost:8080/api/Users')
      .then(response => {
        const parsedData = response.data.map(user => ({ ...user }));
        setUsers(parsedData.filter(user => user.type === 'driver'));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const nextDid = parseInt(users.reduce((max, user) => user.did > max ? user.did : max, 0)) + 1;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      try {
        const response = await axios.post('http://localhost:8080/api/Users', {
          ...newUser,
          address: newUser.addr,
          did: nextDid ,
          email: newUser.email,
          password: newUser.pwd,
          phNo: Number(newUser.phNo) ,
          salary: Number(newUser.salary) ,
          name: newUser.fname + ' ' + newUser.lname,
          vid: newUser.vid,
          type: 'driver'
        });
        setUsers(prevUsers => [...prevUsers, response.data]);
        setNewUser({
          fname: '',
          lname: '',
          email: '',
          pwd: '',
          addr: '',
          did: '',
          phNo: '',
          salary: '',
          vid: '',
          type: 'driver'
        });
        toggleForm();
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

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/Users/${userId}`);
      const updatedUsers = (prevUsers => prevUsers.filter(user => user._id !== userId));
      setUsers(updatedUsers);

      // Check if the current page is empty after deletion
      const currentPageIsEmpty = updatedUsers
        .length < (currentPage - 1) * usersPerPage + usersPerPage;
      
      if (currentPageIsEmpty && currentPage > 1) {
        // Go back to the previous page if the current page is empty
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className='main-container'>
      <div className="container left">
        <h1>DRIVERS</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Salary</th>
              <th>Vehicle ID</th>
            </tr>
          </thead>
          <tbody>
            {users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
            .sort((a, b) => a.did - b.did)
            .map((user) => (
              <tr key={user._id}>
                <td>{user.did}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>{user.phNo}</td>
                <td>{user.salary}</td>
                <td>{user.vid}</td>
                <td className='delete'>
                  <button className='delete-icon' onClick={() => handleDeleteUser(user._id)}>&#10006;</button>
                </td>
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
        <div className='form-toggle'>
          <button className='form-toggle-btn' onClick={toggleForm}>Add New Driver</button>
        </div>
      </div>
      { showForm && <div className="container right">
        <form onSubmit={handleSubmit} noValidate>
          <h3>Add New Driver</h3>
          <div className="form-line">
            <input type='text' placeholder='First Name' name='fname' value={newUser.fname} onChange={handleInputChange} required />
            <input type='text' placeholder='Last Name' name='lname' value={newUser.lname} onChange={handleInputChange} required />
          </div>
          <div className="form-line">
            <input type="tel" placeholder='Phone Number' name='phNo' pattern="[0-9]{10}" value={newUser.phNo} onChange={handleInputChange} required />
            <input type="text" placeholder='Address' name='addr' value={newUser.addr} onChange={handleInputChange} required />
          </div>
          <div className="form-line">
            <input type="email" placeholder='Email' name='email' value={newUser.email} onChange={handleInputChange} required />
            <input type="password" placeholder='Password' name='pwd' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number, one lowercase and one uppercase letter, and at least 8 characters" value={newUser.pwd} onChange={handleInputChange} required onFocus={() => setShowPasswordRules(true)} onBlur={handlePasswordBlur} />
          </div>
          <div className="form-line">
            {showPasswordRules && (
              <div className="pwd-rules">
                <p>Must contain at least one number</p>
                <p>Must contain at least one lowercase letter.</p>
                <p>Must contain at least one uppercase letter.</p>
                <p>Must be at least 8 characters long.</p>
              </div>
            )}
          </div>
          <div className="form-line">
            <input type="number" placeholder='Salary' name='salary' value={newUser.salary} onChange={handleInputChange} required />
            <input type="text" placeholder='Vehicle ID' name='vid'
              pattern="([A-Z]{2}[ ][0-9]{1,2}[ ][A-Z]{1,2}[ ][0-9]{1,4}|[F]-[0-9]{3})"
              value={newUser.vid} onChange={handleInputChange} required />
          </div>
          <div className="form-line-2">
            <label name="did">Driver ID:</label>
            <input type="text" placeholder={nextDid} name='did' value={nextDid} onChange={handleInputChange} readOnly required />
          </div>
          <button type="submit" disabled={!formIsValid}><span>Add Driver</span></button>
        </form>
      </div> }
    </div>
  );
}

export default ManageDriver;