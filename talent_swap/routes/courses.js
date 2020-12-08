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
        level: req.body.level,
        capacity: req.body.capacity,
        enrollment: 0,
        rate: 0,
        description: req.body.description,
        level: req.body.level,
        enrolledUsers: req.body.enrolledUsers, //are these necessary?
        ratings: req.body.ratings //are these necessary?
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

//retrieve all courses route - Jonathan added - this one works
courseRouter.get('/api/courses', mongoChecker, async (req, res) => {

    try {
        const course = await Course.find()
        if (!course) {
            res.status(404).send('Resource not found')  // could not find this student
        } else { 
            console.log("searching database found these courses: ", course)

            res.send({ 
                "courses": course,
                "searchedCourses": course
        
        })
        }
    } catch(error) {
        console.log(error)
        res.status(500).send('Internal Server Error')  // server error
    }
})

// retrieve courses related to the given search keyword
courseRouter.get('/api/courses/keyword=:key', mongoChecker, async (req, res) => {
    const keyword = req.params.key.toLowerCase()
    console.log(`seaching for "${keyword}"`)
    try {
        // call find twice instead of call find once with a || filter since 
        // I want topic matched courses (considered as the most relevant ones) displayed before 
        // description matched courses

        const topicMatch = await Course.find({topic: {$regex: keyword, $options: 'i'}})
        const descMatch = await Course.find({description: {$regex: keyword, $options: 'i'}})
        let courses
        if (!topicMatch && !descMatch) {
            res.status(404).send(`No courses found for "${req.params.key}"`) 
            return
        } else if (!topicMatch){
            courses = descMatch
        } else if (!descMatch) {
            courses = topicMatch
        } else {
            courses = topicMatch.concat(descMatch)
        }
        console.log("searching database found these courses: ", courses)
        res.send({
            "searchedCourses": courses
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')  
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
            res.send({ course })
        }
    } catch(error) {
        console.log(error)
        res.status(500).send('Internal Server Error')  // server error
    }
})


//delete a course route
courseRouter.delete('/api/courses/:id', mongoChecker, authenticate, async (req, res) => {
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
courseRouter.post('/api/courses/:id', mongoChecker, authenticate, async (req, res) => {
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
                    res.send({course: result})
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

//Edit a review route
courseRouter.patch('/api/courses/:id', mongoChecker, authenticate, async (req, res) => {
    const id = req.params.id;
    console.log(id)
    console.log(req.body)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
        return;  // so that we don't run the rest of the handler.
    }

    try {
        const course = await Course.findById(id);
        console.log('This is the course')
        if (!course) {
            res.status(404).send('Internal server error');
        } else {
            console.log(course)
            let index = -1
            for (let i = 0; i < course.ratings.length; i++){
                if (String(course.ratings[i].user) === (String(req.body.user))){
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
            
            if (req.body.date !== undefined){
                course.ratings[index].date = req.body.date   
            }

            if (req.body.rating !== undefined){
                course.ratings[index].rating = req.body.rating   
            }
            console.log(course.ratings[index])
            await course.save()
            res.send({course: course})
        }
    } catch (error) {
        console.log(error);
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request
            res.status(500).send('Internal server error');
        } else {
            console.log('Fuck here I am')
            res.status(400).send('Bad Request'); // bad request for changing the user
        }
    }
})

//delete a review route
courseRouter.delete('/api/courses/review/:id', mongoChecker, authenticate, async (req, res) => {
    const id = req.params.id;
    console.log(id)
    console.log(req.body.user)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
        return;  // so that we don't run the rest of the handler.
    }
   
    try {
        const course = await Course.findById(id)
        if (!course) {
            res.status(404).send('Internal server error');
        } else {
            let index = -1
            for (let i = 0; i < course.ratings.length; i++){
                if (course.ratings[i].user === req.body.user){
                    index = i
                }
            }
            if (index === -1){
                console.log('index is invalid')
                res.status(404).send('Resource not found')
                return
            }

            console.log(course.ratings[index])
            const revisedCourse = course.ratings.splice(index,1)
            try {
                const result = await course.save()  
                    res.send(result)
            } catch(error) {
                log(error) // log server error to the console, not to the client.
                if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
                    res.status(500).send('Internal server error')
                } else {
                    res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
                }
            }
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