const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected!');

  ws.on('message', (message) => {
    // Forward the message to every OTHER connected device (e.g., PC -> Phone)
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});

console.log('WebSocket server is running on port 8080...');