import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageRoutes() {
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({
    destination: '',
    distance: '',
    rid: '',
    source: '',
    type: ''
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const routesPerPage = 5;
  const totalPages = Math.ceil(routes.length / routesPerPage);
  const [nextRid, setNextRid] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

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
    if (newRoute.type === 'Road') {
      newRoute.distance = newRoute.distance + ' km';
    } else {
      newRoute.distance = newRoute.distance + ' Nm';
    }
    if (formIsValid) {
      try {
        const response = await axios.post('http://localhost:8080/api/Routes', {
          ...newRoute,
          destination: newRoute.destination,
          distance: newRoute.distance,
          rid: newRoute.rid,
          source: newRoute.source,
          type: newRoute.type,
        });
        setRoutes((prevRoutes) => [...prevRoutes, response.data]);
        setNewRoute({
          destination: '',
          distance: '',
          rid: '',
          source: '',
          type: ''
        });
        toggleForm();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Checks for the route type to set the next rid
    if (name === 'type') {
      if ( value === 'Road' ) {
        const roadRoutes = routes.filter((route) => route.type === 'Road');
        setNextRid(parseInt(roadRoutes.reduce((max, r) => r.rid > max ? r.rid : max, 0)) + 1);
      } else {
        const seaRoutes = routes.filter((route) => route.type === 'Sea');
        setNextRid(parseInt(seaRoutes.reduce((max, r) => r.rid > max ? r.rid : max, 0)) + 1);
      }
    }
    newRoute.rid= nextRid;
    setNewRoute({ ...newRoute, [name]: value });
    setFormIsValid(event.target.form.checkValidity());
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteRoute = async (rId) => {
    try {
      await axios.delete(`http://localhost:8080/api/Routes/${rId}`);
      setRoutes(prevRoutes => prevRoutes.filter(route => route._id !== rId));
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
        <h1>ROUTES</h1>
        <table>
          <thead>
            <tr>
              <th>Route ID</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Distance</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {routes.slice((currentPage - 1) * routesPerPage, currentPage * routesPerPage).map((route) => (
              <tr key={route._id}>
                <td>{route.rid}</td>
                <td>{route.source}</td>
                <td>{route.destination}</td>
                <td>{route.distance}</td>
                <td>{route.type}</td>
                <td className='delete'>
                  <button className='delete-icon' onClick={() => handleDeleteRoute(route._id)}>&#10006;</button>
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
          <button className='form-toggle-btn' onClick={toggleForm}>Add New Route</button>
        </div>
      </div>
      { showForm && <div className="container right">
        <form onSubmit={handleSubmit} noValidate>
          <h3>Add New Route</h3>
          <div className='form-line'>
            <select name="type" value={newRoute.type} onChange={handleInputChange} required>
              <option value="" disabled defaultValue={''} hidden>Route Type</option>
              <option value="Road">Road</option>
              <option value="Sea">Sea</option>
            </select>
          </div>
          <div className="container vType">
            <div className="form-line">
              <input type="text" placeholder='Source' name='source' value={newRoute.source} onChange={handleInputChange} required />
              <input type="text" placeholder='Destination' name='destination' value={newRoute.destination} onChange={handleInputChange} required />
            </div>
            <div className="form-line-3">
              <input type="text" placeholder='Distance' name='distance' value={newRoute.distance} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="form-line-2">
            <label name="did">Route ID:</label>
            <input type="text" placeholder={nextRid} name='rid' value={newRoute.rid} onChange={handleInputChange} readOnly required />
          </div>
          <button type="submit" disabled={!formIsValid}><span>Add Route</span></button>
        </form>
      </div> }
    </div>
  );
}

export default ManageRoutes;