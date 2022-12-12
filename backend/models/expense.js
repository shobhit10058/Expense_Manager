const mongoose = require('mongoose')
const Schema = mongoose.Schema

let expenseSchema = new Schema({
	userID: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	amount: {
		type: Number,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Expense', expenseSchema);