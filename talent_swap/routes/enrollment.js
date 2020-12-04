'use strict';

const express = require('express')
const router = express.Router(); // Express Router

// import the mongoose models
const { User } = require("./../models/user");
const { Course } = require("./../models/course")

// helpers/middlewares
const { mongoChecker, isMongoError } = require('./helpers/mongo_helpers');
const { authenticate } = require('./helpers/authentication');

router.post("/api/enrollment", mongoChecker, authenticate, async (req, res) => {
    try {
        const username = req.session.username;
        const user = await User.findOne({username: username});
        const course = await Course.findById(req.body.courseId);
        if (course.enrolledUsers.includes(user.username)) {
            res.status(402).send("User is already enrolled");
            return;
        }
        console.log(user.credits)
        console.log(course.credit)
        if (user.credits < course.credit) {
            res.status(403).send("Insufficient credits");
            return;
        }
        user.credits -= course.credit;
        user.save();
        course.enrolledUsers.push(user.username);
        course.enrollment += 1;
        course.save();
        res.send({user: user, course: course});
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
});

// export the router
module.exports = router;