import http from "http";
import HTTPRouter from "./router/HTTPRouter";
//let cache = require("persistent-cache");

const port = 3031;

// const routesCache = cache();
// let cached = routesCache.getSync("routes");

// if(cached) {
//   routesCache.deleteSync("routes");
// }

const httpServer = http.createServer((req, res) => HTTPRouter.router(req, res));

httpServer.listen(port, () => {
  console.info(`http server running at http://localhost:${port}`);
});
