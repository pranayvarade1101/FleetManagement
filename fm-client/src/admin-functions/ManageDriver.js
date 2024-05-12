import React, { useState, useEffect } from 'react';
import "./admin-functions.css"
import axios from 'axios';


function ManageCustomer() {

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ fname: '', lname: '', email: '', pwd: '' });
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/api/Users')
      .then(response => {
        const parsedData = response.data.map(user => {
          const parsedUser = {};
          Object.keys(user).forEach(key => {
            parsedUser[key.replace(/"/g, '')] = user[key];
          });
          return parsedUser;
        });
        setUsers(parsedData.filter(user => user.type === 'driver'));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/Users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ fname: '', lname: '', email: '', pwd: '', address: '', did: '', type: 'driver' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
    setFormIsValid(event.target.form.checkValidity());
  };

  return (
    <div className='container'>
      <h1>DRIVERS</h1>
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
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.did}</td>
              <td>{user.email}</td>
              <td>{user.fullName.firstName} {user.fullName.lastName}</td>
              <td>{user.address}</td>
              <td>{user.phNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit} noValidate>
        <h3>Add New Driver</h3>
        <div class="form-line">
          <input type='text' placeholder='First Name' name='fname' value={newUser.fname} onChange={handleInputChange} required />
          <input type='text' placeholder='Last Name' name='lname' value={newUser.lname} onChange={handleInputChange} required />
        </div>
        <div class="form-line">
          <input type="email" placeholder='Email' name='email' value={newUser.email} onChange={handleInputChange} required />
          <input type="password" placeholder='Password' name='pwd' value={newUser.pwd} onChange={handleInputChange} required />
        </div>
        <div class="form-line">
          <input type="number" placeholder='Driver ID' name='did' value={newUser.did} onChange={handleInputChange} required />
          <input type="text" placeholder='Address' name='addr' value={newUser.address} onChange={handleInputChange} required />
        </div>
        <button type="submit" disabled={!formIsValid}><span>Add Driver</span></button>
      </form>
    </div>
  );
}

export default ManageCustomer;