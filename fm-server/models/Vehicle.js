const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({});

module.exports = mongoose.model('Vehicle', vehicleSchema, 'Vehicles');