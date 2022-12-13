const router = require('express').Router()
const { addNewExpense, updateExpense, getSummaryUptoXDays } = require('../controllers/expense');
const getUserFromJWT = require('../middlewares/validateUser');

router.post('/new', getUserFromJWT, addNewExpense);
router.put('/update/:id', getUserFromJWT, updateExpense);
router.get("/summaryUpto", getUserFromJWT, getSummaryUptoXDays)

module.exports = router;