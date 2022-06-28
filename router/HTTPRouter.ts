import { IncomingMessage, ServerResponse } from "http";
import SerialController from "../controllers/serial-controller";
import { RouteDefinition } from "./RouteDefinition";
let cache = require("persistent-cache");

class HTTPRouter {  
  static router(request: IncomingMessage, response: ServerResponse) {
    [SerialController].forEach(async controller => {
      const instance = new controller(response);
      const prefix = Reflect.getMetadata("prefix", controller);

      let routes: Array<RouteDefinition> = new Array<RouteDefinition>();

      const routesCache = cache();
      let cached = routesCache.getSync("routes");

      if (!cached) {
        console.log("not in cache");
        routes = Reflect.getMetadata(
          "routes",
          controller
        );
        routesCache.putSync("routes", routes);
      } else {
        routes = cached;
      }

      //routesCache.deleteSync("routes");
      //console.log(`routes: ${JSON.stringify(routes)}`);

      routes.forEach((route) => {
        const prefixedPath = `${prefix}${route.path}`;     
        const reqPattern = request.url?.substring(0, request.url?.lastIndexOf(':') + 1);
        const pathPattern = prefixedPath.substring(0, prefixedPath.lastIndexOf(':') + 1);
        const lastIndex = request.url!.lastIndexOf(':') + 1;
        const inlineArg = request.url!.substring(lastIndex, request.url!.length);

        if ((prefixedPath == request.url 
          || (lastIndex > 0 && reqPattern == pathPattern && typeof(inlineArg) == "string" && inlineArg.length > 0)) 
          && route.requestMethod == request.method!.toLowerCase()
        ) {
          instance.execute(route.methodName, inlineArg);
        }
      });
    });
  }
}

export default HTTPRouter;
