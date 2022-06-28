import { ServerResponse } from "node:http";
import { ControllerAction } from "./ControllerAction";
import { Controller } from "./ControllerDecorator";
import { Get } from "../router/RouteDecorator";
import { IController } from "./IController";

@Controller("/serial")
export default class SerialController implements IController {

	private res: ServerResponse;

	constructor(res: ServerResponse) {
		this.res = res;
	}

  sendIndexInfo(message: string, val: number) {
    return { message: message };
  }

  @Get()
  index = () => {
    ControllerAction.Send(
      this.res,
      this.sendIndexInfo,
      "This is the index of the serial controller."
    );
  };

  sendSurname(name: string) {
    return { hello: name };
  }

  @Get("/salut/:id")
  surname = ([...args]: any) => {
		let result:any;
		switch(args[0]) {
			case "Cafazzo":
				result = "you!"
				break;
			case "McDavid":
				result = "McDavid is not allowed here.";
				break;
			default:
				result = args;
		}

		ControllerAction.Send(this.res, this.sendSurname, result);
  };

  execute(methodName: string | symbol, ...args: any) {
    if (this.selector[methodName.toString()]) {
      this.selector[methodName.toString()](args);
    }
  }

  selector: { [K: string]: Function } = {
    index: this.index,
    surname: this.surname,
  };
}