/* Course mongoose model */
'use strict';
const mongoose = require('mongoose')
// import { User } from './user.js'
const { User } = require('./user')

const RatingSchema = new mongoose.Schema({
    user: String,
    date: Date,
    description: String,
    rating: Number
});

const Course = mongoose.model('Course', {
	topic: String,
	teacher: String,
	starttime: Date,
	endtime: Date,
	level: String,
	credit: Number,
	capacity: Number,
	enrollment: Number,
	rate: Number,
	description: String,
	picture: String,
	level: String,
	enrolledUsers: [String],
	ratings: [RatingSchema]
	//Need to add rating schema
})

module.exports = { Course }
