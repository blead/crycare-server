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
const MAX_COUNT = 25;
let state = {
  cryCounter: 0
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
  console.log(`[express] /api: (${req.body.length})`);
  const data = req.body || '';
  const { result, value } = process(data);
  console.log(`[process] ${result} (${state.cryCounter}) (${JSON.stringify(value)})`);
  if(result) {
    if(state.cryCounter == 0) {
      io.emit('message', 'startCrying');
      console.log('[microgear] sending message: startCrying');
      gear.chat(targetAlias, 'startCrying');
    }
    state.cryCounter++;
  } else if(state.cryCounter > 0) {
    state.cryCounter--;
    if(state.cryCounter == 0) {
      io.emit('message', 'stopCrying');
      console.log('[microgear] sending message: stopCrying');
      gear.chat(targetAlias, 'stopCrying');
    }
  }
  if(state.cryCounter > MAX_COUNT) {
    state.cryCounter = MAX_COUNT;
  }
  if(state.cryCounter < 0) {
    state.cryCounter = 0;
  }
  res.end();
});
app.use(express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
  console.log(`[express] listening on port ${port}`);
});
