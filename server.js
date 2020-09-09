const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'dist/socket-frontend')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/socket-frontend/index.html'));
});

const http = require('http').createServer(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message-broadcast', msg);
    });
});
http.listen(port, () => {
    console.log('listening on :' + port.toString())
});
