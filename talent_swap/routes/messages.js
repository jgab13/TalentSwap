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

router.post('/api/messages', mongoChecker, async (req, res) => {
    if (req.session.user) {
		const message = new Message({
			senderName: req.session.username,
			receiverName: req.body.target,
			contents: req.body.contents,
			timestamp: Date.now()
		});
		try {
			// Save the user
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
    } else {
        res.status(401).send();
    }
})

// export the router
module.exports = router;