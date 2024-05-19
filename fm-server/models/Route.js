const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    distance: { type: String, required: true },
    rid: { type: Number, required: true, unique: true },
    source: { type: String, required: true },
    type: { type: String, required: true }
});

module.exports = mongoose.model('Route', routeSchema, 'Routes');