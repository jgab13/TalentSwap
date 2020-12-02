'use strict';

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
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})

router.get('/api/messages/:target', mongoChecker, authenticate, async (req, res) => {
    try {
		const username = req.session.username;
		const target = req.params.target;
		const messages = await Message.find({
			$or: [
				{senderName: username, receiverName: target},
				{senderName: target, receiverName: username}
			]
		}).sort({ timestamp: "asc" });
		res.send(messages);
	} catch (error) {
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})

router.get('/api/message-contacts', mongoChecker, authenticate, async (req, res) => {
    try {
		const username = req.session.username;
		const target = req.body.target;
		const receivers = await Message.aggregate([
			{
				$match: { senderName: username }
			},
			{
				$group: {
					_id: "$receiverName",
					lastMessage: { $max: "$timestamp" }
				}
			}
		]);
		const senders = await Message.aggregate([
			{
				$match: { receiverName: username }
			},
			{
				$group: {
					_id: "$senderName",
					lastMessage: { $max: "$timestamp" }
				}
			}
		]);
		const contactsLatestTimestamp = new Map();
		const addToMap = (contact) => {
			const contactName = contact._id;
			if (contactsLatestTimestamp.has(contactName)) {
				if (contactsLatestTimestamp.get(contactName) < contact.lastMessage) {
					contactsLatestTimestamp.set(contactName, contact.lastMessage);
				}
			} else {
				contactsLatestTimestamp.set(contactName, contact.lastMessage);
			}
		}
		senders.forEach(addToMap);
		receivers.forEach(addToMap);
		const contacts = Array.from(contactsLatestTimestamp)
			.sort((a, b) => {
				if (a[1] < b[1]) {
					return -1;
				}
				if (a[1] > b[1]) {
					return 1;
				}
				return 0;
			})
			.map(el => el[0]);
		res.send(contacts);
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
module.exports = router;