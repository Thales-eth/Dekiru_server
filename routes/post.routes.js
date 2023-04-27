const router = require("express").Router()

const { getPosts, getSinglePost, createPost, editPost, deletePost } = require("../controllers/post.controller")

router.get("/list/:skipValue", getPosts)
router.get("/list/getOnePost/:post_id", getSinglePost)
router.post("/create", createPost)
router.put("/edit/:id", editPost)
router.delete("/delete/:id", deletePost)

module.exports = router
