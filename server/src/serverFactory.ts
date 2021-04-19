import express,{ Application } from "express";
import { createServer } from "http";
import { Server, ServerOptions } from "socket.io";
import { Event } from "./enums/event";

class ServerFactory {
  server: any;
  socketIO: Server | undefined;

  constructor() {
    this.server = createServer(express());
  }

  setSocket(onConnection: any, opts?: Partial<ServerOptions> | undefined) {
    if (!opts) {
      opts = { cors: { origin: "*" } };
    }

    this.socketIO = new Server(this.server, opts);
    this.socketIO.on(Event.CONNECTION, onConnection);
  }

  listen(port: any, cb?: (() => void) | undefined) {
    this.server.listen(port, cb);
  }
}

export default ServerFactory;
