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
      users.push({name:user.login, id:socket.id}); console.log('users',users);
    }
  });

  socket.on('message', (message) => {
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => { console.log('tabl',users); console.log('socket',socket.id);
    const index = users.findIndex(el => el.id == socket.id); console.log('index',index);
    if(index !== -1) { console.log(users[index].name);
      socket.broadcast.emit('message', {author:'ChatBot', content: users[index].name + ' has left the conversation... :('});
      users.splice(index,1);
    }
  });
});
