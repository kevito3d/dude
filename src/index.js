const express = require("express");
const engine = require('ejs-mate');
const morgan = require('morgan');
const path = require('path')
const session = require('express-session')
//routes
const index = require('./routes/index');
const user = require('./api/routes/user');
const institution = require('./api/routes/institution');
const area = require('./api/routes/area');

//initializations
const app = express();
require('./database')

//settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

//middelwares
app.use(morgan('short'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(session({
    secret : "my secret key joptionpane",
    resave : false,
    saveUninitialized: false
}))

//routes
app.use('/', index);
app.use('/api/user', user);
app.use('/api/institution', institution);
app.use('/api/area', area);

//startin server
app.listen(app.get('port'), () => {
    console.log('server on Port ', app.get('port'));
})