const app = require("./app");

const http = require("http")
const socketIO = require("socket.io")
const server = http.createServer(app)
const io = socketIO(server)

const Message = require("./models/Message.model")
const Conversation = require("./models/Conversation.model")

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('createMessage', async ({ conversation_id, message }) => {
    const { sender, message: msgContent } = message
    console.log("DESDE EL SOKITO ==>", msgContent)
    // CON ESTOS DATOS HABRÍA QUE EJECUTAR TODA LA LÓGICA DE LA APLICACIÓN...
    try {
      const createdMsg = await Message.create({ sender, message: msgContent })
      await Conversation.findByIdAndUpdate(conversation_id, { $push: { messages: createdMsg._id } }, { new: true })
      io.emit('myCustomEventResponse', `EL MENSAJE CREADO ==> ${createdMsg}`);
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
