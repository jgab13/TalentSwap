/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
const mongoose = require('mongoose')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/TalentSwapAPI'
// const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://dev:4PJDWYrGfhxlCYaa@csc309.ngat3.mongodb.net/test'
//mongodb+srv://dev:4PJDWYrGfhxlCYaa@csc309.ngat3.mongodb.net/TalentSwapAPI?retryWrites=true&w=majority

mongoose.connect(mongoURI, 
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
	.catch((error) => { 
		console.log('Error connecting to mongodb. Timeout reached.') 
	})
;

// Fix DeprecationWarning
mongoose.set('useFindAndModify', false);

module.exports = { mongoose }  // Export the active connection.