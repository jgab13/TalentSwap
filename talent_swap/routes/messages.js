/* server.js - Express server*/
'use strict';
const log = console.log

// express
log('Express server')

const express = require('express')
const router = express.Router(); // Express Router

// import the mongoose models
const { Message } = require("./../models/message");

// helpers/middlewares
const { mongoChecker, isMongoError } = require('./helpers/mongo_helpers');
const { authenticate } = require('./helpers/authentication');
const { request } = require('express');

router.post('/api/messages', mongoChecker, authenticate, async (req, res) => {
    const message = new Message({
		senderName: req.session.username,
		receiverName: req.body.target,
		contents: req.body.contents,
		timestamp: Date.now()
	});
	try {
		const newMessage = await message.save()
		res.send(newMessage)
	} catch (error) {
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			log(error)
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})

router.get('/api/messages', mongoChecker, async (req, res) => {
    try {
		const username = req.session.username;
		const target = req.body.target;
		const messages = await Message.find({
			$or: [
				{senderName: username, receiverName: target},
				{senderName: target, receiverName: username}
			]
		});
		res.send(messages);
	} catch (error) {
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			log(error)
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})

// export the router
module.exports = router;