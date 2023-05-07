// Create express server
const express = require("express");
// Create app variable 
const app = express();

// Create http server with express.js
const http = require("http");
const {Server} = require("socket.io");

// Set project to accept CORS library 
const cors = require("cors");
// Apply the cors middleware 
app.use(cors());


const server = http.createServer(app)
// Relates to socket.io on the backend, allows us to work with socket.io on backend 
const io = new Server(server, {
    // CORS = cross-origin resource sharing, mechanism that allows servers to indicate origin of http headers
    cors: {
        // react runs on localhost port 3000 
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },

});

io.on("connection", (socket) => {
    console.log('Connected to socket: ' + socket.id);

    socket.on("send_message", (data) => {
        //console.log(data);
        // "data" = data that was sent via the front-end
        // broadcast message to everyone listening on server
        console.log(data)
        socket.broadcast.emit("receive_message", data);
        
    });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING...");
});