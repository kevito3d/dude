const passport = require("passport");

const LocalStrategy= requiere('passport-local').Strategy

passport.use('local-singup', new LocalStrategy({
    usernameField: 'ussername',
    emailField: 'email',
    passwaordField: 'password',
    passReqToCallback: true
}, (req,email,ussername,password,done)=>{

}));