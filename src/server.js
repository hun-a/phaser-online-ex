const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

server.listen(8000, () => console.log(`Listening on ${server.address().port}`));