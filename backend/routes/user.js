const router = require('express').Router()
const { signUp, login, updateSetting, currentExpenses, getDetails} = require('../controllers/user')
const getUserFromJWT = require('../middlewares/validateUser');

router.post('/signUp', signUp);
router.post('/login', login);
router.put('/updateSetting', getUserFromJWT, updateSetting);
router.get('/currentExpenses', getUserFromJWT, currentExpenses);
router.get('/getDetails', getUserFromJWT, getDetails);

module.exports = router;