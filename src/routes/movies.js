
const router = require("express").Router()
const controller = require("../controllers/movies")
const image_upload = require("../middlewares/image_upload")
const is_auth = require("../middlewares/is_authenticated")

router.use(is_auth)
router.get('/', controller.get)
router.put('/', image_upload, controller.update)
router.post('/', image_upload, controller.add)

module.exports = router
