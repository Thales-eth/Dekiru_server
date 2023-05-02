const Message = require("../models/Message.model")
const Conversation = require("../models/Conversation.model")

const getSingleMessage = (req, res, next) => {
    const { message_id } = req.params

    Message
        .findById(message_id)
        .populate("sender")
        .then(message => res.status(200).json(message))
        .catch(err => res.status(500).json({ error: err.message }))
}

const getMessages = (req, res, next) => {
    const { conversation_id } = req.params

    Conversation
        .findById(conversation_id)
        .populate({
            path: "messages",
            populate: {
                path: "sender"
            }
        })
        .then(messages => res.status(200).json(messages))
        .catch(err => res.status(500).json({ error: err.message }))
}

const createMessage = async (req, res) => {
    const { sender, message } = req.body
    const { conversation_id } = req.params

    try {
        const createdMsg = await Message.create({ sender, message })
        await Conversation.findByIdAndUpdate(conversation_id, { $push: { messages: createdMsg._id } }, { new: true })
        res.sendStatus(201)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteMessage = (req, res, next) => {
    const { message_id } = req.params
    const { conversation_id } = req.params

    Message
        .findByIdAndDelete(message_id)
        .then(() => Conversation.findByIdAndUpdate(conversation_id, { $pull: { messages: message_id } }, { new: true }))
        .then(updatedConversation => res.status(200).json(updatedConversation))
        .catch(err => res.status(500).json({ error: err.message }))
}


module.exports = {
    getSingleMessage, getMessages, createMessage, deleteMessage
} 