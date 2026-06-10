const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 3000 });

wss.on('connection', ws => {
  ws.send(JSON.stringify({type:'connected'}));
});

console.log('Server running');
