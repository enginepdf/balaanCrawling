var controller = require('../controllers');
var router = require('express').Router();

router.get('/items', controller.items.get);

router.post('/items', controller.items.post);

router.get('/users', controller.users.get);

router.post('/users', controller.users.post);


module.exports = router;

