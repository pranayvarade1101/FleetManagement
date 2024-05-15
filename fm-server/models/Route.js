const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({});

module.exports = mongoose.model('Route', routeSchema, 'Routes');