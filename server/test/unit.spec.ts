const { createServer } = require("http");
import Client, { Socket as ClientSocket } from "socket.io-client";
import Gateway from "../src/gateway/index";
import { Event } from '../src/enums/event';

jest.mock("../src/gateway/execHandler");

describe("my awesome project", () => {
  let clientSocket: ClientSocket;
  let gateway: Gateway;

  /**
   * Setting WS
   */
  beforeAll((done) => {
    const httpServer = createServer();
    gateway = new Gateway(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = Client(`http://localhost:${port}`);
      clientSocket.on("connect", done)
    });
  });

  /**
   * Teardown WS
   */
  afterAll(() => {
    gateway.close();
    clientSocket.close();
  });

  it('should execute command', (done) => {
      clientSocket.on(Event.COMMAND, (result: any) => {
          expect(result).toBe("hello");
          done();
      });
      clientSocket.emit(Event.COMMAND, "echo hello");
  });
});
