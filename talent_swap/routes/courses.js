/* server.js - Express server*/
'use strict';

const express = require('express')
const courseRouter = express.Router(); // Express Router

// import the mongoose models
const { Course } = require("./../models/course");

// helpers/middlewares
const { mongoChecker, isMongoError } = require('./helpers/mongo_helpers');

courseRouter.post('/api/courses', mongoChecker, async (req, res) => {

    console.log(req.body)
    // Create a new course
    const course = new Course({
        topic: req.body.topic,
        teacher: req.body.teacher,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        credit: req.body.credit,
        capacity: req.body.capacity,
        description: req.body.description
    })

    try {
        // Save the user
        const newCourse = await course.save()
        res.send(newCourse)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            console.log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// export the router
module.exports = courseRouter;