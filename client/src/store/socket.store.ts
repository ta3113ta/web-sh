import { Socket } from "socket.io-client";
import { makeAutoObservable } from "mobx";
import makeSocketObservable from "./Socket";

export class SocketStore {
  logOutputs: string[] = [];
  isProcess: boolean = false;
  socket!: Socket;

  constructor() {
    makeAutoObservable(this);
    makeSocketObservable(this);
  }

  sendCommand(command: string) {
    this.isProcess = true;

    if (command.toUpperCase() === "CLEAR") {
      this.logOutputs = [];
      this.isProcess = false;
      return;
    }

    this.socket?.emit("command", command);
  }
}

const store = new SocketStore();
export default store;
