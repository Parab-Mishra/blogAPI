var User = require('./userModel');
var signToken = require('../../auth/auth').signToken;


exports.params = function(req, res, next, id) {
  User.findById(id)
    .select('-password')
    .exec()
    .then(function(user) {
      if (!user) {
        console.log('No user with that id');
      } else {
        req.user = user;
        next(); 
        
      }
    }, function(err) {
      console.log(err);
    });
};

exports.get = function(req, res) {
  User.find({})
    .then(function(users){
      res.json(users);
    }, function(err){
      console.log(err);
    });
};

exports.getOne = function(req, res) {
  var user = req.user;
  res.json(user);
};

exports.put = function(req, res) {
  var user = req.user;

  var update = req.body;

  Object.assign(user, update);

  user.save(function(err, saved) {
    if (err) {
      console.log(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res) {
  var newUser = req.body;

  User.create(newUser)
    .then(function(user) {
      res.json(user);
    }, function(err) {
      console.log(err);
    });
};

exports.delete = function(req, res) {
  req.user.remove(function(err, removed) {
    if (err) {
      console.log(err);
    } else {
      res.json(removed);
    }
  });
};

exports.me = function(req, res) {
  res.json(req.user.toJson());
};