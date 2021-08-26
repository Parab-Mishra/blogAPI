var Category = require('./categoryModel');

exports.params = function(req, res, next, id) {
    Category.findById(id)
    .then((category)=> {
        if(!category) {
            console.log("No category with that ID")
        } else {
            req.category = category;
            next();
        }
    }, function(err) {
        console.log(err);
    });
};

exports.get = function(req, res) {
    Category.find({})
    .then((categories) => {
        res.json(categories);
    }, function(err){
        console.log(err);
    });
}

exports.getOne = function(req, res) {
    var category = req.category;
    res.json(category);
  };

  exports.put = function(req, res) {
      var category = req.category;

      var update = req.body;

      Object.assign(category, update);

      category.save(function(err, saved) {
          if(err) {
              console.log(err);
          } else {
              res.json(saved);
          }
      })
  }

  exports.post = function(req, res) {
    var newcategory = req.body;
  
    Category.create(newcategory)
      .then(function(category) {
        res.json(category);
      }, function(err) {
        console.log(err);
      });
  };
  
  exports.delete = function(req, res) {
    req.category.remove(function(err, removed) {
      if (err) {
        console.log(err);
      } else {
        res.json(removed);
      }
    });
  };