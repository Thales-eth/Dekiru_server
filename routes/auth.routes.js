const router = require("express").Router()

const { verifyToken } = require("../middlewares/verifyToken")
const { signup, login, getLoggedUser } = require("../controllers/auth.controller")

router.post('/signup', signup)
router.post('/login', login)
router.get('/getLoggedUser', verifyToken, getLoggedUser)

module.exports = router