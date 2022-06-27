import { ServerResponse } from "node:http";
import { ControllerAction } from "./ControllerAction";
import { Controller } from "./ControllerDecorator";
import { Get } from "../router/RouteDecorator";
import { IController } from "./IController";

@Controller("/serial")
export default class SerialController implements IController {
  sendIndexInfo(message: string, val: number) {
    return { message: message };
  }

  @Get("/")
  index = (res: ServerResponse) => {
    //console.log(this.res);
    ControllerAction.Send(
      res,
      this.sendIndexInfo,
      "This is the index of the serial controller.",
      0
    );
  };

  sendSurname(message: string) {
    return { name: message };
  }

  @Get("/salut")
  surname = (res: ServerResponse) => {
    //console.log(res);
    ControllerAction.Send(res, this.sendSurname, "Cafazzo"); //`${this.req.url?.substring(this.req.url?.lastIndexOf("/") + 1)}`);
  };

  execute(methodName: string | symbol, res: ServerResponse) {
    if (this.selector[methodName.toString()]) {
      this.selector[methodName.toString()](res);
    }
  }

  selector: { [K: string]: Function } = {
    index: this.index,
    surname: this.surname,
  };
}

// export const serial = async (req: IncomingMessage, res: ServerResponse) => {
//     ControllerAction.Send(res, sendSurname, "Cafazzo");
// }

// export default serial;
