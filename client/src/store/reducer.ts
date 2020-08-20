import { compose } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import { mergePersistedState } from "redux-localstorage";
import { connectRouter } from "connected-react-router";

import auth from "./slices/canonical/auth";

const createRootReducer = (history: any) => {
  const canonical = combineReducers({
    auth,
  });

  const rootReducer = combineReducers({
    canonical,
    router: connectRouter(history),
  });

  return rootReducer;
};

export default createRootReducer;
