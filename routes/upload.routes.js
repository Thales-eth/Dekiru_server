const router = require("express").Router()
const { imageUploadMiddleware, audioUploadMiddleware } = require("../middlewares/upload")
const { uploadImage, uploadAudio } = require("../controllers/uploadController")

router.post("/", imageUploadMiddleware.single("imageUrl"), uploadImage)
router.post("/audio", audioUploadMiddleware.single("fileUrl"), uploadAudio)

module.exports = router
