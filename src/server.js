const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

server.listen(8000, () => console.log(`Listening on ${server.address().port}`));

server.lastPlayerID = 0;  // Keep track of the last assigned to a new player

const randomInt = (low, high) => Math.floor(Math.random() * (high - low) + low);

const getAllPlayers = () => {
  const players = [];
  Object.keys(io.sockets.connected).forEach(socketID => {
    var player = io.sockets.connected[socketID].player;
    player && players.push(player);
  });
  return players;
};

io.on('connection', socket => {
  console.log(`new connection: ${socket.id}`);
  socket.on('newplayer', () => {
    socket.player = {
      id: server.lastPlayerID++,
      x: randomInt(100, 400),
      y: randomInt(100, 400)
    };
    socket.emit('allplayers', getAllPlayers());
    socket.broadcast.emit('newplayer', socket.player);

    socket.on('disconnect', () => io.emit('remove', socket.player.id));
  });
});