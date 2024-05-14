const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    address: { type: String, required: true },
    cid: { type: Number, unique: true },
    did: { type: Number, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phNo: { type: Number, required: true },
    salary: { type: Number },
    type: { type: String, required: true },
    vid: { type: String },
    name: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema, 'Users');