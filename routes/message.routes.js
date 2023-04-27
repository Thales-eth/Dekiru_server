const router = require("express").Router()

const { getMessages, createMessage, deleteMessage
} = require("../controllers/message.controller")

router.get("/list/:conversation_id", getMessages)
router.post("/create/:conversation_id", createMessage)
router.delete("/delete/:message_id/:conversation_id", deleteMessage)

module.exports = router
