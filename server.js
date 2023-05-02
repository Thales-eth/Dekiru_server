const app = require("./app");

const http = require("http")
const socketIO = require("socket.io")
const server = http.createServer(app)
const io = socketIO(server)

const Message = require("./models/Message.model")
const Conversation = require("./models/Conversation.model")

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('joinConversation', ({ conversation_id, user_id }) => {
    console.log("ESTO TIRA PAKO??")
    socket.join(conversation_id);
    console.log(`User ${user_id} joined conversation ${conversation_id}`);
  });

  socket.on('createMessage', async ({ conversation_id, message }) => {
    const { sender, message: msgContent } = message

    try {
      const createdMsg = await Message.create({ sender, message: msgContent })
      const populatedMsg = await Message.findById(createdMsg._id).populate("sender")
      await Conversation.findByIdAndUpdate(conversation_id, { $push: { messages: createdMsg._id } }, { new: true })

      io.to(conversation_id).emit('successfulMsgCreation', populatedMsg);
    }
    catch (error) {
      console.log(error)
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
