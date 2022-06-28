//Зависимости
const express = require('express');
const session = require('express-session');
const PartyManager = require('./src/PartyManager');
const pm = new PartyManager();
const fs = require('fs');
const path = require('path');

// Создание приложения ExpressJS
const app = express();
const http = require('http');
const server = http.createServer(app);

//Регистрация Socket приложения
const { Server } = require('socket.io');
const io = new Server(server);
const port = 80;

// Настройка сессии
const sessionMiddleware = session({
  secret: 's3Cur3',
  name: 'sessionId',
});

app.set('trust proxy', 1); // trust first proxy
app.use(sessionMiddleware);

// Настройка статики
app.use(express.static('./../front'));

// По умолчанию
app.use('*', (req, res) => {
  res.type('html');
  res.send(fs.readFileSync(path.join(__dirname, './../front/index.html')));
});

// Поднятие сервера
server.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

// Прослушивание socket соединения
io.on('connection', (socket) => {
  pm.connection(socket);
  io.emit('playerCount', io.engine.clientsCount);

  socket.on('disconnect', () => {
    pm.disconnect(socket);
    io.emit('playerCount', io.engine.clientsCount);
  });
});
