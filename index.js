const microgear = require('microgear');
const express = require('express');
const path = require('path');
const { appId, key, secret, alias, port } = require('./config');

const gear = microgear.create({ key, secret, alias });
gear.on('connected', () => {
  console.log('[microgear] connection successful');
});
gear.on('message', (topic, body) => {
  console.log(`[microgear] message: ${topic} : ${body}`);
});
gear.on('closed', () => {
  console.log('[microgear] disconnected');
});
gear.connect(appId);

const server = express();
server.use(express.static(path.join(__dirname, 'public')));
server.listen(port, () => {
  console.log(`[express] listening on port ${port}`);
})
