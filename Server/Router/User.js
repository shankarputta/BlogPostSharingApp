const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();

router.get('/',controller.getuser);

router.post('/',controller.signup);

router.post('/login',controller.login);

router.get('/getPeople',controller.getPeople);

router.get('/getProfile',controller.getProfile);

router.post('/unfollow',controller.unfollow);

router.post('/follow',controller.follow);

module.exports = router;
