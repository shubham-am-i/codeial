// requiring dependecies of packages
const express = require('express');
const cookieParser = require('cookie-parser');
const { engine } = require('express/lib/application');
const expressLayouts = require('express-ejs-layouts');
// require database
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

const app = express()


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css', 
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
// set up static folder, express-ejs-Layouts,cookie-parser, body-parser and use it
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);


// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set view engine
app.set('view engine', 'ejs');

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment 
    secret: 'nothing',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }, 
    store:  MongoStore.create(
        {
            // mongooseConnection: db,
            mongoUrl: 'mongodb://localhost/codeial_development',
            autoRemove: 'disabled'
        }
        // function (err) {
        //     console.log(err || 'connect mongodb setup ok');
        // }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//  use express router [sequence ==> index.js => routes => controllers => views]
app.use('/', require('./routes'));


app.listen(8000)