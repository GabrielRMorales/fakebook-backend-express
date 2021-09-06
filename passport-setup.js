const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcrypt");
const User = require("./models").User;
require("dotenv").config();
const SECRET = process.env.SECRET_CODE;

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, (email, password, cb)=>{
    User.findOne({email}).then(user=>{
        console.log(user);
        if (!user){
            return cb(null, false, {message: "Incorrect email or password."});
        }
        bcrypt.compare(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if (isMatch){
                return cb(null, user);
            } else {
                return cb(null, false, {message: "Incorrect password."});
            }
        })
    }).catch(err=>cb(err));
}
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
},
(jwtPayload, cb)=>{
    return User.findById(jwtPayload.user._id).then(user=>{
        return cb(null, user);
    })
    .catch(err=>{
        return cb(err);
    });
    }
));

module.exports = passport;