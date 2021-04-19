import socketIOClient from "socket.io-client";
import { SocketStore } from "./socket.store";

const socket = socketIOClient("http://localhost:5001");

function makeSocketObservable(socketStore: SocketStore) {
  socketStore.socket = socket;

  socketStore.socket.on("command", (msg) => {
    socketStore.logOutputs.push(msg);
  });

  socketStore.socket.on('close', (code) => {
      socketStore.isProcess = false;
  })
}

export default makeSocketObservable;
