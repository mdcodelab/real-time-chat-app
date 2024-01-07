const express=require("express");
const app = express();

const http = require("http");

const cors = require("cors");
const { start } = require("repl");

app.use(cors());

const {Server} = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", ]
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);

    io.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

server.listen(4000, () => console.log("server is listening ... "))


