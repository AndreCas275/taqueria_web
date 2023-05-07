const express = require('express');
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');
const pool = require('./database');
const { format } = require('timeago.js');
const { puertos } = require('./config');

//initializations
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middleware
//** */
//app.use(session({
//    secret: 'blablablablablablablablablablablabla',
//    resave: false,
//    saveUninitialized: false,
//    store: new MySQLStore(database)
//}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req, res, next) => {
    app.locals.success_hbs = req.flash('Correctamente');
    app.locals.message_hbs = req.flash('message');
    app.locals.user = req.user;
    next();
})

//Routes
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/linker', require('./routes/links'));
app.use('/pensamientos', require('./routes/thinks'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting
const server = app.listen(puertos.PORT, () => {
    console.log('Server on port ', puertos.PORT);
});