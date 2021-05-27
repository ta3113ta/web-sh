import { ServerOptions, Socket, Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Event } from "../enums/event";
import registerExecHandler from "./execHandler";

const DEFAULT_OPTION = { cors: { origin: "*" } };

class Gateway {
  socketIO: SocketServer;

  constructor(
    httpServer: HttpServer,
    opts: Partial<ServerOptions> = DEFAULT_OPTION
  ) {
    this.socketIO = new SocketServer(httpServer, opts);
    this.socketIO.on(Event.CONNECTION, this.onConnection);
  }

  onConnection(socket: Socket) {
    console.log("a user connected");
    registerExecHandler(socket);
  }

  close() {
    this.socketIO.close();
  }
}

export default Gateway;
