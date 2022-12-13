const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

const genJWT = (data) => {
	const authtoken = jwt.sign(data, JWT_SECRET);
	return authtoken;
}

const verifyJWT = (token) => {
	let data = null;
	try {
		data = jwt.verify(token, JWT_SECRET);
	} catch (e) {
		data = null;
		console.log("error occurred", e);
	}
	return data;
}

module.exports = { genJWT, verifyJWT };