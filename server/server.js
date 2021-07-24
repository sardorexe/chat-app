const express = require("express");
const app = express();
const {Server} = require("socket.io")
const http = require("http")

const server = http.createServer(app)
const io = new Server(server)

app.get("/", (req, res) => {
    res.send("Hi")
})

io.on("connection", (socket) => {
    console.log('Connection');
    socket.on("disconnect", () => {
        console.log('Disconnection');
    })
})

const PORT = 3001;
server.listen(PORT, () => console.log(`Server is running, ${PORT}`))