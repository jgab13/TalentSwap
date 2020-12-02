/* server.js - Express server*/
'use strict';

const express = require('express')
const courseRouter = express.Router(); // Express Router

// import the mongoose models
const { ObjectID } = require('mongodb')
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
        enrollment: req.body.enrollment,
        rate: req.body.rate,
        description: req.body.description,
        level: req.body.level,
        description: req.body.description,
        enrolledUsers: req.body.enrolledUsers,
        ratings: req.body.ratings
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

//retrieve a course route
courseRouter.get('/api/courses/:id', mongoChecker, async (req, res) => {
    const id = req.params.id
    console.log(id)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
        return;  // so that we don't run the rest of the handler.
    }

    try {
        const course = await Course.findById(id)
        if (!course) {
            res.status(404).send('Resource not found')  // could not find this student
        } else { 
            res.send(course)
        }
    } catch(error) {
        console.log(error)
        res.status(500).send('Internal Server Error')  // server error
    }
})


//delete a course route
courseRouter.delete('/api/courses/:id', mongoChecker, async (req, res) => {
    const id = req.params.id
    console.log(id)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
        return;  // so that we don't run the rest of the handler.
    }

    try {
        const course = await Course.findByIdAndRemove(id)
        if (!course) {
            res.status(404).send('Resource not found')  // could not find this student
        } else { 
            res.send(course)
        }
    } catch(error) {
        console.log(error)
        res.status(500).send('Internal Server Error')  // server error
    }
})

// Create a review for a course
courseRouter.post('/api/courses/:id', mongoChecker, async (req, res) => {
    const id = req.params.id
    console.log(req.body)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
        return;  // so that we don't run the rest of the handler.
    }
    
    try {
        const course = await Course.findById(id)
        if (!course) {
            res.status(404).send('Resource not found')  // could not find this student
        } else { 
            // Adds reservation to the restaurant reservation object
            course.ratings.push({
                user: req.body.user,
                date: req.body.date,
                description: req.body.description,
                rating: req.body.rating
            })

            try {
                const result = await course.save()  
                    res.send(result)
            } catch(error) {
                console.log(error) // log server error to the console, not to the client.
                if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
                    res.status(500).send('Internal server error')
                } else {
                    res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
                }
            }
        }   
    } catch(error) {
        console.log(error)
        res.status(500).send('Internal Server Error')  // server error
    }
})


// Update the enrollment of a course - this route doesn't work
courseRouter.patch('/api/courses/:id', mongoChecker, async (req, res) => {
    const id = req.params.id
    console.log(req.body)
    console.log(req.body.user)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
        return;  // so that we don't run the rest of the handler.
    }
    
    try {
        const course = await Course.findById(id)
        if (!course) {
            res.status(404).send('Resource not found')  
        } else { 
            course.enrolledUsers.push({
                user: req.body.user,
            })

            course.enrollment += 1

            try {
                const result = await course.save()  
                    res.send(result)
            } catch(error) {
                console.log(error) // log server error to the console, not to the client.
                if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
                    res.status(500).send('Internal server error')
                } else {
                    res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
                }
            }
        }   
    } catch(error) {
        console.log(error)
        res.status(500).send('Internal Server Error')  // server error
    }
})

//Edit a review route - this route doesn't work yet
courseRouter.patch('/api/courses/:id/:rev_id', mongoChecker, async (req, res) => {
    const id = req.params.id;
    const revid = req.params.rev_id;
    console.log(id)
    console.log(revid)
    console.log(req.body)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
        return;  // so that we don't run the rest of the handler.
    }

    if (!ObjectID.isValid(revid)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
        return;  // so that we don't run the rest of the handler.
    }

    const fieldsToUpdate = {}
    req.body.map((change) => {
        console.log(change)
        const propertyToChange = change.path.substr(1) // getting rid of the '/' character
        fieldsToUpdate[propertyToChange] = change.value
    })

    try {
        const course = await Course.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, {new: true});
        if (!course) {
            res.status(404).send('Internal server error');
        } else {
            res.send(course);
        }
    } catch (error) {
        console.log(error);
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); // bad request for changing the user
        }
    }
})

//delete a review route
courseRouter.delete('/api/courses/:id/:rev_id', mongoChecker, async (req, res) => {
    const id = req.params.id;
    const revid = req.params.rev_id;
    console.log(id)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
        return;  // so that we don't run the rest of the handler.
    }

   
    try {
        const course = await Course.updateOne({_id: id},
                                           { $pull: {"ratings": {_id: revid}}});
        if (!course) {
            res.status(404).send('Internal server error');
        } else {
            
            console.log(course)
            res.send(course);
        }
    } catch (error) {
        console.log(error);
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); // bad request for changing the user
        }
    }
})

// export the router
module.exports = courseRouter;