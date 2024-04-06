const express = require('express')
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const server = http.createServer(app);
const io =  socketIo(server, {
    cors: {
      origin: true,
      methods:['GET','POST']
    }
  })
app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
    credentials: true
  }))
app.use(express.json())
require('dotenv').config()
const PORT = 4500;
const {Message} = require('./models/chatModel')
const Messages = require('./routes/chatRouter')
app.use('/chat',Messages)

mongoose.connect(process.env.MONGO_URI)
.then(async ()=>{console.log('successfully connected to the cloud database')
await Message.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 300 });

server.listen(PORT,()=>{
    console.log(`server is listening on ${PORT} `);
})
})
.catch((error)=>{console.log(error);})
io.removeAllListeners('connection'); // unnecassary  but just in case
io.on('connection', (socket) => {
    console.log('User connected');
    socket.removeAllListeners('sendMessage'); // unnecassary  but just in case
    socket.on('sendMessage', async (data) => {
      try {
        const { message,username } = data;
        console.log(message);
        io.emit('receiveMessage',message,username);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });
});    

app.get('/', (req,res) =>{
    res.status(200).send('Welcome to the ChatRoom')
})