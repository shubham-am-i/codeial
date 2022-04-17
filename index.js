const express = require('express');
const { engine } = require('express/lib/application');
const app = express()
const port = 8000;
// require database
const db = require('./config/mongoose');


// set up static folder, express-ejs-Layouts and use it
app.use(express.static('assests'));
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//  use express router
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