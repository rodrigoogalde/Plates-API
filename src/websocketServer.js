const { WebSocketServer } = require("ws");
const { v4: uuidv4 } = require("uuid");

const connections = {};


const createWebSocketServer = (server) => {
  const wsServer = new WebSocketServer({ server });

  wsServer.on("connection", (connection) => {
    const user_idv4 = uuidv4();
    console.log("Recieved a new connection");
    connections[user_idv4] = connection;
    console.log(`${user_idv4} connected.`);

    ws.on('message', (message) => {
      console.log('Mensaje recibido del cliente:', message);
      ws.send(`Servidor WebSocket recibió: ${message}`);
    });

    connection.on("close", () => {
      console.log(`${user_idv4} disconnected.`);
      delete connections[user_idv4];
    });
  });
};

module.exports = createWebSocketServer;