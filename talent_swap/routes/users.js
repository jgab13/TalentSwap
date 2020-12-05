'use strict';

const express = require('express')
const router = express.Router(); // Express Router

// import the mongoose models
const { User } = require("./../models/user");

// helpers/middlewares
const { mongoChecker, isMongoError } = require('./helpers/mongo_helpers');
const { authenticate } = require('./helpers/authentication');

const formatUser = (user) => {return {
    username: user.username,
    userType: user.userType,
    name: user.name,
    credits: user.credits,
    bio: user.bio,
    expertise: user.expertise,
    development: user.development,
    coursesTeaching: user.coursesTeaching,
    coursesLearning: user.coursesLearning
}}

// A route to login and create a session
router.post("/users/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Use the static method on the User model to find a user
    // by their username and password
    User.findByUsernamePassword(username, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.username = user.username; // we will later send the username to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            res.send(formatUser(user));
        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user
router.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a user is logged in on the session
router.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.username });
    } else {
        res.status(401).send();
    }
});

router.post('/api/users', mongoChecker, async (req, res) => {
    // Create a new user
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        credits: 10
    })

    try {
        // Save the user
        const newUser = await user.save()
        req.session.user = newUser._id;
        req.session.username = newUser.username;
        res.send(formatUser(newUser));
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

//admin user route
router.post('/api/adminuser', mongoChecker, async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        userType: "admin"
    })

    try {
        // Save the user
        const newUser = await user.save()
        req.session.user = newUser._id;
        req.session.username = newUser.username;
        res.send({ currentUser: newUser.username })
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// https://tools.ietf.org/html/rfc6902#section-3
router.patch('/api/users/:username', mongoChecker, authenticate, async (req, res) => {
    const username = req.params.username;

    const fieldsToUpdate = {}
    req.body.map((change) => {
        const propertyToChange = change.path.substr(1) // getting rid of the '/' character
        fieldsToUpdate[propertyToChange] = change.value
    })

    try {
        const user = await User.findOneAndUpdate({username: username}, {$set: fieldsToUpdate}, {new: true});
        if (!user) {
            res.status(404).send('Internal server error');
        } else {
            res.send(user);
        }
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); // bad request for changing the user
        }
    }
});

router.get('/api/users/:username', mongoChecker, authenticate, async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.findOne({ username: username });
        res.send(formatUser(user));
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); // bad request for changing the user
        }
    }
});

//get a user
router.get('/api/users/get/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.findOne({ username: username });
        res.send({
            user: user
        });
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); // bad request for changing the user
        }
    }
});

// export the router
module.exports = router;