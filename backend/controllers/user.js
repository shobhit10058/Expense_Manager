const User = require('../models/user');
const Expense = require('../models/expense');
const { hashPassword, verifyPassword } = require('../utilities/managePasswords')
const { genJWT, verifyJWT } = require('../utilities/jwtAuth');
const expense = require('../models/expense');

module.exports = {
	signUp: async (req, res) => {
		const { username, password } = req.body;
		const secPassword = await hashPassword(password);

		try {
			const newUser = new User({ username: username, password: secPassword });
			await newUser.save();

			const token = genJWT({ userID: newUser.id });
			res.status(200).json({ token: token, message: "user details saved" });
		} catch (e) {
			res.status(400).json({ message: "user details not saved" });
		}
	},
	login: async (req, res) => {
		const { username, password } = req.body;
		try {
			const user = await User.findOne({ username });
			if (!user) {
				res.status(401).json({ message: "please login with correct credentials" });
			} else {
				const isCorrPass = await verifyPassword(password, user.password);
				if (!isCorrPass) {
					res.status(401).json({ message: "please login with correct credentials" });
				} else {
					const token = genJWT({ userID: user.id });
					res.status(200).json({ token: token, message: "user logged in successfully" });
				}
			}
		} catch (e) {
			res.status(500).json({ message: "server error occurred" })
		}
	},
	updateSetting: async (req, res) => {
		const { body } = req;
		try {
			const { budget, categories, userID} = body;
			const user = await User.findById(userID);
			if(budget)
				user.budget = budget;
			user.amountLeft = user.budget;
			if(categories)
				user.categories = categories;
			await Expense.deleteMany({ "_id": { "$in": user.currentExpensesIDs } });
			user.currentExpensesIDs = [];
			await user.save();
			res.status(200).json({ message: "setting updated" });
		} catch (e) {
			res.status(400).json({ message: "setting not updated" });
		}
	},
	currentExpenses: async (req, res) => {
		const { body } = req;
		try {
			const user = await User.
				findById(body.userID).
				populate("currentExpensesIDs")
			let data = [];
			if (user.currentExpensesIDs.length > 0 && user.currentExpensesIDs[0].date.toDateString() != new Date().toDateString()) {
				user.currentExpensesIDs = [];
				user.amountLeft = user.budget;
				user.save();
			} else {
				data = user.currentExpensesIDs.map(expense => {
					return { "amount": expense.amount, "category": expense.category, "deleted": expense.deleted, "id": expense._id}
				})
			}
			res.status(200).json({ data: data, message: "current expenses retrieved" });
		} catch (e) {
			res.status(400).json({ message: "could not get current expenses" });
		}
	},
	getDetails: async (req, res) => {
		const { body } = req;
		try {
			const { userID } = body;
			const user = await User.findById(userID).select("-_id username budget amountLeft categories");
			return res.status(200).json({ data: user, message: "user details retrieved" });
		} catch (e) {
			res.status(400).json({ message: "could not retrieve user details" });
		}
	}
}