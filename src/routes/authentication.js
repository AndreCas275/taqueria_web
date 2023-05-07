const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auths');

router.get('/registro', isNotLoggedIn, (req, res) => {
    res.render('auth/signup')
});
router.post('/registro', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/perfil',
    failureRedirect: '/registro',
    failureFlash: true
}));

router.get('/ingreso', isNotLoggedIn, (req, res) => {
    res.render('auth/signin')
})
router.post('/ingreso', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/perfil',
        failureRedirect: '/ingreso',
        failureFlash: true
    })(req, res, next);
})

router.get('/perfil', isLoggedIn, (req, res) => {
    res.render('profile');
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/ingreso');
});

module.exports = router;