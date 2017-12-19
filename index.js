const microgear = require('microgear');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const Io = require('socket.io');
const { appId, key, secret, alias, targetAlias, port } = require('./config');
const { process } = require('./process');

const gear = microgear.create({ key, secret, alias });
const app = express();
const server = http.createServer(app);
const io = Io(server);
let state = {
  isCrying: false
};

gear.on('connected', () => {
  console.log('[microgear] connection successful');
});
gear.on('message', (topic, body) => {
  console.log(`[microgear] message: ${topic} : ${body} (${body.length})`);
});
gear.on('closed', () => {
  console.log('[microgear] disconnected');
});
gear.connect(appId);

io.on('connection', (socket) => {
  console.log('[socket] client connected');
  socket.on('disconnect', function(){
    console.log('[socket] client disconnected');
  });
});

app.use(bodyParser.text());
app.post('/api', (req, res, next) => {
  console.log(`[express] /api: ${req.body} (${req.body.length})`);
  const data = req.body;
  const result = process(data);
  console.log(`[process] ${result}`);
  if(process(data)) {
    if(!state.isCrying) {
      state.isCrying = true;
      io.emit('message', 'startCrying');
      gear.chat(targetAlias, 'startCrying');
    }
  } else if(state.isCrying) {
    state.isCrying = false;
    io.emit('message', 'stopCrying');
    gear.chat(targetAlias, 'stopCrying');
  }
  res.end();
});
app.use(express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
  console.log(`[express] listening on port ${port}`);
});
