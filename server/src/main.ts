import Server from "./server";

namespace Main{
  const server = new Server();
  server.listen(process.env.PORT || 5001);
}

Main;
