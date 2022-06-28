export interface IController {
	execute(methodName: string | symbol, ...args: any): void;
	selector: { [K: string]: Function };
}