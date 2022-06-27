import { ServerResponse } from "node:http";

export interface IController {
	execute(methodName: string | symbol, res: ServerResponse): void;
	selector: { [K: string]: Function };
}