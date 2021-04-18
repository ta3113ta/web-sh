import { Socket } from "socket.io";
import registerExecHandler from "../socketEvent/execHandler";
import { Event } from "../enums/event";

function onConnection(socket: Socket) {
  console.log("a user connected");

  registerExecHandler(socket);

  socket.on(Event.DISCONNECT, () => {
    console.log("user disconnected");
  });
}

export default onConnection;
