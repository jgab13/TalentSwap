'use strict';

const express = require('express')
const router = express.Router(); // Express Router

// import the mongoose models
const { User } = require("./../models/user");
const { Ban } = require("./../models/ban");

// helpers/middlewares
const { mongoChecker, isMongoError } = require('./helpers/mongo_helpers');
const { authenticate } = require('./helpers/authentication');

router.post("/api/banned", mongoChecker, authenticate, async (req, res) => {
    try {
        const username = req.session.username;
        const user = await User.findOne({username: username});
        if (user.userType !== "admin") {
            res.status(401).send();
        }
        const ban = new Ban({
            bannedUsername: req.body.username,
            timestamp: Date.now(),
            adminUsername: username
        });
        const newBan = await ban.save();
        res.send(newBan);
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
});

router.delete("/api/banned", mongoChecker, authenticate, async (req, res) => {
    try {
        const username = req.session.username;
        const user = await User.findOne({username: username});
        if (user.userType !== "admin") {
            res.status(401).send();
        }
        const deletedBan = await Ban.findOneAndDelete({bannedUsername: req.body.username});
        res.send(deletedBan);
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
});

router.get("/api/banned", mongoChecker, authenticate, async (req, res) => {
    try {
        const username = req.session.username;
        const user = await User.findOne({username: username});
        if (user.userType !== "admin") {
            res.status(401).send();
        }

        const bans = await Ban.find({});
        res.send(bans);
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request')
        }
    }
});

// export the router
module.exports = router;