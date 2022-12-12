const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


const app = express()


// connect to db
mongoose.connect(process.env.DB_URI, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true
}, () => {
	console.log('connected to db successfully.')
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
	console.log('server is running')
})