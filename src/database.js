const  mongoose  = require("mongoose");
const {mongodb} = require('./keys')

mongoose.connect(mongodb.URI,{useNewUrlParser: true, useUniFiedTopology: true}).then(
    db => console.log('db conectada')
).catch(err => console.log(err));