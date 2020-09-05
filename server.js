require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('hello!'));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message-broadcast', msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000')
});