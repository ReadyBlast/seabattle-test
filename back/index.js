//Зависимости
const express = require('express');
const session = require('express-session');
const PartyManager = require('./src/PartyManager');
const pm = new PartyManager();

// Создание приложения ExpressJS
const app = express();
const http = require('http');
const server = http.createServer(app);

//Регистрация Socket приложения
const { Server } = require('socket.io');
const io = new Server(server);
const port = 3000;

// Настройка сессии
app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: 's3Cur3',
    name: 'sessionId',
  })
);

// Настройка статики
app.use(express.static('./../front'));

// Поднятие сервера
server.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

// Прослушивание socket соединения
io.on('connection', (socket) => {
  pm.connection(socket);
  io.emit('playerCount', io.engine.clientsCount);

  socket.on('disconnect', () => {
    pm.disconnect(socket);
    io.emit('playerCount', io.engine.clientsCount);
  });

  // socket.on('findRandomOpponent', () => {
  //   socket.emit('statusChange', 'randomFinding');

  //   pm.playRandom(socket);
  // });
});
