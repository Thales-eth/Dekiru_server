const router = require("express").Router()

const { getAllReviews, getSingleReview, editReview, createReview, deleteReview } = require("../controllers/review.controller")

router.get("/list/:user_id", getAllReviews)
router.get("/getOneReview/:review_id", getSingleReview)
router.post("/create/:user_id", createReview)
router.put("/edit/:id/:reviewed_id", editReview)
router.delete("/delete/:id/:user_id", deleteReview)

module.exports = router
