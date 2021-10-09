const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Institutions = mongoose.model('Institution', new Schema({
    name: String,
    direccion: String,
}))

module.exports = Institutions;