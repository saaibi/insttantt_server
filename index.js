const express = require("express");

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http)
const path = require("path");
const fs = require('fs'); 

// const dev = process.env.NODE_ENV !== 'production';

// Setings
app.set('port', process.env.PORT || 4000);

// socket
io.on('connection', () => {
    const data = fs.readFileSync('package.json', { encoding: 'utf8', flag: 'r' });
    const { version } = JSON.parse(data)
    io.emit('newVersion', version);
    // socket.on('disconnect', () => {
    //    console.log('Disconnected!');
    // });
});

// Static 
app.use(express.static(path.resolve('build')));

// App
app.get('*', (req, res) => {
    res.sendFile(path.resolve('build', 'index.html'))
});

// Start Server
http.listen(app.get('port'))
