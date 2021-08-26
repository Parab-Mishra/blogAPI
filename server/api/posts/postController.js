  
var Post = require('./postModel');


exports.params = function(req, res, next, id) {
  Post.findById(id)
    .populate('author', 'username')
    .exec()
    .then(function(post) {
      if (!post) {
        console.log("No post with that id")
      } else {
        req.post = post;
        next();
      }
    }, function(err) {
      console.log(err);
    });
};

exports.get = function(req, res) {
  Post.find({})
    .populate('author categories')
    .exec()
    .then(function(posts){
      res.json(posts);
    }, function(err){
      console.log(err);
    });
};

exports.getOne = function(req, res) {
  var post = req.post;
  res.json(post);
};

exports.put = function(req, res) {
  var post = req.post;

  var update = req.body;

  Object.assign(post, update);

  post.save(function(err, saved) {
    if (err) {
      console.log(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res) {
  var newpost = req.body;

  Post.create(newpost)
    .then(function(post) {
      res.json(post);
    }, function(err) {
      console.log(err);
    });
};

exports.delete = function(req, res) {
  req.post.remove(function(err, removed) {
    if (err) {
      console.log(err);
    } else {
      res.json(removed);
    }
  });
};