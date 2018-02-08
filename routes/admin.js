'use strict';

const express = require('express');
const router = express.Router();
const adminRegisterLoginLogout = require('../controllers/admin/adminRegisterLoginLogout.controller');

/* GET users listing. */
router.get('/getUsers', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register', adminRegisterLoginLogout.register);

module.exports = router;
