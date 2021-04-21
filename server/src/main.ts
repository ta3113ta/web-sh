import ServerFactory from "./server";

namespace Main{
  const PORT = process.env.PORT || 5001;
  const server = new ServerFactory();
  server.listen(PORT, () => {
    console.log("listening on port " + PORT);
  });
}

Main;
