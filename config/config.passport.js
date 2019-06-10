var jwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user.model');
var db = require('../config/connection.db');

module.exports = function(passport){
    let opts = {};
    
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("beerer"); // don't use jwt cause it causes error.
    opts.secretOrKey = db.secret;
    passport.use(new jwtStrategy(opts,(jwt_payload,done)=>{
        User.getUserById(jwt_payload._id,(err,user)=>{
            if(err){
                return done(err,false);
            }
            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        });
    }));
}