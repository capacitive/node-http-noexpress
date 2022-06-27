import "reflect-metadata";
import { RouteDefinition } from "./RouteDefinition";

export const Get = (path: string): PropertyDecorator => {
  return (target: Object, propertyKey: string | symbol): void => {
    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor);
    }

    const routes = Reflect.getMetadata(
      "routes",
      target.constructor
    ) as Array<RouteDefinition>;

    routes.push({
      requestMethod: "get",
      path: path,
      methodName: propertyKey,
    });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};
