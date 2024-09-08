
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Connected');

    socket.on('send-location', (data) => {
        io.emit('received-location', {
            id: socket.id,
            ...data,
        });
    });

    socket.on('disconnect', () => {
        io.emit('user-disconnected', socket.id);
    });
});

app.get('/', (req, res) => {
    res.render('index');  // Render the EJS file
});

server.listen(8000, () => {
    console.log('Server started on port 8000');
});
