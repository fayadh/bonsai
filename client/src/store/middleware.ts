import * as ConnectedReactRouter from "connected-react-router";
import { History } from "history";

export default function createMiddleware(history: History): any[] {
  const routerMiddleware = ConnectedReactRouter.routerMiddleware(history);

  return [routerMiddleware];
}
