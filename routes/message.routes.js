const router = require("express").Router()

const { getMessages, createMessage, deleteMessage, getSingleMessage
} = require("../controllers/message.controller")

router.get("/getSingleMessage/:message_id", getSingleMessage)
router.get("/list/:conversation_id", getMessages)
router.post("/create/:conversation_id", createMessage)
router.delete("/delete/:message_id/:conversation_id", deleteMessage)

module.exports = router
