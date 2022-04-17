const express = require('express');
const router = express.Router(); 


// acquiring user controller
const usersController = require('../controllers/users_controller');
// calling modules inside user controller
router.get('/profile', usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in',  usersController.signIn);



module.exports = router;