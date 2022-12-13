

const dateBeforeXFromNow = (daysBefore) => {
	const date = new Date();
	date.setDate(date.getDate() - daysBefore);
	return date;
}

module.exports = { dateBeforeXFromNow };