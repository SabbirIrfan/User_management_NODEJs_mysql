const e = require('express');
const mysql = require('mysql');

//connection pool

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

});





// view users 

exports.view = (req, res) => {

    // res.render('home');


    //connect to DB
    pool.getConnection((err, connction) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connction.threadId);

        // Use the connection

        connction.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {

            // when done with the connection release it
            connction.release();

            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err)
            }

            console.log('the data from user table: \n', rows);
        });
    });
}

// find user search

exports.find = (req, res) => {

    //connect to DB
    pool.getConnection((err, connction) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connction.threadId);

        let searchTerm = req.body.search;



        // Use the connection

        connction.query('SELECT * FROM user WHERE First_Name LIKE ?', ['%' + searchTerm + '%'], (err, rows) => {

            // when done with the connection release it
            connction.release();

            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err)
            }

            console.log('the data from user table: \n', rows);
        });
    });

}

exports.form = (req, res) => {
    res.render('add_user');
}

// add user

exports.create = (req, res) => {

    const {First_Name,Last_Name,Email ,Git_link,comments} = req.body;

    pool.getConnection((err, connction) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connction.threadId);

        // Use the connection
        connction.query('INSERT INTO user SET First_Name=?,Last_Name=?,Email=?,Git_link=?,comments=? ',[ First_Name,Last_Name,Email ,Git_link,comments], (err, rows) => {

            // when done with the connection release it
            connction.release();

            if (!err) {
                res.render('add_user', {alert : 'user added successfully.'});
            } else {
                console.log(err)
            }

            console.log('the data from user table: \n', rows);
        });



    });

}

// Edit user

exports.edit = (req, res) => {

    pool.getConnection((err, connction) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connction.threadId);

        // Use the connection

        connction.query('SELECT * FROM user WHERE id = ?', [req.params.id] , (err, rows) => {

            // when done with the connection release it
            connction.release();

            if (!err) {
                res.render('edit_user', { rows });
            } else {
                console.log(err)
            }

            console.log('the data from user table: \n', rows);
        });
    });
}


//  update user
exports.update = (req, res) => {

    const {First_Name,Last_Name,Email ,Git_link,comments} = req.body;

    pool.getConnection((err, connction) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connction.threadId);

        // Use the connection

        connction.query('UPDATE user SET First_Name = ?, Last_Name = ? WHERE id = ?', [First_Name, Last_Name, req.params.id] , (err, rows) => {

            // when done with the connection release it
            connction.release();

            if (!err) {
                pool.getConnection((err, connction) => {
                    if (err) throw err; // not connected
                    console.log('Connected as ID' + connction.threadId);
            
                    // Use the connection
            
                    connction.query('SELECT * FROM user WHERE id = ?', [req.params.id] , (err, rows) => {
            
                        // when done with the connection release it
                        connction.release();
            
                        if (!err) {
                            res.render('edit_user', { rows , alert : 'user updated succesfully! '});
                        } else {
                            console.log(err)
                        }
            
                        console.log('the data from user table: \n', rows);
                    });
                });

            } else {
                console.log(err)
            }

            console.log('the data from user table: \n', rows);
        });
    });
}