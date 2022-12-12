const User = require('../models/user')
const { hashPassword, verifyPassword } = require('../utilities/managePasswords')
const { genJWT, verifyJWT } = require('../utilities/jwtAuth');

module.exports = {
	signUp: async (req, res) => {
		const { username, password } = req.body;
		const secPassword = await hashPassword(password);

		try {
			const newUser = new User({ username: username, password: secPassword });
			await newUser.save();

			const token = genJWT({userId: newUser.id});
			res.status(200).json({token: token, message: "user details saved"});
		} catch (e) {
			console.log("error occured", e);
			res.status(500).json({message: "server error occurred"})
		}
	},
	login: async (req, res) => {
		const { username, password } = req.body;
		try{
			const user = await User.findOne({username});
			if(!user){
				res.status(401).json({message: "please login with correct credentials"});
			}else{
				const isCorrPass = await verifyPassword(password, user.password);
				if(!isCorrPass){
					res.status(401).json({message: "please login with correct credentials"});
				}else{
					const token = genJWT({userId: user.id});
					res.status(200).json({token: token, message: "user logged in successfully"});
				}
			}
		}catch(e){
			console.log("error occured", e);
			res.status(500).json({message: "server error occurred"})
		}
	}
}