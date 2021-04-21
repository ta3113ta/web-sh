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

  listen(port: any, cb?: (() => void) | undefined) {
    this.server.listen(port, cb);
  }
}

export default ServerFactory;
