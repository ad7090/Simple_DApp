let passport = require("passport");
let User = require("../models/users");
let config = require("./auth");
let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
let jwt = require("jsonwebtoken");

let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: config.secret,
};

let jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  console.log('payload =>',payload)
  User.findOne({ phone: payload.phone }, function (err, user_) {
 
    if (err) {
      return done(err, false);
    }
    if (user_) {
      done(null, user_);
    } else {

     
      User.findOne({ phone: payload.phone }, function (err, userm) {
      
        if (err) {
          return done(err, false);
        }
        if (userm) {
          done(null, userm);
        } else {
          done(null, false);
        }
      });

     
    }
  });
});

passport.use(jwtLogin);

exports.roleAuthorization = function () {
  return function (req, res, next) {
    let bearerHeader = req.headers["authorization"];

    let bearer = bearerHeader.split(" ");
    let token = bearer[1];

    jwt.verify(token, config.secret, { algorithm: "HS512" }, function (
      error,
      decode
    ) {
      //error  401  authorization

      if (error) {
        res.status(200).send({
          status: {
            code: 500,
            description: "error",
          },
          data: "error",
        });
      }
      if (decode) {
        next();
      }
    });
  };
};
exports.roleAcc = function () {
  new JwtStrategy(jwtOptions, function (payload, done) {
    console.log('payload = > ',payload)
   return payload
  });
};