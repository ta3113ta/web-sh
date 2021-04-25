import { Socket } from "socket.io";
import { spawn } from "child_process";
import { Event } from "../../enums/event";

function execHandler(socket: Socket) {
  socket.on(Event.COMMAND, (command) => {
      if (command == "echo hello") {
          socket.emit(Event.COMMAND, "hello");
      }
  });
}

export default execHandler;
