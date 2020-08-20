import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { History } from "history";
import * as ConnectedReactRouter from "connected-react-router";

import createRootReducer from "./reducer";

export const STORAGE_KEY = "persisted-state";

export default function createStore(history: History) {
  const routerMiddleware = ConnectedReactRouter.routerMiddleware(history);
  const reducer = createRootReducer(history);

  const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), routerMiddleware],
    devTools: process.env.NODE_ENV !== "production",
  });

  return store;
}
