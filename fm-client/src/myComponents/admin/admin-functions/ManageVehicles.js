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
    lcap: '',
    pcap: '',
    rate: '',
    unit: ''
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
    if (newVehicle.type === 'Bus') {
      newVehicle.lcap = 'NA';
      setNewVehicle({ ...newVehicle, unit: 'Seat' });
      console.log(newVehicle);
    } else if (newVehicle.type === 'Truck') {
      newVehicle.pcap = 'NA';
      setNewVehicle({ ...newVehicle, unit: 'km' });
      console.log(newVehicle);
    } else {
      newVehicle.unit = 'Nm';
      console.log(newVehicle);
    }
    if (formIsValid && !ridError && !didError) {
      try {
        const response = await axios.post('http://localhost:8080/api/Vehicles', {
          ...newVehicle,
          vid: newVehicle.vid,
          rid: newVehicle.rid,
          status: newVehicle.status,
          type: newVehicle.type,
          did: newVehicle.did,
          load_Capacity: newVehicle.lcap,
          passenger_Capacity: newVehicle.pcap,
          rate: newVehicle.rate,
          unit: newVehicle.unit
        });
        setVehicles((prevVehicles) => [...prevVehicles, response.data]);
        setNewVehicle({
          vid: '',
          rid: '',
          status: '',
          type: '',
          did: '',
          lcap: '',
          pcap: '',
          rate: '',
          unit: ''
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Checks if the rid exists
    if (name === 'rid') {
      const ridExists = routes.some((route) => route.rid === parseInt(value, 10));
      if (!ridExists && value !== '') {
        setRidError('Route ID does not exist');
      } else {
        setRidError(null);
      }
      setNewVehicle({ ...newVehicle, [name]: parseInt(value, 10) });
    }
    // Checks if the did exists
    else if (name === 'did') {
      const didExists = users.some((user) => user.did === parseInt(value, 10));
      if (!didExists && value !== '') {
        setDidError('Driver ID does not exist');
      } else {
        // Check if the user with the matching did has a matching rid
        const user = users.find((user) => user.did === parseInt(value, 10));
        if (user && user.vid !== newVehicle.vid) {
          setDidError('Driver does not drive this Vehicle');
        } else {
          setDidError(null);
        }
      }
      setNewVehicle({ ...newVehicle, [name]: parseInt(value, 10) });
    }
    // else code
    else {
      setNewVehicle({ ...newVehicle, [name]: value });
    }
    setFormIsValid(event.target.form.checkValidity());
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteVehicle = async (vId) => {
    try {
      await axios.delete(`http://localhost:8080/api/Vehicles/${vId}`);
      setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle._id !== vId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='main-container'>
      <div className="container left">
        <h1>VEHICLES</h1>
        <table>
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Driver ID</th>
              <th>Route ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Load Capacity</th>
              <th>Passenger Capacity</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.slice((currentPage - 1) * vehiclesPerPage, currentPage * vehiclesPerPage).map((vehicle) => (
              <tr key={vehicle._id}>
                <td>{vehicle.vid}</td>
                <td>{vehicle.did}</td>
                <td>{vehicle.rid}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.status}</td>
                <td>{vehicle.load_Capacity}</td>
                <td>{vehicle.passenger_Capacity}</td>
                <td>{vehicle.rate} ₹/{vehicle.unit}</td>
                <td className='delete'>
                  <button className='delete-icon' onClick={() => handleDeleteVehicle(vehicle._id)}>&#10006;</button>
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
      </div>
      <div className="container right">
        <form onSubmit={handleSubmit} noValidate>
          <h3>Add New Vehicle</h3>
          <div className='form-line'>
            <select name="type" value={newVehicle.type} onChange={handleInputChange} required>
              <option value="" disabled defaultValue={''} hidden>Vehicle Type</option>
              <option value="Bus">Bus</option>
              <option value="Truck">Truck</option>
              <option value="Ferry">Ferry</option>
            </select>
          </div>

          {/* Inputs for Bus */}
          {newVehicle.type === 'Bus' && <div className="container vType">
            <div className="form-line">
              <input type='text' placeholder='Vehicle ID' name='vid' pattern="[A-Z]{2}[ ][0-9]{1,2}[ ][A-Z]{1,2}[ ][0-9]{1,4}" value={newVehicle.vid} onChange={handleInputChange} required />
              <input type='number' placeholder='Route ID' name='rid' value={newVehicle.rid} onChange={handleInputChange} required />
            </div>
            <div className="form-line">
              <input type="text" placeholder='Status' name='status' value={newVehicle.status} onChange={handleInputChange} required />
              <input type="number" placeholder='Driver ID' name='did' value={newVehicle.did} onChange={handleInputChange} required />
            </div>
            <div className="form-line-3">
              <input type="text" placeholder='Passenger Capacity' name='pcap' value={newVehicle.pcap} onChange={handleInputChange} required />
            </div>
            <div className="form-line-3">
              <input type="number" placeholder='Ticket Rate' name='rate' value={newVehicle.rate} onChange={handleInputChange} required />
              <label>₹/Seat</label>
            </div>
          </div> }

          {/* Inputs for Truck */}
          {newVehicle.type === 'Truck' && <div className="container vType">
            <div className="form-line">
              <input type='text' placeholder='Vehicle ID' name='vid' pattern="[A-Z]{2}[ ][0-9]{1,2}[ ][A-Z]{1,2}[ ][0-9]{1,4}" value={newVehicle.vid} onChange={handleInputChange} required />
              <input type='number' placeholder='Route ID' name='rid' value={newVehicle.rid} onChange={handleInputChange} required />
            </div>
            <div className="form-line">
              <input type="text" placeholder='Status' name='status' value={newVehicle.status} onChange={handleInputChange} required />
              <input type="number" placeholder='Driver ID' name='did' value={newVehicle.did} onChange={handleInputChange} required />
            </div>
            <div className="form-line-3">
              <input type="text" placeholder='Load Capacity' name='lcap' value={newVehicle.lcap} onChange={handleInputChange} required />
            </div>
            <div className="form-line-3">
              <input type="number" placeholder='Rate' name='rate' value={newVehicle.rate} onChange={handleInputChange} required />
              <label>₹/km</label>
            </div>
          </div> }

          {/* Inputs for Ferry */}
          {newVehicle.type === 'Ferry' && <div className="container vType">
            <div className="form-line">
              <input type='text' placeholder='Vehicle ID' name='vid' pattern="[F]-[0-9]{3}" value={newVehicle.vid} onChange={handleInputChange} required />
              <input type='number' placeholder='Route ID' name='rid' value={newVehicle.rid} onChange={handleInputChange} required />
            </div>
            <div className="form-line">
              <input type="text" placeholder='Status' name='status' value={newVehicle.status} onChange={handleInputChange} required />
              <input type="number" placeholder='Driver ID' name='did' value={newVehicle.did} onChange={handleInputChange} required />
            </div>
            <div className="form-line-3">
              <input type="text" placeholder='Passenger Capacity' name='pcap' value={newVehicle.pcap} onChange={handleInputChange} required />
              <input type="text" placeholder='Load Capacity' name='lcap' value={newVehicle.lcap} onChange={handleInputChange} required />
            </div>
            <div className="form-line-3">
              <input type="number" placeholder='Rate' name='rate' value={newVehicle.rate} onChange={handleInputChange} required />
              <label>₹/Nm</label>
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