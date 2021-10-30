const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mysql = require('mysql')


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//parsing middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// parse application/json

app.use(bodyParser.json())

// static files
app.use(express.static('public'));

// templeting Engine
app.engine(
    'hbs',
    exphbs({
       extname: '.hbs',
       
    })
 );




// connection pool

const pool =  mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME,

});


//connect to DB
pool.getConnection((err, connction) => {
    if(err) throw err; // not connected
    console.log('Connected as ID' + connction.threadId);
});

app.set('view engine', 'hbs');

const routes = require('./serever/routes/user');
app.use('/', routes);


app.listen(port, () => console.log('Listening to port ${port}'))