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
        // console.log('Begin enrollment')
        // console.log(username)
        const user = await User.findOne({username: username});
        const course = await Course.findById(req.body.courseId);
        // console.log(course)
        // console.log(user)
        if (course.enrolledUsers.includes(user.username)) {
            res.status(402).send("User is already enrolled");
            return;
        }
        
        if (user.credits < course.credit) {
            res.status(403).send("Insufficient credits");
            return;
        }
        // console.log(user.credits)
        // console.log(course.credit)
        user.credits -= course.credit;
        // console.log(user.credits)
        // console.log(user)
        user.save();
        const teacher = await User.findOne({username: course.teacher});
        // console.log(teacher)
        teacher.credits += course.credit;
        // console.log(teacher)
        teacher.save();
        course.enrolledUsers.push(user.username);
        course.enrollment += 1;
        // console.log(course)
        course.save();
        // console.log(course)
        // console.log('End enrollment')
        res.send({user: user, course: course});
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
});

router.post("/api/unenroll", mongoChecker, authenticate, async (req, res) => {
    try {
        // console.log('Begin unenroll')
        const username = req.session.username;
        const user = await User.findOne({username: username});
        const course = await Course.findById(req.body.courseId);
        // console.log(course)
        // console.log(user)
        if (!course.enrolledUsers.includes(user.username)) {
            res.status(400).send("User is not already enrolled");
            return;
        }
        // console.log(user.credits)
        // console.log(course.credit)
        user.credits += course.credit;
        user.save();
        // console.log(user)
        const teacher = await User.findOne({username: course.teacher});
        // console.log(teacher)
        if (teacher.credits - course.credit >= 0) {
            teacher.credits -= course.credit;    
        }
        // console.log(teacher.credits)
        teacher.save();
        // console.log(teacher)
        let index = -1
        for (let i = 0 ; i < course.enrolledUsers.length; i++){
            if (course.enrolledUsers[i] === req.session.username){
                index = i
            }
        }

        if (index === -1){
            res.status(404).send("Index of rating not found")
            return
        }
        course.enrolledUsers.splice(index, 1);
        course.enrollment -= 1;
        course.save();
        // console.log(course)
        // console.log('End unenroll')
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