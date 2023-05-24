const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const conversationsRoutes = require("./routes/conversations");
const messagessRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationsRoutes);
app.use("/api/messages", messagessRoutes);

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-conv", (data) => {
    data.userIds.map((userId, index) =>{
      const sendUserSocket = onlineUsers.get(userId);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("recieve-conv", data);
      }
    });
  });

  socket.on("send-msg", (data) => {
    if(data.userIds){
      data.userIds.map((userId, index) =>{
        const sendUserSocket = onlineUsers.get(userId);
        if (sendUserSocket) {         
          socket.to(sendUserSocket).emit("msg-recieve", data.data);
        }
      });
    }else{
      
    }
    
  });
});