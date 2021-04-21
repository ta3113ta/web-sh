import { Socket } from "socket.io";
import { spawn } from "child_process";
import { Event } from "../enums/event";

function execHandler(socket: Socket) {
  const client = spawn("powershell", ["-noexit"], {shell: 'powershell.exe'});

  socket.on(Event.COMMAND, (command) => {
    client.stdin.write(command + "\n");
  });

  client.stdout.on("data", (data) => {
    socket.emit(Event.COMMAND, data.toString());
  });

  client.stderr.on("data", (data) => {
    socket.emit(Event.COMMAND, data.toString());
    socket.emit(Event.CLOSE, 0);
  });

  client.on("close", (code) => {
    socket.emit(Event.CLOSE, code);
  });
}

export default execHandler;
