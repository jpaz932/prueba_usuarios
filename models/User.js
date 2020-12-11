const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const usuario = new Schema({
    nombres: String,
    apellidos: String,
    email: String,
    telefono: Number,
    documento: Number
});

module.exports = mongoose.model('usuarios', usuario);
