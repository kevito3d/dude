const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Users = mongoose.model('User', new Schema({
    email: String,
    user: String,
    password: String,
    salt: String,
    institution_id: { type: Schema.Types.ObjectId, ref: 'Institutions' },
    role: {
        type: String,
        default: 'user' //admin
    }
}))

module.exports = Users;