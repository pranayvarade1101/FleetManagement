// import modules
const express= require('express');
const mongoose=require('mongoose');
const morgan= require('morgan');
const cors=require('cors');
require('dotenv').config();


// *************************************************************************
// app
const app=express();


// *************************************************************************
// middleware
app.use(morgan("dev"));
app.use(cors({origin: true, credentials:true}));
app.use(express.json());


// *************************************************************************
// routes
const testRoutes=require("./routes/test");
app.use("/", testRoutes);


// *************************************************************************
// db
mongoose.connect(process.env.MONGO_URI, {});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const User = require('./models/User');
const Vehicle = require('./models/Vehicle');
const Route = require('./models/Route');

// Create an API endpoint to retrieve all users
app.get('/api/Users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving users' });
    }
});

// Create an API endpoint to create a new user
app.post('/api/Users', async (req, res) => {
    try {
      if (req.body.type === 'customer') {
        req.body.cid = Number(req.body.cid);
      }
      else if (req.body.type === 'driver') {
        req.body.did = Number(req.body.did);
        req.body.salary = Number(req.body.salary);
      }
      req.body.phNo = Number(req.body.phNo);
      const user = new User(req.body);
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating user' });
    }
  });

// Create an API endpoint to delete a user
app.delete('/api/Users/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send(`User with ID ${userId} not found`);
    } else {
      res.status(200).send(`User with ID ${userId} deleted successfully`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting user');
  }
});

// Create an API endpoint to retrieve all vehicles
app.get('/api/Vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving vehicles' });
    }
});

// Create an API endpoint to create a new vehicle
app.post('/api/Vehicles', async (req, res) => {
  try {
    req.body.did = Number(req.body.did);
    req.body.rid = Number(req.body.rid);
    req.body.rate = Number(req.body.rate);
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating vehicle' });
  }
});

// Create an API endpoint to delete a vehicle
app.delete('/api/Vehicles/:vId', async (req, res) => {
  const vId = req.params.vId;
  try {
    const vehicle = await Vehicle.findByIdAndDelete(vId);
    if (!vehicle) {
      res.status(404).send(`Vehicle with ID ${vId} not found`);
    } else {
      res.status(200).send(`Vehicle with ID ${vId} deleted successfully`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting vehicle');
  }
});

// Create an API endpoint to retrieve all routes
app.get('/api/Routes', async (req, res) => {
  try {
      const routes = await Route.find();
      res.json(routes);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving routes' });
  }
});

// Create an API endpoint to create a new route
app.post('/api/Routes', async (req, res) => {
  try {
    req.body.rid = Number(req.body.rid);
    const route = new Route(req.body);
    await route.save();
    res.json(route);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating route' });
  }
});

// Create an API endpoint to delete a route
app.delete('/api/Routes/:rId', async (req, res) => {
  const rId = req.params.rId;
  try {
    const route = await Route.findByIdAndDelete(rId);
    if (!route) {
      res.status(404).send(`Route with ID ${rId} not found`);
    } else {
      res.status(200).send(`Route with ID ${rId} deleted successfully`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting route');
  }
});


// *************************************************************************
// port
const port = process.envPORT || 8080;
// if env file is running then use that port itself, if not running then use 8080;


// *************************************************************************
// listener
const server=app.listen(port, ()=>
    console.log(`Server is running on port: ${port}`)
);