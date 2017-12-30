var express = require('express');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var port = 3000;


// Connect to MongoDB and turn on the API
mongoose.connect('mongodb://localhost:27017/auth', (err) => {
    if(err) {
        console.log('Something went wrong while connecting to the database!')
    } else {
        app.listen(port, function() {
            console.log('API listening on localhost:' + port);
        });
    }
});

// JSON for POST methods
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// User Schema
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    }
});

// Models
var User = mongoose.model('users', userSchema);


// Salt for bcrypt
var saltRounds = 10;

// Route POST for register
app.post('/api/register', (req, res) => {
    // Save params on their vars
    var email = req.body.email;
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;

    // Hash password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        // Create a new user
        var saveUser = new User();
        saveUser.email = email;
        saveUser.name = name;
        saveUser.username = username;
        saveUser.password = hash;

        // Save it to the database
        saveUser.save((err, savedUser) => {
            if(err) {
                console.log(err);
                res.send('An error occured while saving the user on the database.');
            } else {
                console.log('User ' + username + ' saved in the database!')
                res.send('User ' + username + ' saved in the database!')
            }
        })
    });
});

// Route POST for login
app.post('/api/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    // Look for the user on the database
    User.findOne({
        email: email,
    },(err, user) => {
        if(!user) {
            res.send('That email or password don\'t exist or are wrong!')
        } else {
            // Compare password on the request to the password on the database
            bcrypt.compare(password, user.password, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                if(resp == true) {
                    res.send(user)
                } else {
                    res.send('That email or password don\'t exist or are wrong!')
                }
            });
        }
})
});