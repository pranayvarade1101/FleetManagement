const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    status: { type: String, required: true },
    type: { type: String, required: true },
    load_Capacity: { type: String, required: true },
    passenger_Capacity: { type: String, required: true },
    did: { type: Number, required: true },
    rid: { type: Number, required: true },
    vid: { type: String, required:true, unique: true },
    rate: { type: Number },
    unit: { type: String }
});

module.exports = mongoose.model('Vehicle', vehicleSchema, 'Vehicles');