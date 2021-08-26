var router = require('express').Router();
var controller = require('./postController');
var auth = require('../../auth/auth');

router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(auth.decodeToken(), auth.getFreshUser(), controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(auth.decodeToken(), auth.getFreshUser(), controller.put)
  .delete(auth.decodeToken(), auth.getFreshUser(), controller.delete)

module.exports = router;