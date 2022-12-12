const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
}

const verifyPassword = async (password, hashedPassword) => {
	try{
		const result = await bcrypt.compare(password, hashedPassword);
		return result;
	}catch(e){
		return false;
	}
}

module.exports = { hashPassword, verifyPassword }
