import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    vid: '',
    rid: '',
    status: '',
    type: '',
    did: '',
    load_Capacity: '',
    passenger_Capacity: ''
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 5;
  const totalPages = Math.ceil(vehicles.length / vehiclesPerPage);
  const [users, setUsers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [ridError, setRidError] = useState(null);
  const [didError, setDidError] = useState(null);

  useEffect(() => {
    fetchVehicles();
    fetchUsers();
    fetchRoutes();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/Vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/Users');
      setUsers(response.data.filter((user) => user.type === 'driver'));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/Routes');
      setRoutes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formIsValid && !ridError && !didError) {
      try {
        const response = await axios.post('http://localhost:8080/api/Vehicles', {
          ...newVehicle,
          vid: newVehicle.vid,
          rid: newVehicle.rid,
          status: newVehicle.status,
          type: newVehicle.type,
          did: newVehicle.did,
          load_Capacity: newVehicle.load_Capacity,
          passenger_Capacity: newVehicle.passenger_Capacity
        });
        setVehicles((prevVehicles) => [...prevVehicles, response.data]);
        setNewVehicle({
          vid: '',
          rid: '',
          status: '',
          type: '',
          did: '',
          load_Capacity: '',
          passenger_Capacity: ''
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'rid') {
      const ridExists = routes.some((route) => route.rid === parseInt(value, 10));
      if (!ridExists && value !== '') {
        setRidError('Route ID does not exist');
      } else {
        setRidError(null);
      }
      setNewVehicle({ ...newVehicle, [name]: parseInt(value, 10) });
    } else if (name === 'did') {
      const didExists = users.some((user) => user.did === parseInt(value, 10));
      if (!didExists && value !== '') {
        setDidError('Driver ID does not exist');
      } else {
        setDidError(null);
      }
      setNewVehicle({ ...newVehicle, [name]: parseInt(value, 10) });
    } else {
      setNewVehicle({ ...newVehicle, [name]: value });
    }
    setFormIsValid(event.target.form.checkValidity());
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='main-container'>
      <div class="container left">
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
            {vehicles.slice((currentPage - 1) * vehiclesPerPage, currentPage * vehiclesPerPage).map((vehicle) => (
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
          <h3>Add New Vehicle</h3>
          <div class='form-line'>
            <select name="type" value={newVehicle.type} onChange={handleInputChange} required>
              <option value="" disabled selected hidden>Vehicle Type</option>
              <option value="Bus">Bus</option>
              <option value="Truck">Truck</option>
              <option value="Ferry">Ferry</option>
            </select>
          </div>

          {/* Inputs for Bus */}
          {newVehicle.type === 'Bus' && <div class="container vType">
            <div class="form-line">
              <input type='text' placeholder='Vehicle ID' name='vid' pattern="[A-Z]{2}[ ][0-9]{1,2}[ ][A-Z]{1,2}[ ][0-9]{1,4}" value={newVehicle.vid} onChange={handleInputChange} required />
              <input type='number' placeholder='Route ID' name='rid' value={newVehicle.rid} onChange={handleInputChange} required />
            </div>
            <div class="form-line">
              <input type="text" placeholder='Status' name='status' value={newVehicle.status} onChange={handleInputChange} required />
              <input type="number" placeholder='Driver ID' name='did' value={newVehicle.did} onChange={handleInputChange} required />
            </div>
            <div class="form-line-3">
              <label>Passenger Capacity</label>
              <input type="text" placeholder='Capacity' name='passenger-cap' value={newVehicle.passenger_Capacity} onChange={handleInputChange} required />
            </div>
          </div> }

          {/* Inputs for Truck */}
          {newVehicle.type === 'Truck' && <div class="container vType">
            <div class="form-line">
              <input type='text' placeholder='Vehicle ID' name='vid' pattern="[A-Z]{2}[ ][0-9]{1,2}[ ][A-Z]{1,2}[ ][0-9]{1,4}" value={newVehicle.vid} onChange={handleInputChange} required />
              <input type='number' placeholder='Route ID' name='rid' value={newVehicle.rid} onChange={handleInputChange} required />
            </div>
            <div class="form-line">
              <input type="text" placeholder='Status' name='status' value={newVehicle.status} onChange={handleInputChange} required />
              <input type="number" placeholder='Driver ID' name='did' value={newVehicle.did} onChange={handleInputChange} required />
            </div>
            <div class="form-line-3">
              <label>Load Capacity</label>
              <input type="text" placeholder='Capacity' name='load-cap' value={newVehicle.load_Capacity} onChange={handleInputChange} required />
            </div>
          </div> }

          {/* Inputs for Ferry */}
          {newVehicle.type === 'Ferry' && <div class="container vType">
            <div class="form-line">
              <input type='text' placeholder='Vehicle ID' name='vid' pattern="[F][-][0-9]{3}" value={newVehicle.vid} onChange={handleInputChange} required />
              <input type='number' placeholder='Route ID' name='rid' value={newVehicle.rid} onChange={handleInputChange} required />
            </div>
            <div class="form-line">
              <input type="text" placeholder='Status' name='status' value={newVehicle.status} onChange={handleInputChange} required />
              <input type="number" placeholder='Driver ID' name='did' value={newVehicle.did} onChange={handleInputChange} required />
            </div>
            <div class="form-line-3">
              <label>Passenger Capacity</label>
              <input type="text" placeholder='Capacity' name='passenger-cap' value={newVehicle.passenger_Capacity} onChange={handleInputChange} required />
            </div>
            <div class="form-line-3">
              <label>Load Capacity</label>
              <input type="text" placeholder='Capacity' name='load-cap' value={newVehicle.load_Capacity} onChange={handleInputChange} required />
            </div>
          </div> }

          {ridError && <div style={{ color: 'red' }}>{ridError}</div>}
          {didError && <div style={{ color: 'red' }}>{didError}</div>}
          <button type="submit" disabled={!formIsValid}><span>Add Vehicle</span></button>
        </form>
      </div>
    </div>
  );
}

export default ManageVehicles;