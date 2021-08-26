var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var secret = {
    jwt: 'secret',
}
var checkToken = expressJwt({secret: secret.jwt,algorithms: ['sha1', 'RS256', 'HS256'],});
var User = require('../api/users/userModel');

exports.decodeToken = function() {
    return function(req, res) {
        if(req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = `Bearer ${req.query.access_token}`;
        }

        checkToken(req, res);
    };
};

exports.getFreshUser = function() {
    return function(req, res, next) {
        User.findById(req.user._id)
          .then(function(user) {
              if(!user) {
                  res.status(401).send('Unauthorized');
              } else {
                  req.user = user;
                  next();
              }
          }, function(err) {
              console.log(err);
        });
    }
};

exports.verifyUser = function() {
    return function(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        if(!username || !password) {
           return res.status(400).send('You need a username and password');
        }
        User.findOne({username: username})
          .then(function(user) {
              if(!user) {
                  res.status(401).send('No user with that username');
              } else {
                  if (!user.authenticate(password)) {
                      res.status(401).send("Wrong Password");
                  } else {
                      req.user = user;
                      next();
                  }
              }
          }, function(err) {
              console.log(err);
          })
    }
}
var expireTime = 30 * 60;
exports.signToken = function(id) {
    return jwt.sign(
        {_id: id},
        secret.jwt,
        {expiresIn: expireTime}
    )
}