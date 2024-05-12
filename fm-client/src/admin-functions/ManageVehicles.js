import React, { useState, useEffect } from 'react';
import "./admin-functions.css"
import axios from 'axios';


function ManageCustomer() {

  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({ fname: '', lname: '', email: '', pwd: '' });
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/api/Vehicles')
      .then(response => {
        const parsedData = response.data.map(vehicle => {
          const parsedVehicle = {};
          Object.keys(vehicle).forEach(key => {
            parsedVehicle[key.replace(/"/g, '')] = vehicle[key];
          });
          return parsedVehicle;
        });
        setVehicles(parsedData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/Vehicles', newVehicle);
      setVehicles([...vehicles, response.data]);
      setNewVehicle({ vid: '', rid: '', status: '', type: '', did: '', cap: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setNewVehicle({ ...newVehicle, [event.target.name]: event.target.value });
    setFormIsValid(event.target.form.checkValidity());
  };

  return (
    <div className='container'>
      <h1>VEHICLES</h1>
      <table>
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Route ID</th>
            <th>Status</th>
            <th>Type</th>
            <th>Driver ID</th>
            <th>Load Capacity</th>
            <th>Passenger Capacity</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.vid}</td>
              <td>{vehicle.rid}</td>
              <td>{vehicle.status}</td>
              <td>{vehicle.type}</td>
              <td>{vehicle.did}</td>
              <td>{vehicle.load_Capacity}</td>
              <td>{vehicle.passenger_Capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit} noValidate>
        <h3>Add New Vehicle</h3>
        <div class="form-line">
          <input type='text' placeholder='Vehicle ID' name='vid' value={newVehicle.vid} onChange={handleInputChange} required />
          <input type='number' placeholder='Route ID' name='rid' value={newVehicle.rid} onChange={handleInputChange} required />
        </div>
        <div class="form-line">
          <input type="text" placeholder='Status' name='status' value={newVehicle.status} onChange={handleInputChange} required />
          <input type="number" placeholder='Driver ID' name='did' value={newVehicle.did} onChange={handleInputChange} required />
        </div>
        <div class='form-line'>
          <select name="type" value={newVehicle.type} onChange={handleInputChange} required>
            <option value="" disabled selected hidden>Vehicle Type</option>
            <option value="Bus">Bus</option>
            <option value="Truck">Truck</option>
            <option value="Ferry">Ferry</option>
          </select>
        </div>
        <div class="form-line">
          <select name="capacity-type" value={newVehicle.cap_type} onChange={handleInputChange} required>
            <option value="" disabled selected hidden>Capacity Type</option>
            <option value="Load">Load</option>
            <option value="Passenger">Passenger</option>
          </select>
          <input type="text" placeholder='Capacity' name='cap' value={newVehicle.cap} onChange={handleInputChange} required />
        </div>
        <button type="submit" disabled={!formIsValid}><span>Add Vehicle</span></button>
      </form>
    </div>
  );
}

export default ManageCustomer;