const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

let delayedOnce = false;

server.use((req, res, next) => {
  if (
    !delayedOnce &&
    req.method === "GET" &&
    req.path.startsWith("/suppliers")
  ) {
    delayedOnce = true;
    setTimeout(next, 1500);
    return;
  }
  next();
});

server.use(router);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`JSON Server on http://localhost:${PORT}`);
});
