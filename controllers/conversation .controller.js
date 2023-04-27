const Conversation = require("../models/Conversation.model")
const User = require("../models/User.model")

const getConversations = (req, res, next) => {
    Conversation
        .find()
        .sort({ createdAt: -1 })
        .then(conversations => res.status(200).json(conversations))
        .catch(err => res.status(500).json({ error: err.message }))
}

const getUserConversations = async (req, res) => {
    const { userId } = req.params

    try {
        const mainUserConversations = await User.findById(userId).populate({ path: "conversations", populate: [{ path: "participants" }, { path: "messages", populate: { path: "sender" } }] }).then(user => {
            return user.conversations
        })
        res.status(200).json(mainUserConversations)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getOneConversation = (req, res, next) => {
    const { id } = req.params

    Conversation
        .findById(id)
        .then(conversation => res.status(200).json(conversation))
        .catch(err => res.status(500).json({ error: err.message }))
}

const joinConversation = async (req, res) => {
    const { participants } = req.body

    try {
        const createdConversation = await Conversation.create({ participants, messages: [] })
        participants.forEach(async (participantId) => {
            await User.findByIdAndUpdate(participantId, { $addToSet: { conversations: createdConversation._id.toString() } })
        })
        res.sendStatus(201)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteConversation = (req, res) => {
    const { id } = req.params

    Conversation
        .findByIdAndDelete(id)
        .then(() => res.status(200).json({ msg: "Conversation successfully deleted!" }))
        .catch(err => res.status(500).json({ error: err.message }))
}

module.exports = { getConversations, getUserConversations, getOneConversation, joinConversation, deleteConversation }