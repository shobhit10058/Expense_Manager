const Expense = require('../models/expense');
const User = require('../models/user')
const { dateBeforeXFromNow } = require('../utilities/date');

module.exports = {
	addNewExpense: async (req, res) => {
		const { body } = req;
		try {
			const user = await User.findById(body.userID);
			const { userID, category, amount } = body;
			if (!user.categories.includes(category)) {
				return res.status(400).json({ message: "invalid category" });
			}
			if (amount > user.amountLeft) {
				return res.status(400).json({ message: "budget not enough" });
			}
			const expense = new Expense({ userID, category, amount });
			user.currentExpensesIDs.push(expense._id);
			user.amountLeft = user.amountLeft - amount;
			await expense.save();
			await user.save();
			res.status(200).json({ message: "expense saved", id: expense._id });
		} catch (e) {
			res.status(400).json({ message: "expense not saved" });
		}
	},

	// only update amount or deleted
	updateExpense: async (req, res) => {
		const { body } = req;
		try {
			const { userID, amount, deleted } = body;
			const { id } = req.params;
			const user = await User.findById(userID);
			const expense = await Expense.findById(id);
			if (deleted != undefined) {
				if (expense.deleted !== deleted) {
					let newAmount = user.amountLeft + ((2 * deleted - 1) * expense.amount);
					if (newAmount >= 0) {
						expense.deleted = deleted;
						user.amountLeft = newAmount;
						await expense.save();
						await user.save();
						return res.status(200).json({ message: "expense updated" });
					}
					return res.status(400).json({ message: "budget not enough" });
				}
			}
			else if ((amount !== undefined) && (!expense.deleted)) {
				let newAmount = user.amountLeft + (expense.amount - amount);
				if (newAmount >= 0) {
					expense.amount = amount;
					user.amountLeft = newAmount;
					await expense.save();
					await user.save();
					return res.status(200).json({ message: "expense updated" });
				}
				return res.status(400).json({ message: "budget not enough" });
			}
		} catch (e) {
			res.status(400).json({ message: "expense not updated" });
		}
	},

	// gives expense data upto x days from now
	getSummaryUptoXDays: async (req, res) => {
		const { body } = req;
		try {
			const { userID } = body;
			const { days } = req.query;
			const expenses = await Expense.find({ userID }).where('date').gt(dateBeforeXFromNow(days)).sort('date').where('deleted').equals(false).select('-userID');
			res.status(200).json({ data: expenses, message: "data retrieved" });
		} catch (e) {
			res.status(400).json({ message: "data could not be retrieved" });
		}
	}
}