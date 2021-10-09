const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')


router.get('/', (req, res, next) => {

    if(req.session.token)
    return res.render('index');
    return res.render('signin')
    
});
//form to access
router.get('/signin', (req, res, next) => {
    console.log()
    if(req.session.token){
        return res.render('index');
    }
    return res.render('signin');
})


// form to register
router.get('/signup', (req, res, next) => {
    return res.render('signup')
})






module.exports = router;