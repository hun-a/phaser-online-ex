const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

const ROOT = path.join(__dirname, '..');
const STATIC_PATH = path.join(ROOT, 'public');

app.use('/css', express.static(path.join(STATIC_PATH, 'css')));
app.use('/js', express.static(path.join(STATIC_PATH, 'js')));
app.use('/assets', express.static(path.join(STATIC_PATH, 'assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(STATIC_PATH, 'index.html'));
});

server.listen(8000, () => console.log(`Listening on ${server.address().port}`));