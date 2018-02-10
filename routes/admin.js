'use strict';

const express = require('express');
const router = express.Router();
const adminRegisterLoginLogout = require('../controllers/admin/adminRegisterLoginLogout.controller');


router.post('/register', adminRegisterLoginLogout.register);
router.get('/logout', adminRegisterLoginLogout.logout);
router.post('/login', adminRegisterLoginLogout.login);
router.get('/loginTest', adminRegisterLoginLogout.loginStatus,
    adminRegisterLoginLogout.loginTest);

module.exports = router;
