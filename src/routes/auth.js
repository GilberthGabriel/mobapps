
const router = require("express").Router()
const controller = require("../controllers/auth")

router.post('/', controller.sign_in)
router.post('/signup', controller.sign_up)

module.exports = router
