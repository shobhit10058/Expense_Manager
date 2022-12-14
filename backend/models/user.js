const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	budget: {
		type: Number,
		default: 0
	},
	amountLeft: {
		type: Number,
		default: 0
	},
	categories: {
		type: [String],
		default: []
	},
	currentExpensesIDs: [
		{
			type: Schema.Types.ObjectId,
			ref: "Expense"
		}
	]
})

const userModel = mongoose.model('User', userSchema);
userModel.createIndexes();

module.exports = userModel;