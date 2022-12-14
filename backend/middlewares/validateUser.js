const {verifyJWT} = require('../utilities/jwtAuth')

const getUserFromJWT = (req, res, next) => {
	const token = req.header('auth-token');
	const data = verifyJWT(token);
	if(!data){
		return res.status(401).json({message: "user not logged in"});
	}
	req.body.userID = data.userID;
	next();
}

module.exports = getUserFromJWT;