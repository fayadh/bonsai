import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { History } from "history";
import persistState from "redux-localstorage";
import filter from "redux-localstorage-filter";
import * as ConnectedReactRouter from "connected-react-router";
import * as adapter from "redux-localstorage/lib/adapters/localStorage";

import createRootReducer from "./reducer";

export const STORAGE_KEY = "persisted-state";

export default function createStore(history: History) {
  const routerMiddleware = ConnectedReactRouter.routerMiddleware(history);
  const storageAdapter = filter([
    "canonical.auth.user",
    "canonical.auth.token",
  ])(adapter(window.localStorage));
  const persistMiddleware = persistState(storageAdapter, STORAGE_KEY);

  const reducer = createRootReducer(history);

  const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), routerMiddleware],
    devTools: process.env.NODE_ENV !== "production",
    enhancers: [persistMiddleware as any],
  });

  return store;
}
