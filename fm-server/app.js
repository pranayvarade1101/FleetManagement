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
    res.status(500).json({ message: 'Error creating vehicle' });
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


// *************************************************************************
// port
const port = process.envPORT || 8080;
// if env file is running then use that port itself, if not running then use 8080;


// *************************************************************************
// listener
const server=app.listen(port, ()=>
    console.log(`Server is running on port: ${port}`)
);