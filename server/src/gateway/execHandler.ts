import { Socket } from "socket.io";
import { spawn } from "child_process";
import { Event } from "../enums/event";

function execHandler(socket: Socket) {
  const powershell = spawn("powershell", ["-noexit"], {
    shell: "powershell.exe",
  });

  socket.on(Event.COMMAND, (command) => {
    powershell.stdin.write(command + "\n");
  });

  powershell.stdout.on("data", (data) => {
    socket.emit(Event.COMMAND, data.toString());
  });

  powershell.stderr.on("data", (data) => {
    socket.emit(Event.COMMAND, data.toString());
    socket.emit(Event.CLOSE, 0);
  });

  powershell.on("close", (code) => {
    socket.emit(Event.CLOSE, code);
  });

  socket.on(Event.DISCONNECT, () => {
    console.log("user disconnected");
    powershell.kill("SIGINT");
  });
}

export default execHandler;
