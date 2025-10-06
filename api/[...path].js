const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), "db.json"));
const middlewares = jsonServer.defaults();

let delayedOnce = false;

server.use((req, res, next) => {
  if (!delayedOnce) {
    delayedOnce = true;
    setTimeout(next, 1500);
  } else next();
});

server.use((req, _res, next) => {
  if (req.url.startsWith("/api")) {
    req.url = req.url.replace(/^\/api/, "") || "/";
  }
  next();
});

server.use(middlewares);
server.use(router);

module.exports = (req, res) => server.handle(req, res);
