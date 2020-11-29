/* Course mongoose model */
'use strict';
const mongoose = require('mongoose')
// import { User } from './user.js'
const { User } = require('./user')

const Course = mongoose.model('Course', {
	topic: String,
	teacher: String,
	starttime: Date,
	endtime: Date,
	credit: Number,
	capacity: Number,
	enrollment: Number,
	rate: Number,
	description: String,
	level: String,
	enrolledUsers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
	//Need to add rating schema
})

module.exports = { Course }
