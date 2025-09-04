const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const PORT = 4000;
let games = {};
app.use(express.json());
app.post('/create-game', (req, res) => {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  games[code] = { players: [], code, status: 'waiting' };
  res.json({ code });
});
io.on('connection', (socket) => {
  socket.on('join', (data) => {
    if (games[data.code]) {
      games[data.code].players.push({ id: socket.id, ...data });
      socket.join(data.code);
      io.to(data.code).emit('update', games[data.code]);
    }
  });
  socket.on('location', (data) => {
    const game = games[data.code];
    if (game) {
      const player = game.players.find(p => p.id === socket.id);
      if (player) player.location = data.location;
      io.to(data.code).emit('update', game);
    }
  });
  socket.on('disconnect', () => {
    for (const code in games) {
      games[code].players = games[code].players.filter(p => p.id !== socket.id);
      io.to(code).emit('update', games[code]);
    }
  });
});
server.listen(PORT, () => console.log(`Backend läuft auf Port ${PORT}`));
