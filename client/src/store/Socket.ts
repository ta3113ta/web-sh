import socketIOClient from "socket.io-client";
import { SocketStore } from "./socket.store";
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../.env'})

const serverUri = process.env.SERVER_URI || "http://localhost:5001";
const socket = socketIOClient(serverUri);

function makeSocketObservable(socketStore: SocketStore) {
  socketStore.socket = socket;

  socketStore.socket.on("command", (msg) => {
    socketStore.logOutputs.push(msg);
  });

  socketStore.socket.on("close", (code) => {
    socketStore.isProcessing = false;
  });
}

export default makeSocketObservable;
