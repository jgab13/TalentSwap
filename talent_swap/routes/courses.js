/* server.js - Express server*/
'use strict';

const express = require('express')
const courseRouter = express.Router(); // Express Router

// import the mongoose models
const { ObjectID } = require('mongodb')
const { Course } = require("./../models/course");

// helpers/middlewares
const { mongoChecker, isMongoError } = require('./helpers/mongo_helpers');
const { authenticate } = require('./helpers/authentication');

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

//update a course
courseRouter.patch('/api/courses/update/:id', mongoChecker, async (req, res) => {
    const id = req.params.id
    const attrs = req.body.attr
    const newValues = req.body.newValue

    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
        return;  // so that we don't run the rest of the handler.
    }

     try {
        let course = await Course.findById(id)
        if (!course) {
            res.status(404).send('Resource not found')  // could not find this student
        } else { 
            for (let i in attrs) {
                course[attrs[i]] = newValues[i]
            }
            await course.save()
            res.send(course)
        }
    } catch(error) {
        console.log(error)
        res.status(500).send('Internal Server Error')  // server error
    }
})

//Add authentication for many of these routes.
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
            res.send({ course })
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


// Update the enrollment of a course - should check if user is already in the course and if 
//course enrollment has been exceeded.
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

            if (course.enrollment == course.capacity){
                res.status(400).send('Bad request - course is full')
                return
            } else if (course.enrolledUsers.includes(req.body.user)){
                res.status(400).send('Bad request - user already enrolled')
                return
            }
            course.enrolledUsers.push(req.body.user)
            course.enrollment += 1

            const result = await course.save()  
            res.send(result)
        }   
    } catch(error) {
        console.log(error)
        res.status(500).send('Internal Server Error')  // server error
    }
})

//Edit a review route
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

    try {
        const course = await Course.findById(id);
        if (!course) {
            res.status(404).send('Internal server error');
        } else {
            console.log(course)
            let index = -1
            for (let i = 0; i < course.ratings.length; i++){
                if (String(course.ratings[i]._id) === (String(revid))){
                    index = i
                }
            }
            if (index === -1){
                console.log('index is invalid')
                res.status(404).send('Resource not found')
                return
            }

            if (req.body.description !== undefined){
                course.ratings[index].description = req.body.description    
            }
            
            if (req.body.rating !== undefined){
                course.ratings[index].rating = req.body.rating   
            }

            if (req.body.rating !== undefined){
                course.ratings[index].rating = req.body.rating   
            }
            await course.save()
            res.send(course)
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