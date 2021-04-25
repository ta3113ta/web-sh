import express from "express";
import Gateway from "./gateway/index";
import { createServer, Server as HttpServer } from "http";

class ServerFactory {
  server: HttpServer;
  gateway: Gateway;

  constructor() {
    this.server = createServer(express());
    this.gateway = new Gateway(this.server);
  }

  listen(port: any) {
    this.server.listen(port, () => {
      console.log("listening on port " + port);
    });
  }
}

export default ServerFactory;
