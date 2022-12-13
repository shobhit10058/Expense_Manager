require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require("./routes/user");
const expenseRouter = require("./routes/expense");

const app = express();

// middlewares
app.use(cors()); 
app.use(express.json());

// routes
app.use('/users', userRouter);
app.use('/expense', expenseRouter);

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