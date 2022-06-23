const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

let users = {}

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    io.on('connection', socket => {

        socket.on('join-room', name => {
            users[socket.id] = name;
            socket.broadcast.emit('user-joined', name);
        });

        socket.on('send-chat-message', data => {
            socket.broadcast.emit('chat-message', data);
        });

        socket.on('disconnect', () => {
            socket.broadcast.emit('user-left', users[socket.id]);
            delete users[socket.id];
        })

    })
})