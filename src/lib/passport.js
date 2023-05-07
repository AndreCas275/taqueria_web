const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers')

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username_hbs',
    passwordField: 'password_hbs',
    passReqToCallback: true
}, async(req, username_hbs, password_hbs, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username_hbs]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password_hbs, user.password)
        if (validPassword) {
            done(null, user, req.flash('Correctamente', 'Bienvenido ' + user.username));
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El usuario ingresado no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username_hbs',
    passwordField: 'password_hbs',
    passReqToCallback: true
}, async(req, username_hbs, password_hbs, done) => {
    const { fullname_hbs } = req.body;
    const newUser = {
        username: username_hbs,
        password: password_hbs,
        fullname: fullname_hbs
    }
    newUser.password = await helpers.encryptPassword(password_hbs);
    const result = await pool.query('insert into users set ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});