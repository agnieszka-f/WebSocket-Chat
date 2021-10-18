const { Console } = require('console');
const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => { 
  socket.on('user', (user)=> { 
    if(typeof user.login !== 'undefined') {
      users.push({name:user.login, id:socket.id}); 
    }
  });

  socket.on('message', (message) => {
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => { 
    const index = users.findIndex(el => el.id == socket.id); 
    if(index !== -1) { 
      socket.broadcast.emit('message', {author:'ChatBot', content: users[index].name + ' has left the conversation... :('});
      users.splice(index,1);
    }
  });
});
