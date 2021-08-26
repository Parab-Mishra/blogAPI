var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/users', require('./users/userRoutes'));
router.use('/categories', require('./categories/categoryRoutes'));
router.use('/posts', require('./posts/postRoutes'));

module.exports = router;