const router = require("express").Router();

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

const classRoutes = require("./class.routes")
router.use("/class", classRoutes)

const conversationRoutes = require("./conversation.routes")
router.use("/conversation", conversationRoutes)

const messageRoutes = require("./message.routes")
router.use("/message", messageRoutes)

const postRoutes = require("./post.routes")
router.use("/post", postRoutes)

const reviewRoutes = require("./review.routes")
router.use("/review", reviewRoutes)

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)

const payMentRoutes = require("./stripe.routes")
router.use("/payment", payMentRoutes)

module.exports = router;
