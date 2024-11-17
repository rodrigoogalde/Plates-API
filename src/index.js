const app = require("./app");
const db = require("./models");
const createWebSocketServer = require("./websocketServer");

const PORT = 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database has been established successfully.");
    const server = app.listen(PORT, (err) => {
      if (err) {
        return console.error("Failed", err);
      }
      console.log(`Listening on port ${PORT}`);
      
    //   createWebSocketServer(server);
      return app;
    });
  })
  .catch((err) => console.error("Unable to connect to the database:", err));
