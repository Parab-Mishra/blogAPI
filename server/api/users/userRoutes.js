var router = require('express').Router();
var controller = require('./userController');
var auth = require('../../auth/auth')

router.param('id', controller.params);
router.get('/me', auth.decodeToken(), auth.getFreshUser(), controller.me)

router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(auth.decodeToken(), auth.getFreshUser(), controller.put)
  .delete(auth.decodeToken(), auth.getFreshUser(), controller.delete)

module.exports = router;