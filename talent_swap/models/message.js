/* Message mongoose model */
const mongoose = require('mongoose')

const Message = mongoose.model('Message', {
	timestamp: {
		type: Number,
		required: true
	},
	senderName: { // username
		type: String,
		required: true
	},
	receiverName: { // username
		type: String,
		required: true
    },
    contents: {
        type: String,
        required: true
    }
})

module.exports = { Message }
