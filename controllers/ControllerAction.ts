import { ServerResponse } from "node:http";

export class ControllerAction {
  static async Send<T extends (...args: any) => any>(
    res: ServerResponse,
    func: T,
    ...args: Parameters<T>
  ) {
    return new Promise<Object>((resolve, reject) => {
      try {
        const data = func.apply(null, args);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
        resolve(data);
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(error));
        reject(`Error executing controller function: ${func.name}`);
      }
    });
  }
}

export default ControllerAction;
