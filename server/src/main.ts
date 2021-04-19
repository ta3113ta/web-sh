import ServerFactory from "./serverFactory";
import onConnection from "./socketEvent/index";

namespace Server {
  const PORT = process.env.PORT || 5001;
  const server = new ServerFactory();
  server.setSocket(onConnection);
  server.listen(PORT, () => {
    console.log("listening on port " + PORT);
  });
}

Server;
