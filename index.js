require('dotenv').config();
const express = require("express"),
    morgan = require("morgan"),
    path = require("path"),
    cors = require("cors"),
    app = express(),
    http = require('http'),
    server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("invalid username ins"));
    }
    socket.username = username;
    next();
});

const mongoose = require('mongoose');
const User = require('./models/user');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// Setings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'))
    .use(express.json())
    .use(cors())
    .use(cors({ origin: ['http://localhost:3000'] }));

// Routes
app.use('/api/users', require('./routes/user.routes'));

// Socket io
io.on("connection", (socket) => {
    socket.join(socket.username);
    socket.emit("user connected", {
        userID: socket.id,
        username: socket.username,
    });

    socket.on("add hobbie", async ({ content, _id, email }) => {
        socket.join(email);
        const { hobbies } = await User.findById(_id);
        hobbies.push(content)
        const query = User.findByIdAndUpdate(_id, { hobbies }, { new: true, multi: true }, (err, user) => {
            if (err) return res.json({ error: err });
            return user
        });
        await query.clone()
        console.log('add hobbie', _id, email)
        io.to(email).emit("add hobbie", {
            hobbies,
            from: socket.id,
        });
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("user disconnected", socket.id);
    });
});

// Start Server
server.listen(app.get('port'), () => {
    console.log(`Server running http://localhost:${app.get('port')}`);
});