const jwt = require('jsonwebtoken')
const Users = require('../models/users')
const isAuthenticated = (req, res, next) => {
    
    const token = req.headers.authorization;
    console.log("este es el token que esta llegando : ",token);
    if (!token) {
        console.log("por lo tanto debo salir");
        return res.sendStatus(403);
    }
    jwt.verify(token, 'mi-secreto', (err, decoded) => {
        if(decoded){
            console.log(decoded);
            const { _id } = decoded;
            Users.findOne({ _id }).exec()
                .then(users => {
                    console.log("el usuario en el didelware:\n",users);
                    req.user = users;
                    next();
                })
        }else{
            res.sendStatus(403)
        }
    })
}
const hasRoles = roles => (req, res, next) => {
    if (roles.indexOf(req.user.role) > -1) {
        return next()
    }
    res.sendStatus(403)
}

const hasRoleAdmin = (req, res, next) => {
    if (req.session.role == 'admin') {
        return next()
    }
    res.sendStatus(403)
}
module.exports = {
    isAuthenticated,
    hasRoles,
    hasRoleAdmin
}