import { ServerResponse } from "node:http";

export class ControllerAction {
  static async Send<T extends (...args: any) => any>(
    res: ServerResponse,
    func: T,
    ...args: any
  ) {
    return new Promise<Object>((resolve, reject) => {
      try {
        let data: any = null;
        const argsValue1 = [...args].join(',');
        const arr:Array<string> = argsValue1.split(',');

        console.log(arr);
        console.log("got here");

        if(arr.length > 1) {
          data = func.apply(null, args[0]);
        } else {
          data = func.apply(null, arr);
        }
        
        console.log("got here");

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
