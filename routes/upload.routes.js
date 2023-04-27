const router = require("express").Router()
const fileUploader = require("../middlewares/upload")
const { uploadImage } = require("../controllers/uploadController")

router.post("/", fileUploader.single("imageUrl"), uploadImage)

module.exports = router
