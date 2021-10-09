const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Areas = mongoose.model('Area', new Schema({
    areaPather_id : { type: Schema.Types.ObjectId, ref: 'Areas' },
    institution_id : { type: Schema.Types.ObjectId, ref: 'Areas' },
    name: String,
}))

module.exports = Areas;