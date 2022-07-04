import { IncomingMessage, ServerResponse } from "http";
import ParallelController from "../controllers/parallel-controller";
import SerialController from "../controllers/serial-controller";
import { RouteDefinition } from "./RouteDefinition";

class HTTPRouter {  
  static router(request: IncomingMessage, response: ServerResponse) {
    let routes: Array<RouteDefinition> = new Array<RouteDefinition>();

    [SerialController, ParallelController].forEach(async controller => {
      const instance = new controller(response);
      const prefix = Reflect.getMetadata("prefix", controller);

      routes = Reflect.getMetadata(
        "routes",
        controller
      );

      console.log(`routes: ${JSON.stringify(routes)}`);

      routes.forEach(route => {
        const prefixedPath = `${prefix}${route.path}`;
        const lastIndex = request.url!.lastIndexOf(':') + 1;

        const reqPattern = request.url!.substring(0, lastIndex);
        const pathPattern = prefixedPath.substring(0, prefixedPath.lastIndexOf(':') + 1);
        const inlineArg = request.url!.substring(lastIndex, request.url!.length);
        
        console.log(`prefix path: ${prefixedPath} | request URL: ${request.url}`)

        if ((prefixedPath == request.url 
          || (lastIndex > 0 && reqPattern == pathPattern && typeof(inlineArg) == "string" && inlineArg.length > 0)) 
          && route.requestMethod == request.method!.toLowerCase()
        ) {
          console.log(`EXECUTING ${controller.name}.${String(route.methodName)}()`);
          instance.execute(route.methodName, inlineArg);
        }
      });
    });
  }
}

export default HTTPRouter;
