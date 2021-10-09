const express = require("express");
const users = require('../models/users')
const {IntitutionController} = require('../controllers/institutionController')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const {
    hasRoles
} = require('../auth')
const router = express.Router();

const signToken = (_id) => {
    return jwt.sign({
        _id
    }, 'mi-secreto', {
        expiresIn: 60 * 60 * 24 * 365
    });
}

//log out
router.post('/signup', (req, res) => {
    console.log("tratando de meter : ", req.body);
    const {
        email,
        password,
        user,
        institution_id
    } = req.body;
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64');
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
            const encryptedPassword = key.toString('base64')
            users.findOne({
                    user
                }).exec()
                .then(userf => {
                    if (userf) {
                        return res.send({
                            error: 'Usuario ya existe'
                        });
                    }
                    users.create({
                        email,
                        user,
                        password: encryptedPassword,
                        salt: newSalt,
                        institution_id: institution_id
                    }).then(() => {
                        return res.send({
                            success: 'Usuario creado correctamente'
                        });
                    })
                })
        })
    })
})

// log in
router.post('/signin',  (req, res, next) => {
    const {
        email,
        user,
        password
    } = req.body;
     users.findOne({
            $or: [{
                    "email": email
                },
                {
                    "user": user
                }
            ]
        }).exec()
        .then(userR => {
            if (!userR) {
                return res.send({
                    error: 'Usuario y/o contraseña incorrecta'
                });
            }
            crypto.pbkdf2(password, userR.salt, 10000, 64, 'sha1',async (err, key) => {
                const encryptedPassword = key.toString('base64');
                if (userR.password === encryptedPassword) {
                    const token = signToken(userR._id);
                    req.session.token = token
                    req.session.user = userR
                    const institution = new IntitutionController();
                    const insst =  await institution.findIntitution(userR.institution_id).then(x => {
                         return x
                     }
                     );
                    return res.send({
                        user:{user:userR.user,role:userR.role,email:userR.email},
                        institution: insst,
                    });
                }
                return res.send({
                    error: 'Usuario y/o contraseña incorrecta'
                });
            })
        })
})

router.post('/logout', (req, res, next) => {
    delete req.session.token;
    res.send("chao mundo");
})

module.exports = router;