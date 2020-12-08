/* User model */
'use strict';

const mongoose = require('mongoose')
// const validator = require('validator')
const bcrypt = require('bcryptjs')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const BanSchema = new mongoose.Schema({
	bannedUsername: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true
	}, 
	timestamp: {
		type: Number,
		required: true
    },
    adminUsername: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true
	}
})

const Ban = mongoose.model('Ban', BanSchema)
module.exports = { Ban }

