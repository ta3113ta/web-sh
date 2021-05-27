import { Socket } from "socket.io-client";
import { makeAutoObservable } from "mobx";
import makeSocketObservable from "./socket";

export class SocketStore {
  logOutputs: string[] = [];
  isProcessing: boolean = false;
  socket!: Socket;

  constructor() {
    makeAutoObservable(this);
    makeSocketObservable(this);
  }

  sendCommand(command: string) {
    this.isProcessing = true;

    if (command.toUpperCase() === "CLEAR") {
      this.logOutputs = [];
      this.isProcessing = false;
      return;
    }

    this.socket?.emit("command", command);
  }
}

const store = new SocketStore();
export default store;
