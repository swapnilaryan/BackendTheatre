'use strict';

const express = require('express');
const router = express.Router();

const adminRegisterLoginLogout =
    require('../controllers/admin/adminRegisterLoginLogout.controller');
const adminUserDetails = require('../controllers/admin/userDetails.controller');
const adminSiteConfig = require('../controllers/admin/siteConfig.controller');
const adminContactDetails = require('../controllers/admin/contact.controller');
const adminLocationDetails = require('../controllers/admin/location.controller');
const adminSocialDetails = require('../controllers/admin/social.controller');
const adminTicketDetails = require('../controllers/admin/ticket.controller');
const adminScreenDetails = require('../controllers/admin/screen.controller');
const adminUpcomingMovies = require('../controllers/admin/upComingMovies.controller');
const adminCurrentMovies = require('../controllers/admin/currentMovies.controller');


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


// Contact Setting Page
router.get('/contact', adminRegisterLoginLogout.loginStatus,
    adminContactDetails.getAdminContactDetails);
router.put('/contact', adminRegisterLoginLogout.loginStatus,
    adminContactDetails.updateAdminContactDetails);


// Location Setting Page
router.get('/location', adminRegisterLoginLogout.loginStatus,
    adminLocationDetails.getAdminLocationDetails);
router.put('/location', adminRegisterLoginLogout.loginStatus,
    adminLocationDetails.updateAdminLocationDetails);


// Social Setting Page
router.get('/social', adminRegisterLoginLogout.loginStatus,
    adminSocialDetails.getAdminSocialDetails);
router.put('/social', adminRegisterLoginLogout.loginStatus,
    adminSocialDetails.updateAdminSocialDetails);


// Ticket Setting Page
router.get('/ticket', adminRegisterLoginLogout.loginStatus,
    adminTicketDetails.getAdminTicketDetails);
router.put('/ticket', adminRegisterLoginLogout.loginStatus,
    adminTicketDetails.updateAdminTicketDetails);


// Screen Setting Page
router.get('/screen', adminRegisterLoginLogout.loginStatus,
    adminScreenDetails.getAdminScreenDetails);

router.post('/screen', adminRegisterLoginLogout.loginStatus,
    adminScreenDetails.postAdminScreenDetails);

router.put('/screen', adminRegisterLoginLogout.loginStatus,
    adminScreenDetails.updateAdminScreenDetails);


// Upcoming Movies
// TODO add remove recommendations
router.get('/recommendedUpComingMovies', adminRegisterLoginLogout.loginStatus,
    adminUpcomingMovies.recommendedUpComingMovies);

router.get('/addedUpComingMovies', adminRegisterLoginLogout.loginStatus,
    adminUpcomingMovies.getAddedUpComingMovies);

router.put('/addUpComingMovie/:movieID', adminRegisterLoginLogout.loginStatus,
    adminUpcomingMovies.addUpComingMovie);

router.get('/searchUpComingMovies/:movieName', adminRegisterLoginLogout.loginStatus,
    adminUpcomingMovies.searchUpComingMovies);

router.get('/moveToCurrent/:movieID/:isAPI?',
    adminUpcomingMovies.moveToCurrent);

router.delete('/removeUpComingMovies/:movieID', adminRegisterLoginLogout.loginStatus,
    adminUpcomingMovies.removeUpComingMovies);


// Current Movies
router.get('/currentMovies', adminRegisterLoginLogout.loginStatus,
    adminCurrentMovies.getCurrentMovies);

router.post('/currentMovies', adminRegisterLoginLogout.loginStatus,
    adminCurrentMovies.addCurrentMovies);

router.get('/screens/:screenType', adminRegisterLoginLogout.loginStatus,
    adminCurrentMovies.getScreens);

router.get('/movieSchedule/:movieImdbID?', adminRegisterLoginLogout.loginStatus,
    adminCurrentMovies.getMovieSchedule);

router.delete('/movieSchedule', adminRegisterLoginLogout.loginStatus,
    adminCurrentMovies.deleteMovieSchedule);

router.put('/movieSchedule', adminRegisterLoginLogout.loginStatus,
    adminCurrentMovies.updateMovieSchedule);

router.post('/movieSchedule', adminRegisterLoginLogout.loginStatus,
    adminCurrentMovies.addMovieSchedule);




module.exports = router;
