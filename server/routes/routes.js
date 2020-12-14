var controller = require('../controllers');
var router = require('express').Router();

router.get('/items', controller.items.get);

// router.post('/items', controller.items.post);

router.post('/signin', controller.users.signin);

router.post('/signup', controller.users.signup);

router.get('/signout', controller.users.signout);

module.exports = router;

