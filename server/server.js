const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const { addUser, removeUser } = require("./controller");

const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi");
});

io.on("connection", (socket) => {
  console.log("connection");

  socket.on("join", (data, callback) => {
    socket.join(data.room);
    addUser({ id: socket.id, name: data.username, room: data.room });
    socket.emit("message", {
      from: "System",
      msg: `${data.username}, welcome our chat`,
    });
    socket.broadcast.to(data.room).emit("message", {
      from: "System",
      msg: `${data.username} has joined`,
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    io.to(message.room).emit("message", {
      from: message.from,
      msg: message.msg,
    });
    callback();
  });


  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        from: "System",
        msg: `${user.name} has left`,
      });
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Server is running, ${PORT}`));
