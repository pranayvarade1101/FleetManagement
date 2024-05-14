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
    address: '',
    did: '',
    phNo: '',
    salary: '',
    vid: '',
    type: 'driver' });
  const [formIsValid, setFormIsValid] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);

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
          address: '',
          did: '',
          phNo: '',
          salary: '',
          vid: '',
          type: 'driver'
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'did' || name === 'phNo') {
      setNewUser({ ...newUser, [name]: parseInt(value, 10) });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
    setFormIsValid(event.target.form.checkValidity());
  };
  

  const handlePasswordBlur = () => {
    setShowPasswordRules(false);
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
            <th>Salary</th>
            <th>Vehicle ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.did}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.address}</td>
              <td>{user.phNo}</td>
              <td>{user.salary}</td>
              <td>{user.vid}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit} noValidate>
        <h3>Add New Driver</h3>
        <div class="form-line">
          <input type='text' placeholder='First Name' name='fname' value={newUser.fname} onChange={handleInputChange} required />
          <input type='text' placeholder='Last Name' name='lname' value={newUser.lname} onChange={handleInputChange} required />
          <input type="email" placeholder='Email' name='email' value={newUser.email} onChange={handleInputChange} required />
        </div>
        <div class="form-line">
          <input type="tel" placeholder='Phone Number' name='phNo' pattern="[0-9]{10}" value={newUser.phNo} onChange={handleInputChange} required />
          <input type="text" placeholder='Address' name='addr' value={newUser.addr} onChange={handleInputChange} required />
          <input type="password" placeholder='Password' name='pwd' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number, one lowercase and one uppercase letter, and at least 8 characters" value={newUser.pwd} onChange={handleInputChange} required onFocus={() => setShowPasswordRules(true)} onBlur={handlePasswordBlur} />
          {showPasswordRules && (
            <p className="pwd-rules">Must contain at least one number, one lowercase and one uppercase letter, and be at least 8 characters long.</p>
          )}
        </div>
        <div class="form-line">
          <input type="text" placeholder='Salary' name='salary' value={newUser.salary} onChange={handleInputChange} required />
          <input type="text" placeholder='Vehicle ID' name='vid' pattern="[A-Z]{2}[ ][0-9]{1,2}[ ][A-Z]{1,2}[ ][0-9]{1,4}" value={newUser.vid} onChange={handleInputChange} required />
        </div>
        <div class="form-line-2">
          <label name="did">Driver ID:</label>
          <input type="text" placeholder={nextDid} name='cid' value={nextDid} onChange={handleInputChange} readOnly required />
        </div>
        <button type="submit" disabled={!formIsValid}><span>Add Driver</span></button>
      </form>
    </div>
  );
}

export default ManageDriver;