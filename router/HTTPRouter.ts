import { IncomingMessage, ServerResponse } from "http";
import SerialController from "../controllers/serial-controller";
import { RouteDefinition } from "./RouteDefinition";

class HTTPRouter {  
  static router(request: IncomingMessage, response: ServerResponse) {
    [SerialController].forEach(controller => {
      const instance = new controller(response);
      const prefix = Reflect.getMetadata("prefix", controller);
      const routes: Array<RouteDefinition> = Reflect.getMetadata(
        "routes",
        controller
      );
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
