// requiring dependecies of packages
const express = require('express');
const cookieParser = require('cookie-parser');
const { engine } = require('express/lib/application');
const expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 8000;
// require database
const db = require('./config/mongoose');


// set up static folder, express-ejs-Layouts,cookie-parser, body-parser and use it
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);


// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//  use express router [sequence ==> index.js => routes => controllers => views]
app.use('/', require('./routes'));

// set view engine
app.set('view engine', 'ejs');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running server`);
    } else {
        console.log(`Server is running on port ${port}`);
    }
})