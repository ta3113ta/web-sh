import Gateway from "./gateway/index";
import { createServer, Server as HttpServer } from "http";
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '../.env'});

class ServerFactory {
  server: HttpServer;
  gateway: Gateway;

  constructor() {
    this.server = createServer();
    this.gateway = new Gateway(this.server);
  }

  start() {
    const port = process.env.PORT || 5001
    this.server.listen(port, () => {
      console.log("listening on port " + port);
    })
  }
}

export default ServerFactory;
