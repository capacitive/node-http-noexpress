import { IncomingMessage, ServerResponse } from "http";
import SerialController from "../controllers/serial-controller";
import { RouteDefinition } from "./RouteDefinition";
//import { Controller } from "../controllers/serial-controller";

class HTTPRouter {  
  static router(request: IncomingMessage, response: ServerResponse) {
    // if (request.method == 'GET' && request.url == '/salut') {
    //     let contr = new SerialController();
    //     contr.surname(response);
    // }
    [SerialController].forEach(controller => {
      //console.log(`controller: ${controller}`);
      const instance = new controller(response);
      const prefix = Reflect.getMetadata("prefix", controller);
      console.log(`prefix: ${prefix}`);
      const routes: Array<RouteDefinition> = Reflect.getMetadata(
        "routes",
        controller
      );
      console.log(`routes: ${JSON.stringify(routes)}`);

      routes.forEach((route) => {
        const prefixedPath = `${prefix}${route.path}`;

        console.log(`prefixedPath: ${prefixedPath}`);
        console.log(`req url: ${request.url} | req method: ${request.method}`);
        
        const reqPattern = request.url?.substring(0, request.url?.lastIndexOf(':') + 1);
        const pathPattern = prefixedPath.substring(0, prefixedPath.lastIndexOf(':') + 1);
        const lastIndex = request.url!.lastIndexOf(':') + 1;
        console.log(lastIndex);
        const inlineArg = request.url!.substring(lastIndex, request.url!.length);

        console.log(`inlineArg: ${inlineArg}`);

        if ((prefixedPath == request.url 
          || (lastIndex > 0 && reqPattern == pathPattern && typeof(inlineArg) == "string" && inlineArg.length > 0)) 
          && route.requestMethod == request.method!.toLowerCase()
        ) {
          console.log("executing...");
          instance.execute(route.methodName, inlineArg);
        }
      });
    });
  }
}

export default HTTPRouter;
