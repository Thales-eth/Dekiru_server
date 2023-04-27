const router = require("express").Router()

const { getConversations, getUserConversations, getOneConversation, joinConversation, deleteConversation } = require("../controllers/conversation .controller")

router.get("/list", getConversations)
router.get("/getUserConversations/:userId", getUserConversations)
router.get("/getOne/:id", getOneConversation)
router.post("/join", joinConversation)
router.delete("/delete/:id", deleteConversation)

module.exports = router
