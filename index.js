require('dotenv').config();
const express = require("express"),
    morgan = require("morgan"),
    path = require("path"),
    cors = require("cors"),
    app = express(),
    http = require('http'),
    server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const dev = process.env.NODE_ENV !== 'production';

// Setings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'))
    .use(express.json())
    .use(cors())
    .use(cors({ origin: ['http://localhost:3000'] }));

// Routes
app.use('/api/users', require('./routes/user.routes'));

// socket
io.on('connection', () => {
    console.log('User connected');
    io.emit('newVersion', 'hola');
    // socket.on('disconnect', () => {
    //    console.log('Disconnected!');
    // });
});


// Start Server
app.listen(app.get('port'), () => {
    console.log(`Server running http://localhost:${app.get('port')}`);
});