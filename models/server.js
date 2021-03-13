const express = require("express");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePath = "/api/users";
    // Middlewares
    this.middlewares();

    // Routes of my app
    this.routes();
  }
  middlewares() {
    // CORS (npm package)
    this.app.use(cors());

    // Reading and parsing body requests
    this.app.use(express.json());

    // Public Directory
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersRoutePath, require("../routes/users"));
  }
  listen() {
    this.app.listen(this.port);
  }
}

module.exports = Server;
