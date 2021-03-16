const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePath = "/api/users";

    // Connecting to the Database
    this.connectDB();
    // Middlewares
    this.middlewares();

    // Routes of my app
    this.routes();
  }

  async connectDB() {
    await dbConnection();
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
