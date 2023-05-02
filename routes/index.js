const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken")

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

const classRoutes = require("./class.routes")
router.use("/class", verifyToken, classRoutes)

const conversationRoutes = require("./conversation.routes")
router.use("/conversation", verifyToken, conversationRoutes)

const messageRoutes = require("./message.routes")
router.use("/message", verifyToken, messageRoutes)

const postRoutes = require("./post.routes")
router.use("/post", verifyToken, postRoutes)

const reviewRoutes = require("./review.routes")
router.use("/review", verifyToken, reviewRoutes)

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)

const payMentRoutes = require("./stripe.routes")
router.use("/payment", verifyToken, payMentRoutes)

module.exports = router;
