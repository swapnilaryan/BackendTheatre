'use strict';

const express = require('express');
const router = express.Router();
const adminRegisterLoginLogout =
    require('../controllers/admin/adminRegisterLoginLogout.controller');
const adminUserDetails = require('../controllers/admin/userDetails.controller');
const adminSiteConfig = require('../controllers/admin/siteConfig.controller');

// Login Logout and Registration
router.post('/register', adminRegisterLoginLogout.register);
router.get('/logout', adminRegisterLoginLogout.logout);
router.post('/login', adminRegisterLoginLogout.login);
router.get('/loginTest', adminRegisterLoginLogout.loginStatus,
    adminRegisterLoginLogout.loginTest);

// User Accounts Page
router.get('/userDetails', adminRegisterLoginLogout.loginStatus,
    adminUserDetails.getCurrentLoggedInUser);

router.put('/updateUser', adminRegisterLoginLogout.loginStatus,
    adminUserDetails.updateUser);

// Site Config Page
router.get('/siteConfig', adminRegisterLoginLogout.loginStatus,
    adminSiteConfig.getSiteConfig);
router.put('/siteConfig', adminSiteConfig.updateSiteConfig);



module.exports = router;
