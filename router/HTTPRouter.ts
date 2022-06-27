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
      const instance = new controller();
      const prefix = Reflect.getMetadata("prefix", controller);
      console.log(`prefix: ${prefix}`);
      const routes: Array<RouteDefinition> = Reflect.getMetadata(
        "routes",
        controller
      );
      //console.log(`routes: ${JSON.stringify(routes)}`);

      routes.forEach((route) => {
        const prefixedPath = `${prefix}${route.path}`;

        //console.log(`route path: ${prefixedPath}`);
        //console.log(`req url: ${request.url} | req method: ${request.method}`);
        
        if (
          prefixedPath == request.url &&
          route.requestMethod == request.method!.toLowerCase()
        ) {
          console.log("executing...");
          instance.execute(route.methodName, response);
        }
      });
    });
  }
}

export default HTTPRouter;
